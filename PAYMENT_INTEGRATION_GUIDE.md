# 💳 Online Payment Integration Guide
## Cape Town Tourism Platform - Payment Solutions

---

## 🎯 Overview

This guide covers how to add secure online payment functionality to your tourism platform, allowing users to pay for bookings and you to receive money directly.

---

## ✅ Best Payment Gateway Options

### 🏆 Recommended: Stripe (International)

**Why Stripe?**
- ✅ Most secure and trusted worldwide
- ✅ Excellent developer documentation
- ✅ Supports 135+ currencies (ZAR, USD, EUR, GBP)
- ✅ PCI compliant (handles security for you)
- ✅ Easy Firebase integration
- ✅ Instant notifications via webhooks
- ✅ Built-in fraud detection
- ✅ Dashboard to track all payments

**Fees:**
- 2.9% + R2.00 per successful transaction (South Africa)
- 2.9% + $0.30 per transaction (International)
- No setup fees, no monthly fees

**Payout:**
- Money deposited to your bank account within 2-7 days
- Can set up automatic daily/weekly payouts

**Website:** https://stripe.com

---

### 🇿🇦 Alternative: PayFast (South African Focused)

**Why PayFast?**
- ✅ Built specifically for South African market
- ✅ Supports ZAR payments
- ✅ Integration with major SA banks
- ✅ Instant EFT, credit cards, debit cards
- ✅ Cheaper fees for local transactions
- ✅ Trusted by South African businesses

**Fees:**
- 3.8% + R2.00 per transaction (standard)
- 2.9% + R2.00 (if you qualify for lower rate)
- No setup or monthly fees

**Payout:**
- T+3 settlement (money in your account 3 business days after transaction)
- Can withdraw to any SA bank account

**Website:** https://www.payfast.co.za

---

### 💰 Other Options

| Gateway | Best For | Fees | Payout Time |
|---------|----------|------|-------------|
| **PayPal** | International tourists | 3.9% + R2.50 | 1-3 days |
| **Square** | Simple setup | 2.9% + R2.10 | 1-2 days |
| **Yoco** | South African SMEs | 2.95% flat | 2-3 days |
| **PayStack** | African market | 2.9% + R1.50 | 2-7 days |

---

## 🔐 Security & Compliance

### Is It Secure?

**YES!** Modern payment gateways are extremely secure:

✅ **PCI DSS Compliance**
- Payment gateways handle all sensitive card data
- Your server never sees or stores card numbers
- Automatic encryption and security

✅ **Tokenization**
- Card details converted to secure tokens
- Tokens useless if intercepted
- You never handle actual card data

✅ **3D Secure / 3DS2**
- Extra verification layer (OTP, biometrics)
- Reduces fraud significantly
- Required by many banks

✅ **SSL/HTTPS**
- All data encrypted in transit
- Your Netlify site already has HTTPS

### What You Need to Do

