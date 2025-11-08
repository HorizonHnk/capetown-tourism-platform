# 🚀 Quick Stripe Payment Setup Guide

## ✅ What You've Got So Far

Your Cape Town Tourism Platform now has Stripe payment integration! Here's what's been added:

- ✅ Stripe SDK installed
- ✅ Payment service created (`src/services/stripePayment.js`)
- ✅ Booking component updated with payment flow
- ✅ Success page created (`/booking-success`)
- ✅ Cancellation page created (`/booking-cancelled`)
- ✅ Routes configured

---

## 🎯 Next Steps: Get Your Stripe Account (5 Minutes!)

### Step 1: Create Stripe Account

1. **Go to Stripe:** https://stripe.com
2. **Click "Start now"** or "Sign up"
3. **Enter your details:**
   - Email: `hhnk3693@gmail.com` (or your preferred email)
   - Password: Create a strong password
   - Country: South Africa 🇿🇦

4. **Complete registration**
   - Verify your email
   - Answer a few questions about your business

---

### Step 2: Get Your API Keys (Test Mode)

1. **Go to API Keys page:**
   - Direct link: https://dashboard.stripe.com/test/apikeys
   - Or from dashboard: **Developers** → **API keys**

2. **You'll see two keys:**

   **Publishable Key** (Safe to expose in frontend)
   ```
   pk_test_51XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

   **Secret Key** (NEVER expose! Backend only)
   ```
   sk_test_51XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

3. **Click "Reveal test key" and copy it**

---

### Step 3: Add Key to Your Project

1. **Open your `.env` file** in the project root

