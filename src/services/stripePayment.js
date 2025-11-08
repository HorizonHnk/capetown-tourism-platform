import { loadStripe } from '@stripe/stripe-js';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from './firebase';

// Initialize Stripe with your publishable key
// This is safe to expose in frontend code
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Only initialize Stripe if we have a valid key
const stripePromise = stripeKey && stripeKey.startsWith('pk_')
  ? loadStripe(stripeKey)
  : null;

// Initialize Firebase Functions
const functions = getFunctions(app);

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

    console.log('🚀 Creating Stripe checkout session via Firebase Function...');
    console.log('💳 Amount:', amount, currency);
    console.log('📦 Booking ID:', bookingDetails.bookingId);

    // Call Firebase Function to create checkout session
    const createCheckoutSessionFunction = httpsCallable(functions, 'createCheckoutSession');

    const result = await createCheckoutSessionFunction({
      bookingId: bookingDetails.bookingId,
      accommodationName: bookingDetails.accommodationName,
      amount: amount,
      checkIn: bookingDetails.checkIn,
      checkOut: bookingDetails.checkOut,
      userId: bookingDetails.userId,
      userEmail: bookingDetails.userEmail,
      accommodationId: bookingDetails.accommodationId,
      successUrl: `${window.location.origin}/booking-success`,
      cancelUrl: `${window.location.origin}/booking-cancelled`,
    });

    const { sessionId, url } = result.data;

    console.log('✅ Checkout session created successfully!');
    console.log('🔗 Session ID:', sessionId);
    console.log('🌐 Redirecting to Stripe Checkout...');

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      throw error;
    }

    return { success: true, sessionId };

  } catch (error) {
    console.error('❌ Stripe payment error:', error);

    // Show user-friendly error message
    if (error.code === 'functions/unauthenticated') {
      throw new Error('Please log in to complete your booking');
    } else if (error.code === 'functions/invalid-argument') {
      throw new Error('Invalid booking details. Please try again.');
    } else {
      throw new Error(`Payment failed: ${error.message}`);
    }
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
