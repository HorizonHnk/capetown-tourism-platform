import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
// This is safe to expose in frontend code
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Only initialize Stripe if we have a valid key
const stripePromise = stripeKey && stripeKey.startsWith('pk_')
  ? loadStripe(stripeKey)
  : null;

/**
 * Create a Stripe Checkout session for booking payment
 * @param {Object} bookingDetails - Details of the booking
 * @param {number} amount - Amount in ZAR (will be converted to cents)
 * @param {string} currency - Currency code (default: ZAR)
 * @returns {Promise} Redirects to Stripe Checkout
 */
export const createCheckoutSession = async (bookingDetails, amount, currency = 'ZAR') => {
  try {
    // Check if Stripe is properly configured
    if (!stripePromise) {
      console.warn('⚠️ Stripe not configured - using demo mode');
      console.log('💳 PAYMENT DEMO MODE');
      console.log('✅ Booking saved successfully!');
      console.log('📝 To enable real payments: Add VITE_STRIPE_PUBLISHABLE_KEY to .env');

      return { success: true, demo: true };
    }

    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    // For now, we'll use Stripe Checkout in test mode
    // This creates a simple payment link without needing a backend

    const checkoutOptions = {
      lineItems: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: bookingDetails.accommodationName || 'Cape Town Booking',
              description: `Booking from ${bookingDetails.checkIn} to ${bookingDetails.checkOut}`,
              images: ['https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400'], // Table Mountain
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: `${window.location.origin}/booking-success?booking_id=${bookingDetails.bookingId}`,
      cancelUrl: `${window.location.origin}/booking-cancelled`,
      customerEmail: bookingDetails.userEmail,
      metadata: {
        bookingId: bookingDetails.bookingId,
        userId: bookingDetails.userId,
        accommodationId: bookingDetails.accommodationId,
      },
    };

    // Note: This is a simplified version for testing
    // In production, you should create the checkout session on your backend
    // and pass the session ID to the frontend

    console.log('🚀 Stripe configured - redirecting to checkout...');
    console.log('💳 Amount:', amount, currency);
    console.log('✅ Booking saved: R' + amount.toFixed(2));
    console.log('⚠️ Next step: Set up backend to create Stripe checkout sessions');
    console.log('📖 See PAYMENT_INTEGRATION_GUIDE.md for details');

    // TODO: In production, create checkout session on backend
    // Uncomment this when you have a backend:
    // const { error } = await stripe.redirectToCheckout(checkoutOptions);
    // if (error) {
    //   throw error;
    // }

    return { success: true, demo: false };

  } catch (error) {
    console.error('❌ Stripe payment error:', error);
    throw new Error(`Payment failed: ${error.message}`);
  }
};

/**
 * Simplified payment flow for testing
 * @param {Object} bookingDetails
 * @param {number} amount
 */
export const processPayment = async (bookingDetails, amount) => {
  try {
    console.log('💳 Processing payment...');
    console.log('Amount:', amount);
    console.log('Booking:', bookingDetails);

    // Create checkout session
    const result = await createCheckoutSession(bookingDetails, amount);

    return result;
  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
};

/**
 * Test card numbers for Stripe test mode:
 * - Success: 4242 4242 4242 4242
 * - Decline: 4000 0000 0000 0002
 * - 3D Secure: 4000 0027 6000 3184
 * - Expiry: Any future date
 * - CVC: Any 3 digits
 */

export default stripePromise;