1. ✅ Use official SDK/libraries (don't build your own)
2. ✅ Never log or store card numbers
3. ✅ Use environment variables for API keys
4. ✅ Enable webhooks for payment confirmations
5. ✅ Test thoroughly in sandbox mode first

---

## 💡 How It Works

### Payment Flow

```
Customer Journey:
1. User selects accommodation/activity
2. Clicks "Book Now"
3. Fills in booking details
4. Clicks "Pay Now" → Opens secure payment form
5. Enters card details (handled by payment gateway)
6. Confirms payment
7. Receives confirmation email

Owner Journey (You):
1. Receive instant webhook notification
2. See payment in your dashboard
3. Booking marked as "Paid" in Firestore
4. Money deposited to your bank account (2-7 days)
5. View all transactions in payment gateway dashboard
```

---

## 🚀 Implementation Guide: Stripe (Recommended)

### Step 1: Create Stripe Account

1. Go to https://stripe.com
2. Click "Start now" or "Sign up"
3. Enter your business details:
   - Business name: "Cape Town Tourism Platform" (or your name)
   - Country: South Africa
   - Business type: Individual / Company
4. Add your bank account details (where you'll receive money)
5. Verify your email

### Step 2: Get API Keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...`) - Safe to use in frontend
   - **Secret key** (starts with `sk_test_...`) - NEVER expose, backend only

3. Copy both keys

### Step 3: Install Stripe in Your Project

```bash
npm install @stripe/stripe-js
npm install stripe
```

### Step 4: Add API Keys to .env

```env
# Stripe Keys (TEST MODE - for development)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here  # Backend only!

# Stripe Keys (LIVE MODE - for production, get these later)
# VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
# STRIPE_SECRET_KEY=sk_live_your_live_secret_key
```

### Step 5: Create Stripe Service File

Create `src/services/stripe.js`:

```javascript
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const createPaymentIntent = async (amount, currency = 'ZAR', bookingDetails) => {
  try {
    // In production, this should call your backend API
    // For now, we'll use Stripe Checkout (hosted payment page)

    const response = await fetch('YOUR_BACKEND_API/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amount * 100, // Stripe uses cents
        currency: currency.toLowerCase(),
        bookingDetails
      })
    });

    const data = await response.json();
    return data.clientSecret;
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};

export const handlePayment = async (bookingDetails, amount, currency = 'ZAR') => {
  try {
    const stripe = await stripePromise;

    // Create Checkout Session (easier method - Stripe hosts the payment page)
    const response = await fetch('YOUR_BACKEND_API/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookingDetails,
        amount: amount * 100, // Convert to cents
        currency: currency.toLowerCase()
      })
    });

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result;
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};

export default stripePromise;
```

### Step 6: Update Accommodation Booking Component

Update `src/pages/Accommodation.jsx`:

```javascript
import { handlePayment } from '../services/stripe';

const handleBooking = async () => {
  if (!user) {
    navigate('/login', { state: { from: '/accommodation' } });
    return;
  }

  setBookingInProgress(true);

  try {
    const bookingData = {
      accommodationId: selectedAccommodation.id,
      accommodationName: selectedAccommodation.name,
      checkIn: bookingDetails.checkIn,
      checkOut: bookingDetails.checkOut,
      guests: bookingDetails.guests,
      totalCost: calculateTotalCost(),
      userId: user.uid,
      userEmail: user.email,
      status: 'pending_payment', // Changed from 'confirmed'
      createdAt: serverTimestamp(),
    };

    // Save booking as "pending payment"
    const docRef = await addDoc(collection(db, 'bookings'), bookingData);

    // Process payment
    await handlePayment(
      { ...bookingData, bookingId: docRef.id },
      bookingData.totalCost,
      'ZAR' // or get from user preference
    );

    // Payment successful - Stripe will redirect to success page
    // Webhook will update booking status to "paid"

  } catch (error) {
    console.error('❌ Booking/Payment error:', error);
    alert('Failed to process payment. Please try again.');
  } finally {
    setBookingInProgress(false);
  }
};
```

### Step 7: Create Backend API (Firebase Functions)

You need a backend to create payment sessions. Use Firebase Cloud Functions:

1. **Install Firebase Functions:**
```bash
npm install -g firebase-tools
firebase init functions
cd functions
npm install stripe
```

2. **Create `functions/index.js`:**

```javascript
const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.secret_key);
const admin = require('firebase-admin');

admin.initializeApp();

// Create Stripe Checkout Session
exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
  // Verify user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be logged in');
  }

  const { bookingDetails, amount, currency } = data;

  try {
    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency || 'zar',
            product_data: {
              name: bookingDetails.accommodationName,
              description: `Booking from ${bookingDetails.checkIn} to ${bookingDetails.checkOut}`,
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${functions.config().app.url}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${functions.config().app.url}/booking-cancelled`,
      metadata: {
        bookingId: bookingDetails.bookingId,
        userId: context.auth.uid,
      },
    });

    return { id: session.id };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// Webhook to handle successful payments
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = functions.config().stripe.webhook_secret;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Update booking in Firestore
    const bookingId = session.metadata.bookingId;

    await admin.firestore().collection('bookings').doc(bookingId).update({
      status: 'paid',
      paymentIntentId: session.payment_intent,
      paidAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Send confirmation email to owner
    await admin.firestore().collection('mail').add({
      to: 'hhnk3693@gmail.com', // Your email
      message: {
        subject: 'New Booking Payment Received!',
        html: `
          <h2>Payment Received!</h2>
          <p>A new booking has been paid:</p>
          <ul>
            <li>Booking ID: ${bookingId}</li>
            <li>Amount: ${session.amount_total / 100} ${session.currency.toUpperCase()}</li>
            <li>Customer Email: ${session.customer_email}</li>
          </ul>
        `,
      },
    });

    console.log('✅ Payment successful for booking:', bookingId);
  }

  res.json({ received: true });
});
```

3. **Deploy Functions:**
```bash
firebase deploy --only functions
```

4. **Set Environment Variables:**
```bash
firebase functions:config:set stripe.secret_key="sk_test_your_key"
firebase functions:config:set stripe.webhook_secret="whsec_your_webhook_secret"
firebase functions:config:set app.url="https://capetown-tourism-platform.netlify.app"
```

### Step 8: Set Up Webhooks in Stripe Dashboard

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. Enter your webhook URL: `https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/stripeWebhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the "Signing secret" (starts with `whsec_`)
6. Add it to Firebase config (see Step 7.4)

