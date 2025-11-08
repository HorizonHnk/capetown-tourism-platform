# 🚀 Firebase Functions Deployment Guide

## What's Been Set Up

✅ Firebase Functions initialized
✅ Stripe checkout session function created
✅ Stripe webhook handler created
✅ Frontend updated to call Firebase Function
✅ Dependencies installed

---

## 📝 Before Deploying

### 1. Set Environment Variables for Production

Firebase Functions need environment variables to access your Stripe keys. You have two options:

#### Option A: Google Cloud Secret Manager (Recommended for Production)

```bash
# Set Stripe secret key
firebase functions:secrets:set STRIPE_SECRET_KEY

# When prompted, paste your secret key from: https://dashboard.stripe.com/test/apikeys
# Your secret key starts with: sk_test_...
```

#### Option B: Environment Config (Quick Setup)

Create a `.env` file in the `functions` directory (already created):
```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

**Note:** Get your secret key from: https://dashboard.stripe.com/test/apikeys

**Note:** The `.env` file is already set up for you!

---

## 🚀 Deploy Functions

### Deploy All Functions

```bash
cd "C:\Users\Dell\Documents\Visual Studio 2022\Tourism\capetown-tourism-app"
firebase deploy --only functions
```

### Deploy Specific Function

```bash
# Deploy only the createCheckoutSession function
firebase deploy --only functions:createCheckoutSession

# Deploy only the webhook handler
firebase deploy --only functions:stripeWebhook
```

---

## 🧪 Test Functions Locally (Optional)

Before deploying to production, you can test locally with the Firebase Emulator:

### 1. Start Emulator

```bash
cd functions
npm run serve
```

This will start:
- Functions Emulator on http://localhost:5001
- Functions UI on http://localhost:4000

### 2. Update Frontend for Local Testing

Temporarily update `src/services/stripePayment.js`:

```javascript
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';

const functions = getFunctions(app);

// Connect to emulator for local testing
connectFunctionsEmulator(functions, 'localhost', 5001);
```

### 3. Test Booking Flow

Make a test booking and watch the emulator logs.

### 4. Remove Emulator Connection Before Production

Don't forget to remove or comment out the `connectFunctionsEmulator` line before deploying!

---

## 🔗 After Deployment

### 1. Your Functions URLs

After deploying, you'll get URLs like:

```
✔  functions[createCheckoutSession(us-central1)]: https://us-central1-tourism-c8efd.cloudfunctions.net/createCheckoutSession
✔  functions[stripeWebhook(us-central1)]: https://us-central1-tourism-c8efd.cloudfunctions.net/stripeWebhook
```

### 2. Configure Stripe Webhook

1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click **"Add endpoint"**
3. Enter your webhook URL:
   ```
   https://us-central1-tourism-c8efd.cloudfunctions.net/stripeWebhook
   ```
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Click **"Add endpoint"**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Update `functions/.env`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```
8. Redeploy functions:
   ```bash
   firebase deploy --only functions
   ```

---

## 🎯 Testing the Complete Flow

### 1. Make a Test Booking

1. Go to your app: https://capetown-tourism-platform.netlify.app
2. Login with your account
3. Go to Accommodations
4. Select a hotel (one with a price)
5. Click "Book Now"
6. Fill in details and click "Confirm Booking"

### 2. What Should Happen

**Console logs:**
```
🚀 Creating Stripe checkout session via Firebase Function...
💳 Amount: 220 ZAR
📦 Booking ID: abc123
✅ Checkout session created successfully!
🔗 Session ID: cs_test_xxxxx
🌐 Redirecting to Stripe Checkout...
```

**Then:**
- Browser redirects to Stripe Checkout page
- You see payment form
- Enter test card: `4242 4242 4242 4242`
- Click "Pay"
- Redirected to `/booking-success`
- Booking status updated to "paid" in Firestore

### 3. Test Cards

| Card Number | Scenario | Result |
|-------------|----------|--------|
| `4242 4242 4242 4242` | Success | Payment succeeds ✅ |
| `4000 0000 0000 0002` | Decline | Card declined ❌ |
| `4000 0027 6000 3184` | 3D Secure | Requires authentication 🔐 |

**For all test cards:**
- Expiry: Any future date (e.g., `12/25`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

---

## 🐛 Troubleshooting

### Function Not Found Error

**Error:** `Function not found: createCheckoutSession`

**Fix:**
```bash
firebase deploy --only functions
```

Wait 1-2 minutes for deployment to complete.

### Unauthenticated Error

**Error:** `functions/unauthenticated`

**Fix:** Make sure user is logged in before making a booking.

### Stripe Secret Key Error

**Error:** `No API key provided`

**Fix:**
1. Check `functions/.env` has `STRIPE_SECRET_KEY`
2. Redeploy functions
3. Or use Secret Manager (recommended)

### CORS Error

**Error:** `CORS policy blocked`

**Fix:** Firebase Functions automatically handle CORS for `onCall` functions. Make sure you're using `httpsCallable` on frontend.

---

## 💰 Viewing Payments in Stripe Dashboard

1. Go to: https://dashboard.stripe.com/test/payments
2. You'll see all test payments
3. Click on a payment to see details including metadata (booking ID, user ID, etc.)

---

## 🌍 Environment Variables Reference

### Frontend (.env)
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

### Backend (functions/.env)
```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**Get your keys from:**
- Publishable & Secret keys: https://dashboard.stripe.com/test/apikeys
- Webhook secret: https://dashboard.stripe.com/webhooks (after creating endpoint)

---

## 📊 Monitoring & Logs

### View Function Logs

```bash
# View all logs
firebase functions:log

# View specific function logs
firebase functions:log --only createCheckoutSession

# Follow logs in real-time
firebase functions:log --follow
```

### Firebase Console

View logs in Firebase Console:
https://console.firebase.google.com/project/tourism-c8efd/functions/list

---

## 🎉 Success Checklist

- [ ] Functions deployed successfully
- [ ] No deployment errors
- [ ] Test booking creates checkout session
- [ ] Redirects to Stripe Checkout
- [ ] Payment with test card succeeds
- [ ] Redirects to success page
- [ ] Booking status updates to "paid"
- [ ] Webhook configured in Stripe dashboard
- [ ] Webhook updates booking status automatically

---

## 🚀 Going Live (Production Mode)

When ready for real payments:

1. **Switch to Live Stripe Keys**
   ```env
   # Frontend .env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key

   # Backend functions/.env
   STRIPE_SECRET_KEY=sk_live_your_live_key
   ```

2. **Redeploy Everything**
   ```bash
   firebase deploy --only functions
   npm run build
   firebase deploy --only hosting
   ```

3. **Update Webhook**
   - Create new webhook endpoint in Stripe Live mode
   - Use same function URL
   - Update `STRIPE_WEBHOOK_SECRET` with live webhook secret

4. **Test with Real R10**
   - Make small real payment
   - Verify it appears in Stripe dashboard
   - Check booking updates correctly

5. **You're Live!** 🎉

---

## 💡 Pro Tips

1. **Test in Test Mode First**
   - Always test thoroughly with test cards
   - Don't go live until everything works perfectly

2. **Monitor Logs**
   - Keep an eye on function logs
   - Watch for errors or unusual patterns

3. **Set Up Alerts**
   - Configure Firebase Alerts for function errors
   - Set up Stripe email notifications

4. **Backup Plans**
   - Have fallback payment method ready
   - Consider adding PayFast as alternative

---

Good luck with your deployment! 🚀🌍💰
