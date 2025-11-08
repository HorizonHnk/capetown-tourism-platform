const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Initialize Firebase Admin
admin.initializeApp();

/**
 * Create Stripe Checkout Session
 *
 * This function creates a Stripe checkout session for booking payments.
 * It's called from the frontend and returns a session ID for redirection.
 *
 * @param {Object} data - Request data
 * @param {string} data.bookingId - Firestore booking document ID
 * @param {string} data.accommodationName - Name of accommodation
 * @param {number} data.amount - Amount in ZAR (will be converted to cents)
 * @param {string} data.checkIn - Check-in date
 * @param {string} data.checkOut - Check-out date
 * @param {string} data.userId - Firebase user ID
 * @param {string} data.userEmail - User email for receipts
 * @param {string} data.accommodationId - Accommodation ID
 *
 * @returns {Object} - { sessionId: string, url: string }
 */
exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
  try {
    // Verify user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated to create checkout session'
      );
    }

    // Validate required fields
    const {
      bookingId,
      accommodationName,
      amount,
      checkIn,
      checkOut,
      userEmail,
      userId,
      accommodationId
    } = data;

    if (!bookingId || !accommodationName || !amount || !userEmail) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing required fields: bookingId, accommodationName, amount, or userEmail'
      );
    }

    // Verify the amount is positive
    if (amount <= 0) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Amount must be greater than 0'
      );
    }

    console.log('Creating Stripe checkout session for booking:', bookingId);
    console.log('Amount:', amount, 'ZAR');
    console.log('User:', userEmail);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'zar',
            product_data: {
              name: accommodationName || 'Cape Town Booking',
              description: `Booking from ${checkIn || 'N/A'} to ${checkOut || 'N/A'}`,
              images: ['https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400'], // Table Mountain
            },
            unit_amount: Math.round(amount * 100), // Convert ZAR to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${data.successUrl || 'https://capetown-tourism-platform.netlify.app/booking-success'}?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
      cancel_url: `${data.cancelUrl || 'https://capetown-tourism-platform.netlify.app/booking-cancelled'}?booking_id=${bookingId}`,
      customer_email: userEmail,
      client_reference_id: bookingId,
      metadata: {
        bookingId: bookingId,
        userId: userId,
        accommodationId: accommodationId || 'N/A',
        amount: amount.toString(),
        checkIn: checkIn || 'N/A',
        checkOut: checkOut || 'N/A',
      },
    });

    console.log('✅ Stripe checkout session created:', session.id);
    console.log('🔗 Checkout URL:', session.url);

    // Return session details
    return {
      sessionId: session.id,
      url: session.url,
      success: true,
    };

  } catch (error) {
    console.error('❌ Error creating Stripe checkout session:', error);

    // Re-throw Firebase HTTPS errors
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    // Throw a generic error for Stripe or other errors
    throw new functions.https.HttpsError(
      'internal',
      `Failed to create checkout session: ${error.message}`
    );
  }
});

/**
 * Stripe Webhook Handler
 *
 * This function handles webhooks from Stripe to update booking status
 * when payments are completed, failed, or refunded.
 *
 * Configure this webhook URL in your Stripe dashboard:
 * https://your-region-your-project.cloudfunctions.net/stripeWebhook
 *
 * Events to listen for:
 * - checkout.session.completed
 * - payment_intent.succeeded
 * - payment_intent.payment_failed
 * - charge.refunded
 */
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('📨 Received webhook event:', event.type);

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const bookingId = session.client_reference_id || session.metadata.bookingId;

        console.log('✅ Payment successful for booking:', bookingId);
        console.log('💰 Amount paid:', session.amount_total / 100, session.currency.toUpperCase());

        // Update booking status in Firestore
        if (bookingId) {
          await admin.firestore().collection('bookings').doc(bookingId).update({
            status: 'paid',
            paidAt: admin.firestore.FieldValue.serverTimestamp(),
            stripeSessionId: session.id,
            stripePaymentIntent: session.payment_intent,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          console.log('✅ Booking status updated to "paid"');
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const bookingId = paymentIntent.metadata.bookingId;

        console.log('❌ Payment failed for booking:', bookingId);

        // Update booking status
        if (bookingId) {
          await admin.firestore().collection('bookings').doc(bookingId).update({
            status: 'payment_failed',
            failureReason: paymentIntent.last_payment_error?.message || 'Unknown error',
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          console.log('✅ Booking status updated to "payment_failed"');
        }
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object;
        const bookingId = charge.metadata.bookingId;

        console.log('💸 Refund processed for booking:', bookingId);

        // Update booking status
        if (bookingId) {
          await admin.firestore().collection('bookings').doc(bookingId).update({
            status: 'refunded',
            refundedAt: admin.firestore.FieldValue.serverTimestamp(),
            refundAmount: charge.amount_refunded / 100,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          console.log('✅ Booking status updated to "refunded"');
        }
        break;
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });

  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    res.status(500).send(`Webhook Error: ${error.message}`);
  }
});