### Step 9: Test Payment Flow

1. **Use Stripe Test Cards:**
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - 3D Secure: `4000 0027 6000 3184`
   - Any future expiry date
   - Any 3-digit CVC
   - Any billing address

2. **Test the flow:**
   - Make a booking
   - Enter test card details
   - Complete payment
   - Check Firestore (booking status = "paid")
   - Check your email for notification
   - Check Stripe Dashboard for payment

---

## 📱 Get Notifications When Someone Pays

### Method 1: Email Notifications (Recommended)

**Using Firebase Trigger Email Extension:**

1. Install extension:
```bash
firebase ext:install firestore-send-email
```

2. Configure:
   - Collection: `mail`
   - SMTP provider: Gmail, SendGrid, or Mailgun

3. When payment succeeds, Cloud Function creates email document (see Step 7.2)

### Method 2: SMS Notifications

**Using Twilio:**

```javascript
const twilio = require('twilio')(accountSid, authToken);

// In your webhook function
await twilio.messages.create({
  body: `New booking payment received! Amount: R${amount}`,
  from: '+1234567890', // Your Twilio number
  to: '+27XXXXXXXXX'    // Your phone number
});
```

### Method 3: Push Notifications

**Using Firebase Cloud Messaging:**

```javascript
await admin.messaging().send({
  token: ownerDeviceToken,
  notification: {
    title: 'Payment Received!',
    body: `New booking: ${bookingDetails.accommodationName}`
  }
});
```

### Method 4: Stripe Dashboard App

- Download Stripe mobile app (iOS/Android)
- Get instant push notifications for all payments
- View transactions on the go

---

## 💰 How You Receive Money

### Automatic Payouts (Recommended)

1. **Set up in Stripe Dashboard:**
   - Go to https://dashboard.stripe.com/settings/payouts
   - Add your bank account details
   - Choose payout schedule:
     - Daily (default)
     - Weekly
     - Monthly
     - Manual

2. **How it works:**
   - Customer pays R1,000 for booking
   - Stripe deducts fee: R1,000 - (2.9% + R2) = R969
   - Money held for 2 days (standard)
   - On day 3, R969 deposited to your bank account
   - You receive email confirmation of payout

### View All Payments

**Stripe Dashboard:**
- https://dashboard.stripe.com/payments
- See all transactions
- Filter by date, amount, status
- Export to CSV/Excel
- View customer details
- Issue refunds

**In Your App (Admin Dashboard):**

Create `src/pages/AdminDashboard.jsx`:

```javascript
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

const AdminDashboard = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    const q = query(
      collection(db, 'bookings'),
      where('status', '==', 'paid')
    );

    const snapshot = await getDocs(q);
    const paymentsData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setPayments(paymentsData);
  };

  const totalRevenue = payments.reduce((sum, p) => sum + p.totalCost, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Payment Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">
            R{totalRevenue.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600">Total Bookings</h3>
          <p className="text-3xl font-bold text-blue-600">
            {payments.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600">Avg Booking</h3>
          <p className="text-3xl font-bold text-purple-600">
            R{(totalRevenue / payments.length || 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Accommodation</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id} className="border-t">
                <td className="px-6 py-4">
                  {payment.paidAt?.toDate().toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{payment.userEmail}</td>
                <td className="px-6 py-4">{payment.accommodationName}</td>
                <td className="px-6 py-4 font-semibold">
                  R{payment.totalCost.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                    Paid
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
```

---

## 🔄 Handling Refunds

### Issue Refund via Stripe Dashboard

1. Go to https://dashboard.stripe.com/payments
2. Find the payment
3. Click "Refund"
4. Enter amount (full or partial)
5. Confirm

**Money returned to customer in 5-10 days**

### Programmatic Refunds

```javascript
const refund = await stripe.refunds.create({
  payment_intent: paymentIntentId,
  amount: 50000, // R500.00 in cents
  reason: 'requested_by_customer'
});

// Update booking in Firestore
await updateDoc(doc(db, 'bookings', bookingId), {
  status: 'refunded',
  refundedAt: serverTimestamp()
});
```

