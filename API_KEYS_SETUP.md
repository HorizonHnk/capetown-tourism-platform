# API Keys Setup Guide for Cape Town Tourism App

This guide will help you obtain and configure all the API keys needed for the app to work properly.

## 📋 Required API Keys

Your app needs **3 main API keys**:

1. ✅ **Google Gemini AI** (for AI chatbot) - Already configured
2. ⚠️ **Google Maps API** (for map features) - Needs billing setup
3. ⏸️ **OpenWeather API** (for weather) - Optional

---

## 1. Google Gemini AI API Key ✅ (Already Set Up)

**What it's for:** AI chatbot assistant that helps tourists

**Current Status:** ✅ Working (using `gemini-2.0-flash` model)

**Your current key:** `AIzaSyBflXaGZEruJEoYkSkS-ZjSA3BRzCuxrnE`

**Where to manage:**
- Visit: https://aistudio.google.com/apikey
- Sign in with your Google account
- View/manage your API keys

---

## 2. Google Maps API Key ⚠️ (Needs Billing Setup)

**What it's for:** Interactive maps showing Cape Town attractions

**Current Status:** ⚠️ ERROR - Billing not enabled

**Current Error:**
```
BillingNotEnabledMapError: This API key requires billing to be enabled
```

### How to Fix Google Maps Billing Error:

#### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. Sign in with your Google account

#### Step 2: Select or Create a Project
1. At the top of the page, click the project dropdown
2. Either select your existing project (e.g., "tourism-c8efd")
3. Or click "NEW PROJECT" to create a new one

#### Step 3: Enable Billing (Required!)
1. Go to: https://console.cloud.google.com/billing
2. Click "LINK A BILLING ACCOUNT" or "CREATE BILLING ACCOUNT"
3. Enter your payment information (credit/debit card)
   - ⚠️ **Don't worry!** Google Maps has a **FREE tier**:
   - First **$200/month** of usage is FREE
   - For a small tourism app, you'll likely stay within free limits
4. Click "SET ACCOUNT AND BUDGET" or "SUBMIT AND ENABLE BILLING"

#### Step 4: Enable Required APIs
1. Go to: https://console.cloud.google.com/apis/library
2. Search for and enable these APIs:
   - ✅ **Maps JavaScript API**
   - ✅ **Geocoding API**
   - ✅ **Places API**

#### Step 5: Create/Restrict API Key
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "CREATE CREDENTIALS" → "API key"
3. Copy the new API key
4. Click "RESTRICT KEY" (recommended for security)
5. Under "API restrictions":
   - Select "Restrict key"
   - Enable: Maps JavaScript API, Geocoding API, Places API
6. Under "Application restrictions":
   - Select "HTTP referrers (web sites)"
   - Add: `http://localhost:5173/*` (for development)
   - Add: `https://yourdomain.com/*` (for production)
7. Click "SAVE"

#### Step 6: Update Your .env File
```env
VITE_GOOGLE_MAPS_API_KEY=YOUR_NEW_MAPS_API_KEY_HERE
```

### Alternative: Use a Different Key
If you want to use different keys for Gemini and Maps:
- Keep your Gemini key as is
- Create a separate Maps API key following steps above
- Update `.env` file with the new Maps key

### Free Tier Limits (More than enough for small apps):
- 28,000 map loads per month FREE
- 40,000 geocoding requests per month FREE
- You'll get a $200/month credit

---

## 3. OpenWeather API Key ⏸️ (Optional)

**What it's for:** Real-time weather data for Cape Town

**Current Status:** ⏸️ Using mock/demo data (no real weather)

**Currently in .env:** Empty (app falls back to demo data)

### How to Get OpenWeather API Key (100% FREE):

#### Step 1: Sign Up
1. Visit: https://openweathermap.org/api
2. Click "Get API Key" or "Sign Up"
3. Create a free account

#### Step 2: Get Your API Key
1. After signing up, go to: https://home.openweathermap.org/api_keys
2. Your default API key will be shown
3. Or create a new one by entering a name and clicking "Generate"
4. Copy the API key (looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

#### Step 3: Wait for Activation
- ⚠️ New API keys take **10-15 minutes** to activate
- Don't worry if it doesn't work immediately!

#### Step 4: Update Your .env File
```env
VITE_OPENWEATHER_API_KEY=your_actual_openweather_api_key
```

#### Free Tier:
- 60 calls per minute FREE
- 1,000,000 calls per month FREE
- Perfect for a tourism app!

---

## 🔧 Your Current .env File

Here's what your `.env` file looks like now:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyBP3V9JAKRfYskgVUb36JQgWq0rZ3cu8SA
VITE_FIREBASE_AUTH_DOMAIN=tourism-c8efd.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tourism-c8efd
VITE_FIREBASE_STORAGE_BUCKET=tourism-c8efd.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=9510497339
VITE_FIREBASE_APP_ID=1:9510497339:web:a8c23f7d4e6b9a1c

# Google Gemini AI
VITE_GEMINI_API_KEY=AIzaSyBflXaGZEruJEoYkSkS-ZjSA3BRzCuxrnE

# Google Maps - UPDATE THIS!
VITE_GOOGLE_MAPS_API_KEY=AIzaSyBflXaGZEruJEoYkSkS-ZjSA3BRzCuxrnE  # ⚠️ Needs billing!

# OpenWeather - OPTIONAL
VITE_OPENWEATHER_API_KEY=  # Add your key here (optional)
```

---

## ✅ Quick Action Checklist

### To Fix Google Maps Error (REQUIRED):
- [ ] Go to https://console.cloud.google.com/
- [ ] Enable billing on your project
- [ ] Enable Maps JavaScript API, Geocoding API, Places API
- [ ] Create a new API key or use existing one
- [ ] Update `VITE_GOOGLE_MAPS_API_KEY` in `.env`
- [ ] Restart your dev server

### To Get Real Weather Data (OPTIONAL):
- [ ] Go to https://openweathermap.org/api
- [ ] Sign up for free account
- [ ] Copy your API key
- [ ] Update `VITE_OPENWEATHER_API_KEY` in `.env`
- [ ] Wait 10-15 minutes for activation
- [ ] Restart your dev server

---

## 💡 Important Notes

1. **Never commit `.env` to Git** - It's already in `.gitignore`
2. **Billing is required for Maps** - But the free tier is very generous
3. **Weather is optional** - App works fine with demo weather data
4. **API keys are free** - You only pay if you exceed free limits
5. **Restart dev server** - After changing `.env`, run: `npm run dev`

---

## 🆘 Need Help?

### Google Cloud Support:
- Documentation: https://developers.google.com/maps/documentation
- Billing FAQ: https://cloud.google.com/billing/docs/how-to

### OpenWeather Support:
- Documentation: https://openweathermap.org/api/one-call-3
- FAQ: https://openweathermap.org/faq

### Common Issues:

**Q: Maps still not working after enabling billing?**
A: Wait 5-10 minutes, then clear browser cache and reload

**Q: Worried about costs?**
A: Set up budget alerts in Google Cloud Console to get notified

**Q: Can I use the app without Maps?**
A: Yes, but you'll get errors. Better to enable billing (it's free for small usage)

---

## 📊 Summary

| API | Status | Required? | Cost | Action Needed |
|-----|--------|-----------|------|---------------|
| Google Gemini AI | ✅ Working | Yes | Free | None |
| Google Maps | ⚠️ Error | Yes | Free tier | Enable billing |
| OpenWeather | ⏸️ Demo mode | No | Free tier | Get API key (optional) |

---

**Ready to fix Maps?** Start here: https://console.cloud.google.com/billing

Good luck! 🚀
