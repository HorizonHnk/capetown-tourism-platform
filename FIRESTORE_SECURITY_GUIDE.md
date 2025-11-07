# Firestore Security Rules Guide

## Overview
This guide explains how to deploy secure Firestore rules for your Cape Town Tourism app. The new security rules ensure that users can only access and modify their own data.

## What Changed?

### Old Rules (INSECURE):
```javascript
match /{document=**} {
  allow read, write: if request.time < timestamp.date(2025, 12, 6);
}
```
**Problem**: Anyone with your Firebase config could read/write ALL data until December 6, 2025.

### New Rules (SECURE):
- Users can only read/write their own bookings
- Users can only access their own favorites, search history, and profiles
- Reviews are public to read but only the creator can modify their own reviews
- All other access is denied by default

## Security Features

### 1. **Bookings Collection** (`/bookings/{bookingId}`)
- ✅ Users can only see their own bookings
- ✅ Users can only create bookings with their own userId
- ✅ Users can only update/delete their own bookings
- ❌ Users cannot see other users' bookings

### 2. **User Profiles** (`/users/{userId}`)
- ✅ Users can manage their own profile data
- ❌ Users cannot access other users' profiles

### 3. **Favorites Collection** (`/favorites/{favoriteId}`)
- ✅ Users can manage their own favorites
- ❌ Users cannot see or modify others' favorites

### 4. **Search History** (`/searchHistory/{historyId}`)
- ✅ Users can manage their own search history
- ❌ Users cannot access others' search history

### 5. **Reviews Collection** (`/reviews/{reviewId}`)
- ✅ Anyone can read reviews (public)
- ✅ Authenticated users can create reviews
- ✅ Users can only edit/delete their own reviews

## How to Deploy

### Option 1: Using Firebase Console (Quick & Easy)

1. **Go to Firebase Console**:
   - Visit: https://console.firebase.google.com/u/3/project/tourism-c8efd/firestore/databases/-default-/rules

2. **Copy the Rules**:
   - Open the `firestore.rules` file in your project
   - Copy all the content

3. **Paste and Publish**:
   - Paste the rules into the Firebase Console editor
   - Click "Publish" button

4. **Done!** Your database is now secure.

### Option 2: Using Firebase CLI (Recommended for Teams)

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Navigate to your project**:
   ```bash
   cd "C:\Users\Dell\Documents\Visual Studio 2022\Tourism\capetown-tourism-app"
   ```

4. **Deploy Firestore Rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

5. **Deploy Indexes** (optional but recommended):
   ```bash
   firebase deploy --only firestore:indexes
   ```

## Testing Your Rules

### Test in Firebase Console:
1. Go to: https://console.firebase.google.com/u/3/project/tourism-c8efd/firestore/databases/-default-/rules
2. Click on "Rules Playground" tab
3. Test different scenarios:

**Example Test 1**: User reading their own booking
```javascript
// Location: /bookings/BOOKING123
// Authenticated: Yes (uid: user123)
// Operation: get

// Document Data:
{
  "userId": "user123",
  "bookingNumber": "BK12345678",
  "totalPrice": 4500
}

// Result: ✅ ALLOW (user owns the booking)
```

**Example Test 2**: User reading someone else's booking
```javascript
// Location: /bookings/BOOKING456
// Authenticated: Yes (uid: user123)
// Operation: get

// Document Data:
{
  "userId": "user999",
  "bookingNumber": "BK98765432",
  "totalPrice": 3200
}

// Result: ❌ DENY (user doesn't own the booking)
```

## Collections You Can Use

Based on your security rules, you can safely store:

### 1. **Bookings** (`bookings` collection)
```javascript
{
  userId: "user-uid",
  userEmail: "user@example.com",
  bookingNumber: "BK12345678",
  item: { /* hotel or restaurant details */ },
  details: { /* booking details */ },
  totalPrice: 4500,
  bookedAt: "2025-11-07T10:30:00.000Z",
  createdAt: serverTimestamp()
}
```

### 2. **User Profiles** (`users` collection)
```javascript
{
  userId: "user-uid",
  displayName: "John Doe",
  email: "john@example.com",
  preferences: {
    currency: "ZAR",
    language: "en"
  },
  createdAt: serverTimestamp()
}
```

### 3. **Favorites** (`favorites` collection)
```javascript
{
  userId: "user-uid",
  placeId: "h1",
  placeName: "The Table Bay Hotel",
  category: "accommodation",
  createdAt: serverTimestamp()
}
```

### 4. **Search History** (`searchHistory` collection)
```javascript
{
  userId: "user-uid",
  searchQuery: "luxury hotels camps bay",
  filters: {
    area: "Camps Bay",
    priceRange: "luxury"
  },
  searchedAt: serverTimestamp()
}
```

### 5. **Reviews** (`reviews` collection)
```javascript
{
  userId: "user-uid",
  userEmail: "user@example.com",
  userName: "John D.",
  placeId: "h1",
  placeName: "The Table Bay Hotel",
  rating: 5,
  comment: "Amazing experience!",
  createdAt: serverTimestamp()
}
```

## Important Notes

⚠️ **Before Deploying**:
1. Make sure all your code uses `request.auth.uid` for userId
2. Test thoroughly in development
3. Back up your current rules (already done via Firebase Console)

✅ **After Deploying**:
1. Test login and booking flow
2. Verify users can see their own bookings
3. Verify users cannot see others' bookings
4. Check that favorites and other features work correctly

🔒 **Security Best Practices**:
1. Never expose Firebase config in public repos (use environment variables ✅)
2. Always validate userId matches request.auth.uid
3. Use server timestamps for createdAt/updatedAt fields
4. Keep your API keys secure

## Troubleshooting

### Error: "Missing or insufficient permissions"
**Solution**: Make sure the user is logged in and accessing their own data. Check that `userId` field matches `request.auth.uid`.

### Error: "PERMISSION_DENIED"
**Solution**: Verify that:
1. User is authenticated
2. The document's userId field matches the logged-in user's uid
3. Rules have been deployed correctly

### Rules not updating?
**Solution**:
1. Wait 1-2 minutes for propagation
2. Clear your browser cache
3. Redeploy rules: `firebase deploy --only firestore:rules`

## Next Steps

1. ✅ Deploy the rules to Firebase
2. ✅ Test the booking flow
3. ✅ Implement user profiles (optional)
4. ✅ Add favorites sync to Firestore (currently in localStorage)
5. ✅ Add search history tracking (optional)
6. ✅ Add reviews feature (optional)

## Support

If you encounter any issues:
1. Check Firebase Console logs: https://console.firebase.google.com/u/3/project/tourism-c8efd/firestore/databases/-default-/usage
2. Test rules in Rules Playground
3. Review this guide

---

**Created**: 2025-11-07
**Project**: Cape Town Tourism Platform
**Firebase Project ID**: tourism-c8efd