---

## 📊 Payment Tracking & Analytics

### Built-in Stripe Reports

- Revenue reports
- Payout summaries
- Tax reports
- Export to QuickBooks, Xero, etc.

### Custom Analytics in Firebase

```javascript
// Track payment metrics
const analyticsData = {
  totalPayments: payments.length,
  totalRevenue: payments.reduce((sum, p) => sum + p.totalCost, 0),
  averageBookingValue: totalRevenue / payments.length,
  topAccommodations: [...], // Most booked
  revenueByMonth: [...],
  paymentMethods: [...],
};
```

---

## ✅ Go Live Checklist

Before accepting real payments:

- [ ] Test all payment flows thoroughly
- [ ] Test refund process
- [ ] Set up email notifications
- [ ] Complete Stripe account verification
- [ ] Add business/tax information
- [ ] Switch to LIVE API keys (not test keys)
- [ ] Update webhook endpoint to production URL
- [ ] Test with real small amount (R10)
- [ ] Set up automatic payouts
- [ ] Create admin dashboard
- [ ] Add terms & conditions
- [ ] Add refund policy
- [ ] Test on mobile devices
- [ ] Enable 3D Secure

---

## 🆘 Common Issues & Solutions

### Issue 1: Payment Fails

**Solution:**
- Check API keys are correct
- Verify card details
- Check Stripe logs: https://dashboard.stripe.com/logs
- Ensure webhook is working

### Issue 2: Money Not Appearing

**Solution:**
- Check payout schedule (usually 2-3 days delay)
- Verify bank account details in Stripe
- Check "Payouts" tab in dashboard
- Contact Stripe support

### Issue 3: Customer Complains About Charge

**Solution:**
- Check Stripe dashboard for transaction
- Verify booking in Firestore
- Issue refund if necessary
- Update payment_intent with metadata for tracking

---

## 💡 Pro Tips

1. **Always Test First**
   - Use test mode extensively
   - Test failed payments
   - Test webhooks
   - Test refunds

2. **Security**
   - Never expose secret key
   - Use HTTPS everywhere
   - Validate webhooks with signature
   - Don't store card details

3. **User Experience**
   - Show clear pricing
   - Display payment progress
   - Send confirmation emails
   - Handle errors gracefully
   - Show loading states

4. **Business**
   - Set up automatic payouts
   - Enable email notifications
   - Monitor Stripe dashboard daily
   - Keep receipts for taxes
   - Set up budget alerts

---

## 📚 Resources

### Stripe Documentation
- Getting Started: https://stripe.com/docs
- React Integration: https://stripe.com/docs/stripe-js/react
- Firebase Extension: https://firebase.google.com/products/extensions/stripe-firestore-stripe-payments
- Webhooks: https://stripe.com/docs/webhooks

### PayFast Documentation
- Integration Guide: https://www.payfast.co.za/integration/
- API Reference: https://developers.payfast.co.za/

### Support
- Stripe Support: https://support.stripe.com/
- Firebase Support: https://firebase.google.com/support
- Your Email: hhnk3693@gmail.com

---

## 🚀 Quick Start (Fastest Way)

If you want the EASIEST integration:

1. **Use Stripe Payment Links** (No code needed!)
   - Create product in Stripe Dashboard
   - Generate payment link
   - Add link to your booking button
   - Stripe handles everything
   - You get webhook notifications

2. **Or use Firebase Stripe Extension**
   ```bash
   firebase ext:install stripe-firestore-stripe-payments
   ```
   - Automatic setup
   - Minimal code required
   - Built-in webhook handling

---

## 📞 Need Help?

**Contact me:**
- Email: hhnk3693@gmail.com
- Discord: hnk0422_76455

**Stripe Support:**
- Live chat in dashboard
- Email: support@stripe.com
- Phone: Available in dashboard

---

## ✨ Summary

✅ **Security:** Stripe/PayFast handle everything securely
✅ **Notifications:** Email/SMS/Push when payment received
✅ **Money:** Deposited to your bank in 2-7 days
✅ **Tracking:** Dashboard shows all payments
✅ **Fees:** ~3% per transaction (industry standard)
✅ **Easy:** Test mode available, good documentation

**Recommended:** Start with Stripe test mode, test thoroughly, then go live!

---

Good luck! 🚀💰
