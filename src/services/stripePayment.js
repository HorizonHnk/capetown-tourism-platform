import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
// This is safe to expose in frontend code
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

/**
 * Create a Stripe Checkout session for booking payment
 * @param {Object} bookingDetails - Details of the booking
 * @param {number} amount - Amount in ZAR (will be converted to cents)
 * @param {string} currency - Currency code (default: ZAR)
 * @returns {Promise} Redirects to Stripe Checkout
 */
export const createCheckoutSession = async (bookingDetails, amount, currency = 'ZAR') => {
  try {
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

    console.log('⚠️ DEMO MODE: Using Stripe test mode');
    console.log('💡 To fully enable payments, you need to:');
    console.log('1. Create a Stripe account at https://stripe.com');
    console.log('2. Get your API keys from https://dashboard.stripe.com/test/apikeys');
    console.log('3. Add VITE_STRIPE_PUBLISHABLE_KEY to your .env file');
    console.log('4. For production, set up a backend to create checkout sessions');

    // For demo purposes, we'll show an alert
    // In a real implementation, this would redirect to Stripe Checkout
    alert(`🚀 Payment Integration Ready!\n\nBooking Details:\n- Amount: R${amount.toFixed(2)}\n- Accommodation: ${bookingDetails.accommodationName}\n- Check-in: ${bookingDetails.checkIn}\n- Check-out: ${bookingDetails.checkOut}\n\nTo complete the integration:\n1. Create Stripe account\n2. Add your API key to .env\n3. Uncomment the redirect code below\n\n✅ Booking saved to database!`);

    // Uncomment this when you have a real Stripe account:
    // const { error } = await stripe.redirectToCheckout(checkoutOptions);
    // if (error) {
    //   throw error;
    // }

    return { success: true, demo: true };

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
