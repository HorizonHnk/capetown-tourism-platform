# 🌍 Cape Town Tourism Platform

> A comprehensive, AI-powered tourism platform for Cape Town, South Africa, built with React + Vite and Tailwind CSS 4.0.

## 🌐 Live Demo

**🚀 Visit the live site:** [https://capetown-tourism.netlify.app/](https://capetown-tourism.netlify.app/)

---

## ⚡ Project Timeline

> **Built in a single day!** 🚀
> **Date:** November 7, 2025
> **Time:** 8:00 AM - 4:00 PM (8 hours)
> **Development Partner:** Claude Code by Anthropic

---

## ✨ Features

### 🎯 Core Features

- ✅ **AI-Powered Travel Assistant**
  - Personalized itinerary generation with Google Gemini AI
  - Real-time chat assistance for travel questions
  - Weather-based activity recommendations
  - Budget planning and cost estimation

- ✅ **Interactive Attractions Database**
  - 50+ Cape Town attractions with detailed information
  - Interactive Leaflet maps with location markers
  - Advanced filtering by category and price range
  - Real-time search functionality
  - Favorites system with local storage

- ✅ **Smart Itinerary Planner**
  - Multi-day trip planning with drag-and-drop interface
  - Activity scheduling with time and cost tracking
  - Budget calculator with multiple currencies (ZAR, USD, EUR, GBP)
  - PDF export functionality
  - Save itineraries to Firestore

- ✅ **User Authentication & Profiles**
  - Firebase Authentication (Email/Password)
  - User dashboard with profile management
  - Secure login and registration
  - Protected routes for authenticated users

- ✅ **Booking System**
  - Book hotels and restaurants
  - Save bookings to Firestore database
  - View booking history in My Bookings page
  - Real-time booking status updates

- ✅ **Weather Integration**
  - Real-time Cape Town weather data
  - Temperature, humidity, wind speed
  - Sunrise/sunset times
  - Weather-based activity suggestions
  - Clickable activity recommendations

- ✅ **Responsive Design**
  - Mobile-first approach
  - Tablet and desktop optimized
  - Hamburger menu for mobile navigation
  - Touch-friendly interface

### 🎨 UI/UX Features

- ✅ **Modern Interface**
  - Beautiful hero carousel with Cape Town nature backgrounds
  - Smooth animations with Framer Motion
  - Interactive cards with hover effects
  - Professional gradient overlays

- ✅ **Interactive Components**
  - Expandable "Why Visit Cape Town" cards
  - Animated counter for attractions
  - Real-time weather refresh button
  - Floating chat widget

### 🔐 Security Features

- ✅ **Firestore Security Rules**
  - User-specific data isolation
  - Authenticated read/write operations
  - Protected bookings and itineraries collections
  - API key protection with environment variables

---

## 🛠️ Tech Stack

### Frontend Technologies
| Technology | Purpose |
|------------|---------|
| **React 18+** | UI library with hooks and context |
| **Vite** | Lightning-fast build tool and dev server |
| **Tailwind CSS 4.0** | Utility-first CSS framework |
| **React Router DOM v6** | Client-side routing and navigation |
| **Framer Motion** | Smooth animations and transitions |
| **Lucide React** | Modern, customizable icons |
| **Leaflet** | Interactive maps for attractions |

### Backend & Services
| Service | Purpose |
|---------|---------|
| **Firebase Authentication** | User authentication and management |
| **Cloud Firestore** | NoSQL database for bookings and itineraries |
| **Google Gemini AI** | AI-powered travel recommendations |
| **Formspree** | Contact form handling |
| **OpenWeatherMap API** | Real-time weather data |

### Development Tools
- **ESLint** - Code quality and linting
- **Git** - Version control
- **npm** - Package management
- **Firebase CLI** - Deployment and management

---

## 📦 Installation

### Prerequisites

> **Required Software:**
> - Node.js 18+ (LTS recommended)
> - npm or yarn package manager
> - Git for version control

### Setup Instructions

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/HorizonHnk/capetown-tourism-platform.git
cd capetown-tourism-platform
```

#### 2️⃣ Install dependencies

```bash
npm install
```

> This will install all required packages including React, Vite, Tailwind, Firebase, and other dependencies.

#### 3️⃣ Configure environment variables

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Add your API keys to `.env`:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Google Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key

# Formspree
VITE_FORMSPREE_ENDPOINT=your_formspree_endpoint

# OpenWeatherMap (Optional)
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

> ⚠️ **Security Warning:** Never commit `.env` file to version control! It's already in `.gitignore`.

#### 4️⃣ Start development server

```bash
npm run dev
```

> Server will start at: `http://localhost:5173`

#### 5️⃣ Open in browser

Navigate to `http://localhost:5173` to see the app running locally.

---

## 🗂️ Project Structure

```
capetown-tourism-platform/
│
├── 📁 public/                    # Static assets
│   └── vite.svg
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 chat/             # Chat widget components
│   │   │   └── FloatingChatWidget.jsx
│   │   ├── 📁 home/             # Home page components
│   │   │   └── HeroCarousel.jsx
│   │   ├── 📁 layout/           # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── 📁 map/              # Map components
│   │   │   ├── AttractionsMap.jsx
│   │   │   └── LeafletMap.jsx
│   │   └── 📁 widgets/          # Reusable widgets
│   │       └── WeatherWidget.jsx
│   │
│   ├── 📁 context/              # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── FavoritesContext.jsx
│   │
│   ├── 📁 pages/                # Page components (15+ pages)
│   │   ├── Home.jsx
│   │   ├── Attractions.jsx
│   │   ├── AIAssistant.jsx
│   │   ├── ItineraryPlanner.jsx
│   │   ├── MyBookings.jsx
│   │   ├── MyItineraries.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Profile.jsx
│   │   └── ...
│   │
│   ├── 📁 services/             # API and service integrations
│   │   ├── firebase.js
│   │   ├── geminiAI.js
│   │   ├── weatherService.js
│   │   └── pdfExport.js
│   │
│   ├── 📁 utils/                # Utility functions
│   │   └── constants.js
│   │
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
│
├── 📁 dist/                     # Production build output
│
├── 📄 .env                      # Environment variables (not in git)
├── 📄 .env.example              # Environment template
├── 📄 .gitignore                # Git ignore rules
├── 📄 firebase.json             # Firebase configuration
├── 📄 firestore.rules           # Firestore security rules
├── 📄 firestore.indexes.json   # Firestore indexes
├── 📄 package.json              # Dependencies and scripts
├── 📄 vite.config.js            # Vite configuration
├── 📄 tailwind.config.js        # Tailwind CSS configuration
└── 📄 README.md                 # This file
```

---

## 💻 Code Architecture & Implementation

### Architecture Overview

The application follows a **component-based architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────┐
│                   React Application                 │
├─────────────────────────────────────────────────────┤
│  Layout (Header + Content + Footer)                │
├──────────────┬──────────────────────────────────────┤
│   Routing    │  Pages (15+ routes)                  │
├──────────────┼──────────────────────────────────────┤
│   Context    │  - Auth Context (User state)         │
│   Providers  │  - Favorites Context (Local state)   │
├──────────────┼──────────────────────────────────────┤
│   Services   │  - Firebase (Auth + Firestore)       │
│   Layer      │  - Gemini AI (Chat + Itinerary)      │
│              │  - Weather API (OpenWeatherMap)      │
│              │  - PDF Export (jsPDF)                │
└──────────────┴──────────────────────────────────────┘
```

### Design Patterns Used

1. **Context API Pattern** - Global state management for authentication and favorites
2. **Service Layer Pattern** - Abstraction for external API calls
3. **Component Composition** - Reusable UI components
4. **Protected Routes** - Authentication-based route access
5. **Fallback Strategy** - Firestore with localStorage fallback

---

## 🔧 Core Components Breakdown

### 1. Authentication System

**File:** `src/context/AuthContext.jsx`

```javascript
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Features:**
- Persistent auth state with Firebase
- Auto-login on page refresh
- Protected route enforcement
- User session management

---

### 2. Firestore Database Integration

**File:** `src/services/firebase.js`

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

**Security Rules (Firestore):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    match /bookings/{bookingId} {
      allow read: if isAuthenticated() &&
                     isOwner(resource.data.userId);
      allow create: if isAuthenticated() &&
                       isOwner(request.resource.data.userId);
      allow update, delete: if isAuthenticated() &&
                               isOwner(resource.data.userId);
    }

    match /itineraries/{itineraryId} {
      allow read: if isAuthenticated() &&
                     isOwner(resource.data.userId);
      allow create: if isAuthenticated() &&
                       isOwner(request.resource.data.userId);
      allow update, delete: if isAuthenticated() &&
                               isOwner(resource.data.userId);
    }
  }
}
```

---

### 3. AI Integration with Google Gemini

**File:** `src/services/geminiAI.js`

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateChatResponse = async (userMessage) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini AI Error:', error);
    throw error;
  }
};

export const generateItinerary = async (days, budget, interests) => {
  const prompt = `Create a ${days}-day Cape Town itinerary for a ${budget}
  budget. Focus on: ${interests.join(', ')}. Include specific attractions,
  estimated costs, and time allocations.`;

  return await generateChatResponse(prompt);
};
```

