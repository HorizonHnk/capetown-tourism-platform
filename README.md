# 🌍 Cape Town Tourism Platform

> A comprehensive, AI-powered tourism platform for Cape Town, South Africa, built with React + Vite and Tailwind CSS 4.0.

## 🌐 Live Demo

**🚀 Visit the live site:** [https://capetown-tourism-platform.netlify.app/](https://capetown-tourism-platform.netlify.app/)

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

> **Live Site:** [https://capetown-tourism-platform.netlify.app/](https://capetown-tourism-platform.netlify.app/)

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

**Live Site:** [capetown-tourism-platform.netlify.app](https://capetown-tourism-platform.netlify.app/)
**Repository:** [github.com/HorizonHnk/capetown-tourism-platform](https://github.com/HorizonHnk/capetown-tourism-platform)

### ⭐ Star this repo if you found it helpful!

---

**Developed in collaboration with Claude Code**
🤖 AI-Powered Development | ⚡ Built with Vite | ⚛️ Powered by React

---

*Last Updated: November 7, 2025*

</div>