2. **Add this line:**
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
   ```

3. **Replace `pk_test_YOUR_ACTUAL_KEY_HERE`** with your actual key from Stripe

4. **Save the file**

---

### Step 4: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

---

## 🧪 Test Your Payment Flow

### Test Card Numbers (Stripe Test Mode)

Use these fake cards to test payments:

| Card Number | Scenario | Result |
|-------------|----------|--------|
| `4242 4242 4242 4242` | Success | Payment succeeds ✅ |
| `4000 0000 0000 0002` | Decline | Card declined ❌ |
| `4000 0027 6000 3184` | 3D Secure | Requires authentication 🔐 |

**For all test cards:**
- Expiry: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

---

### Testing Steps

1. **Login to your app**
2. **Go to Accommodations** (`/accommodation`)
3. **Select a hotel or restaurant**
4. **Click "Book Now"**
5. **Fill in booking details**
6. **Click "Confirm Booking"**
7. **You'll see a demo payment alert** (for now)
8. **Check console** for payment logs

---

## 🔄 How It Currently Works (Demo Mode)

Right now, the payment integration is in **demo mode**:

1. ✅ Booking is saved to Firestore
2. ✅ Payment function is called
3. ⚠️ Shows alert instead of redirecting to Stripe
4. ✅ Booking marked as "pending_payment"

**Why?** Because you need to complete the full Stripe setup first!

---

## 🚀 Going Live: Full Integration

To enable real Stripe Checkout:

### Option 1: Use Stripe Checkout (Easiest - No Backend Needed!)

This is already configured! Once you:
1. Add your Stripe key to `.env`
2. Uncomment the redirect code in `stripePayment.js` (line 48-50)
3. Restart server

**That's it!** Stripe handles everything:
- Payment form (hosted by Stripe)
- Card validation
- 3D Secure
- Security
- PCI compliance

### Option 2: Custom Payment Form (Advanced)

For a fully custom payment experience inside your app:
1. Install `@stripe/react-stripe-js`
2. Create custom payment form component
3. See `PAYMENT_INTEGRATION_GUIDE.md` for full code

---

## 📧 Enable Payment Notifications

To get notified when someone pays:

### Quick Setup (Stripe Dashboard)

1. **Download Stripe Mobile App:**
   - iOS: https://apps.apple.com/app/stripe-dashboard/id978516833
   - Android: https://play.google.com/store/apps/details?id=com.stripe.android.dashboard

2. **Login with your Stripe account**

3. **Enable push notifications**

**Now you'll get instant alerts on your phone!** 📱

### Email Notifications (Automatic)

Stripe automatically sends you emails for:
- Successful payments
- Failed payments
- Disputes
- Payouts

Check your email: `hhnk3693@gmail.com`

---

## 💰 Money Flow

### How You Get Paid

1. **Customer pays R1,000** for booking
2. **Stripe deducts fee:** R1,000 - (2.9% + R2) = **R969**
3. **Money held for 2 days** (standard security delay)
4. **Day 3:** R969 **deposited to your bank account** 💸

### Set Up Bank Account

1. Go to: https://dashboard.stripe.com/settings/payouts
2. Click "Add bank account"
3. Enter your SA bank details:
   - Bank name
   - Account number
   - Branch code
4. Stripe will verify with 2 small test deposits
5. Confirm the amounts
6. **Done!** Automatic payouts enabled

---

## 🔐 Security Checklist

- ✅ Never commit `.env` file to Git (already in `.gitignore`)
- ✅ Only use publishable key in frontend
- ✅ Secret key only on backend (not needed yet)
- ✅ Always test in test mode first
- ✅ Use environment variables

---

## 📊 Dashboard Overview

**Stripe Dashboard:** https://dashboard.stripe.com

Key sections:
- **Payments:** See all transactions
- **Customers:** View customer data
- **Balance:** Check your balance
- **Payouts:** See when you'll get paid
- **Developers:** API keys, webhooks, logs

---

## 🐛 Troubleshooting

### "Stripe failed to initialize"

**Fix:** Check that `VITE_STRIPE_PUBLISHABLE_KEY` is set in `.env`

### Payment not working

**Fix:**
1. Restart dev server
2. Clear browser cache
3. Check browser console for errors
4. Verify API key starts with `pk_test_`

### Money not appearing

**Fix:**
- Test mode payments are NOT real money
- Add bank account in dashboard
- Wait 2-3 days after payment
- Check "Balance" in dashboard

---

## 📈 Going to Production

When you're ready for real payments:

1. **Verify Business Details:**
   - Go to: https://dashboard.stripe.com/settings/account
   - Add business information
   - Verify identity (passport/ID)
   - Add bank account

2. **Switch to Live Mode:**
   - Get LIVE API keys: https://dashboard.stripe.com/apikeys
   - Update `.env` with live key:
     ```env
     VITE_STRIPE_PUBLISHABLE_KEY=pk_live_XXXXXX
     ```

3. **Test with real R10:**
   - Make a small real payment
   - Check it appears in dashboard
   - Wait for payout

4. **Deploy to Netlify:**
   - Add Stripe key to Netlify environment variables
   - Deploy
   - **You're live!** 🎉

---

## 💡 Pro Tips

1. **Start in Test Mode**
   - Play around freely
   - No real money involved
   - Practice refunds

2. **Set Up Email Receipts**
   - https://dashboard.stripe.com/settings/emails
   - Customize email templates
   - Add your logo

3. **Enable Radar (Fraud Detection)**
   - Free built-in fraud prevention
   - Blocks suspicious cards
   - Reduces chargebacks

4. **Mobile App**
   - Monitor on the go
   - Instant notifications
   - Issue refunds from phone

---

## 📞 Need Help?

### Stripe Support
- Help Center: https://support.stripe.com
- Live Chat: Available in dashboard
- Phone: Available for verified accounts

### Your Support
- Email: hhnk3693@gmail.com
- Discord: hnk0422_76455

---

## ✨ What's Next?

After setting up Stripe:

- [ ] Create Stripe account
- [ ] Get test API key
- [ ] Add key to `.env`
- [ ] Restart server
- [ ] Test booking flow
- [ ] Test with card `4242 4242 4242 4242`
- [ ] Add bank account for payouts
- [ ] Download mobile app
- [ ] Test going live with R10

---

## 🎉 You're Almost There!

Just:
1. ✅ Create Stripe account (5 mins)
2. ✅ Copy API key
3. ✅ Paste in `.env`
4. ✅ Restart server
5. ✅ Start accepting payments!

**Total time: 10 minutes** ⏱️

---

**Good luck!** 🚀

Your tourism platform is ready to make money! 💰🌍