**AI Features:**
- Context-aware travel recommendations
- Budget-optimized itinerary generation
- Weather-based activity suggestions
- Real-time chat assistance

---

### 4. Booking System Implementation

**File:** `src/pages/Accommodation.jsx`

```javascript
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
      status: 'confirmed',
      createdAt: serverTimestamp(),
    };

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'bookings'), bookingData);
    console.log('✅ Booking saved with ID:', docRef.id);

    // Also save to localStorage as backup
    const localBookings = JSON.parse(
      localStorage.getItem(`bookings_${user.uid}`) || '[]'
    );
    localBookings.push({ id: docRef.id, ...bookingData });
    localStorage.setItem(`bookings_${user.uid}`, JSON.stringify(localBookings));

    setShowConfirmation(true);
  } catch (error) {
    console.error('❌ Booking error:', error);
    alert('Failed to complete booking. Please try again.');
  } finally {
    setBookingInProgress(false);
  }
};
```

---

### 5. Smart Itinerary Planner

**File:** `src/pages/ItineraryPlanner.jsx`

**Key Features:**
- Drag-and-drop day planning
- Multi-currency budget calculator
- PDF export functionality
- Firestore sync

```javascript
const [days, setDays] = useState([
  { id: 1, date: '', activities: [] }
]);
const [budget, setBudget] = useState(0);
const [currency, setCurrency] = useState('ZAR');

// Add activity to specific day
const addActivity = (dayId, activity) => {
  setDays(days.map(day =>
    day.id === dayId
      ? { ...day, activities: [...day.activities, activity] }
      : day
  ));
};

// Save to Firestore
const saveItinerary = async () => {
  const itineraryData = {
    name: itineraryName,
    days: days,
    budget: budget,
    currency: currency,
    totalDays: days.length,
    totalActivities: days.reduce((sum, day) =>
      sum + day.activities.length, 0
    ),
    userId: user.uid,
    createdAt: serverTimestamp(),
  };

  await addDoc(collection(db, 'itineraries'), itineraryData);
};

// Export to PDF
const exportToPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('Cape Town Itinerary', 20, 20);

  days.forEach((day, index) => {
    doc.setFontSize(14);
    doc.text(`Day ${index + 1}: ${day.date}`, 20, 40 + (index * 60));

    day.activities.forEach((activity, actIndex) => {
      doc.setFontSize(10);
      doc.text(`- ${activity.name}`, 25, 50 + (index * 60) + (actIndex * 10));
    });
  });

  doc.save('cape-town-itinerary.pdf');
};
```

---

### 6. Weather Integration

**File:** `src/services/weatherService.js`

```javascript
const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const CAPE_TOWN_COORDS = { lat: -33.9249, lon: 18.4241 };

export const getCurrentWeather = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${CAPE_TOWN_COORDS.lat}&lon=${CAPE_TOWN_COORDS.lon}&units=metric&appid=${WEATHER_API_KEY}`
    );
    const data = await response.json();

    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      description: data.weather[0].description,
      sunrise: new Date(data.sys.sunrise * 1000),
      sunset: new Date(data.sys.sunset * 1000),
    };
  } catch (error) {
    console.error('Weather API Error:', error);
    return null;
  }
};

export const getWeatherBasedSuggestions = (weather) => {
  if (weather.temp > 25) {
    return {
      message: "Perfect beach weather!",
      activities: ['Beach day', 'Table Mountain', 'Chapman\'s Peak Drive']
    };
  } else if (weather.temp < 15) {
    return {
      message: "Indoor activities recommended",
      activities: ['Indoor museums', 'V&A Waterfront', 'Cafe hopping']
    };
  } else {
    return {
      message: "Great day for sightseeing!",
      activities: ['Kirstenbosch Gardens', 'Signal Hill walk', 'City sightseeing']
    };
  }
};
```

---

### 7. Interactive Maps with Leaflet

**File:** `src/components/map/LeafletMap.jsx`

```javascript
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ attractions }) => {
  const capeTownCenter = [-33.9249, 18.4241];

  return (
    <MapContainer
      center={capeTownCenter}
      zoom={12}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {attractions.map((attraction) => (
        <Marker
          key={attraction.id}
          position={[attraction.latitude, attraction.longitude]}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-bold">{attraction.name}</h3>
              <p>{attraction.category}</p>
              <p className="text-sm text-gray-600">
                {attraction.priceRange}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
```

---

### 8. Responsive Navigation

**File:** `src/components/layout/Header.jsx`

**Features:**
- Auto-hide on scroll down, show on scroll up
- Hamburger menu for mobile (< 1280px)
- Favorites counter badge
- User dropdown menu

```javascript
const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`sticky top-0 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      {/* Header content */}
    </header>
  );
};
```

---

### 9. Favorites System

**File:** `src/context/FavoritesContext.jsx`

```javascript
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const addFavorite = (attraction) => {
    const updated = [...favorites, attraction];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const removeFavorite = (attractionId) => {
    const updated = favorites.filter(fav => fav.id !== attractionId);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const isFavorite = (attractionId) => {
    return favorites.some(fav => fav.id === attractionId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      favoritesCount: favorites.length,
      addFavorite,
      removeFavorite,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
```

---

## 📊 Database Schema

### Firestore Collections

#### `bookings` Collection
```javascript
{
  id: "auto-generated-id",
  userId: "firebase-user-uid",
  userEmail: "user@example.com",
  accommodationId: "accommodation-123",
  accommodationName: "Table Mountain Hotel",
  checkIn: Timestamp,
  checkOut: Timestamp,
  guests: 2,
  totalCost: 2500,
  status: "confirmed",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### `itineraries` Collection
```javascript
{
  id: "auto-generated-id",
  name: "5-Day Cape Town Adventure",
  userId: "firebase-user-uid",
  userEmail: "user@example.com",
  days: [
    {
      id: 1,
      date: "2025-11-10",
      activities: [
        {
          name: "Table Mountain",
          time: "09:00",
          duration: "3 hours",
          cost: 350
        }
      ]
    }
  ],
  budget: 10000,
  currency: "ZAR",
  totalDays: 5,
  totalActivities: 12,
  totalCost: 8500,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastModified: Timestamp
}
```

#### `users` Collection
```javascript
{
  uid: "firebase-user-uid",
  email: "user@example.com",
  displayName: "John Doe",
  createdAt: Timestamp,
  lastLogin: Timestamp,
  preferences: {
    currency: "ZAR",
    language: "en"
  }
}
```

---

## 🔄 Data Flow Architecture

### Booking Flow
```
User Action (Click Book)
    ↓
Check Authentication
    ↓
Collect Booking Details
    ↓
Validate Input
    ↓
Save to Firestore (Primary)
    ↓
Save to localStorage (Backup)
    ↓
Show Confirmation
    ↓
Navigate to My Bookings
```

### Itinerary Flow
```
User Creates Itinerary
    ↓
Add Days & Activities
    ↓
Calculate Budget
    ↓
Save Button Click
    ↓
Save to Firestore with User ID
    ↓
Update Local State
    ↓
Show Success Message
    ↓
View in My Itineraries
```

### Authentication Flow
```
User Enters Credentials
    ↓
Firebase Authentication
    ↓
Auth State Change Listener
    ↓
Update Context State
    ↓
Store User Object
    ↓
Enable Protected Routes
    ↓
Load User-Specific Data
```

---

## ⚡ Performance Optimizations

### 1. Code Splitting
```javascript
// Lazy load routes for better initial load time
const Home = lazy(() => import('./pages/Home'));
const Attractions = lazy(() => import('./pages/Attractions'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));
```

### 2. Image Optimization
- Unsplash images with `w=1920&q=80` parameters
- Lazy loading for off-screen images
- WebP format support

### 3. Memoization
```javascript
const memoizedValue = useMemo(() =>
  computeExpensiveValue(a, b),
  [a, b]
);
```

### 4. Debounced Search
```javascript
const debouncedSearch = useMemo(
  () => debounce((query) => setSearchTerm(query), 300),
  []
);
```

### 5. Firestore Query Optimization
- Index-aware queries
- Fallback to simple queries without `orderBy`
- Client-side sorting for non-indexed queries

---

## 🛡️ Error Handling

### Graceful Degradation
```javascript
try {
  // Try Firestore first
  const data = await fetchFromFirestore();
} catch (firestoreError) {
  console.warn('Firestore error, using localStorage fallback');
  // Fallback to localStorage
  const data = loadFromLocalStorage();
}
```

### User-Friendly Error Messages
```javascript
catch (error) {
  if (error.code === 'permission-denied') {
    alert('You don\'t have permission to access this data.');
  } else if (error.code === 'unavailable') {
    alert('Service temporarily unavailable. Please try again.');
  } else {
    alert('An unexpected error occurred. Please try again later.');
  }
}
```

---

## 🚀 Available Scripts

### Development

```bash
# Start development server with hot reload
npm run dev
```

> Runs on `http://localhost:5173` with instant HMR (Hot Module Replacement)

### Production

```bash
# Build for production
npm run build
```

> Creates optimized build in `dist/` folder

```bash
# Preview production build locally
npm run preview
```

> Test production build before deployment

### Code Quality

```bash
# Run ESLint
npm run lint
```

> Check code quality and fix issues

---

## 🌐 Deployment

### 📦 Deploy to Netlify (Current)

> **Live Site:** [https://capetown-tourism.netlify.app/](https://capetown-tourism.netlify.app/)

#### Option 1: Manual Deploy (Current Method)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload to Netlify:**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag the `dist/` folder
   - Wait for deployment ✅

3. **Configure environment variables:**
   - Go to **Site settings** → **Environment variables**
   - Add all variables from `.env`
   - Redeploy if needed

#### Option 2: Continuous Deployment

1. **Connect GitHub repository:**
   - Log in to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import from Git"
   - Select your repository

2. **Configure build settings:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Add environment variables** in Netlify dashboard

4. **Deploy!** Every push to `main` triggers automatic deployment

---

### 🔥 Deploy to Firebase Hosting

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not done)
firebase init

# Build the project
npm run build

# Deploy to Firebase
firebase deploy
```

---

### 🌊 Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Or deploy to production
vercel --prod
```

---

## 🔐 Security Best Practices

> **Important Security Measures Implemented:**

### Environment Variables
- ✅ All API keys stored in `.env` file
- ✅ `.env` excluded from Git with `.gitignore`
- ✅ Environment variables prefixed with `VITE_`

### Firestore Security
- ✅ Comprehensive security rules deployed
- ✅ User-specific data isolation
- ✅ Authentication required for write operations
- ✅ Read access limited to data owners

### Authentication
- ✅ Firebase Authentication integration
- ✅ Protected routes for authenticated users
- ✅ Secure token handling
- ✅ Email/password encryption

---

## 📚 Documentation

### Additional Guides

- 📖 [API Keys Setup Guide](./API_KEYS_SETUP.md)
- 🔒 [Firestore Security Guide](./FIRESTORE_SECURITY_GUIDE.md)
- 🗺️ [Maps Alternatives Documentation](./MAPS_ALTERNATIVES.md)

---

## 🎯 Key Features Breakdown

### 1. AI Travel Assistant
> Powered by Google Gemini AI for intelligent travel planning

- **Chat Interface:** Real-time conversational AI
- **Itinerary Generation:** Personalized multi-day plans
- **Budget Planning:** Cost estimation and optimization
- **Weather Integration:** Activity suggestions based on conditions

### 2. Interactive Maps
> Built with Leaflet for smooth map interactions

- **Attraction Markers:** Visual location indicators
- **Popup Information:** Details on click
- **Zoom & Pan:** Smooth navigation
- **Responsive:** Works on all devices

### 3. Booking System
> Firebase-powered booking management

- **Real-time Updates:** Instant booking confirmations
- **History Tracking:** View all past bookings
- **Secure Storage:** Firestore database
- **User Isolation:** See only your bookings

### 4. Weather Widget
> Live Cape Town weather with activity suggestions

- **Current Conditions:** Temperature, humidity, wind
- **Sunrise/Sunset:** Daily times
- **Activity Suggestions:** Weather-appropriate recommendations
- **Auto-refresh:** Updates every 30 minutes

---

## 📧 Contact & Support

### Connect with the Developer

| Platform | Link |
|----------|------|
| 📧 **Email** | [hhnk3693@gmail.com](mailto:hhnk3693@gmail.com) |
| 🎥 **YouTube** | [@HNK2005](https://www.youtube.com/playlist?list=PLrZbkNpNVSwzyXZ9pyZ0JZCcaW3tMawup) |
| 🐦 **Twitter** | [@HnkHorizon](https://twitter.com/HnkHorizon) |
| 📸 **Instagram** | [@hhnk.3693](https://instagram.com/hhnk.3693) |
| 🎵 **TikTok** | [@codingfever](https://tiktok.com/@codingfever) |
| 💬 **Discord** | hnk0422_76455 |

---

## 🤝 Contributing

> Contributions, issues, and feature requests are welcome!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit changes:** `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

---

## 📝 License

This project is licensed under the **MIT License**.

> See [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### Special Thanks

- 🌍 **Cape Town Tourism Industry** - Inspiration and information
- ⚛️ **React Team** - Amazing UI library
- ⚡ **Vite Team** - Lightning-fast build tool
- 🎨 **Tailwind CSS Team** - Beautiful utility-first CSS
- 🔥 **Firebase Team** - Powerful backend services
- 🤖 **Google Gemini AI** - Intelligent travel assistance
- 🗺️ **Leaflet Community** - Interactive mapping solution
- 💬 **Claude Code by Anthropic** - AI development partner
- 🌟 **Open Source Community** - Countless helpful libraries

---

## 📊 Project Stats

> Built in a single intensive development session!

| Metric | Value |
|--------|-------|
| **Development Time** | 8 hours (8 AM - 4 PM) |
| **Lines of Code** | 10,000+ |
| **Components** | 30+ React components |
| **Pages** | 15+ fully functional pages |
| **API Integrations** | 4 (Firebase, Gemini AI, Weather, Maps) |
| **Commits** | 3 comprehensive commits |
| **Features** | 25+ major features |

---

## 🌟 Highlights

> What makes this project special:

- ✅ **Rapid Development** - Full-stack app in 8 hours
- ✅ **Modern Tech Stack** - Latest React, Vite, Tailwind
- ✅ **AI Integration** - Google Gemini for smart recommendations
- ✅ **Production Ready** - Deployed and live on Netlify
- ✅ **Secure** - Firestore security rules and auth
- ✅ **Responsive** - Works flawlessly on all devices
- ✅ **Well Documented** - Comprehensive guides and comments

---

## 🚀 Future Enhancements

### Planned Features

- [ ] Google Maps API integration (currently using Leaflet)
- [ ] User reviews and ratings system
- [ ] Photo upload for attractions
- [ ] Social sharing features
- [ ] Multi-language support
- [ ] Currency converter API
- [ ] Event calendar integration
- [ ] Offline PWA support
- [ ] Push notifications
- [ ] Advanced analytics

---

<div align="center">

## 🌍 Built with ❤️ for Cape Town Tourism

**Live Site:** [https://capetown-tourism.netlify.app/](https://capetown-tourism.netlify.app/)
**Repository:** [github.com/HorizonHnk/capetown-tourism-platform](https://github.com/HorizonHnk/capetown-tourism-platform)

### ⭐ Star this repo if you found it helpful!

---

**Developed in collaboration with Claude Code**
🤖 AI-Powered Development | ⚡ Built with Vite | ⚛️ Powered by React

---

*Last Updated: November 7, 2025*

</div>
