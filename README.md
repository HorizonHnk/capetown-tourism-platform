# 🌍 Cape Town Tourism Platform

A comprehensive, AI-powered tourism platform for Cape Town, South Africa, built with React JSX + Vite and Tailwind CSS 4.0.

## ✨ Features

### Current Features (v1.0)
- ✅ **Responsive Design**: Works seamlessly on all devices (mobile, tablet, desktop)
- ✅ **Modern UI**: Built with Tailwind CSS 4.0 for a clean, professional look
- ✅ **React Router**: Client-side routing for smooth navigation
- ✅ **Home Page**: Hero section with featured attractions
- ✅ **Contact Form**: Integrated with Formspree for inquiries
- ✅ **Firebase Ready**: Pre-configured for Authentication, Firestore, and Storage
- ✅ **Gemini AI Ready**: Service layer prepared for AI integration

### Upcoming Features
- 🚧 **AI Travel Assistant**: Powered by Google Gemini AI
  - Personalized itinerary generation
  - Real-time chat assistance
  - Budget planning
  - Weather-based recommendations
  - Landmark identification from photos

- 🚧 **Attractions Database**: 50+ Cape Town attractions
  - Interactive maps
  - Filtering and search
  - User reviews and ratings
  - Photo galleries

- 🚧 **Itinerary Planner**: Drag-and-drop interface
  - Multi-day planning
  - Cost estimation
  - Export to PDF/Calendar
  - Save to user account

- 🚧 **User Authentication**: Firebase Auth
  - Email/Password signup
  - Google OAuth
  - User dashboard
  - Favorites and saved itineraries

- 🚧 **Additional Integrations**
  - Google Maps API
  - OpenWeatherMap API
  - Currency converter
  - Events calendar

## 🛠️ Tech Stack

### Frontend
- **React 18+** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **React Router DOM v6** - Client-side routing
- **Framer Motion** - Animations
- **Lucide React** - Modern icons

### Backend & Services
- **Firebase** - Authentication, Firestore, Storage, Analytics
- **Google Gemini AI** - AI-powered travel assistance
- **Formspree** - Contact form handling

### Development Tools
- **ESLint** - Code linting
- **Git** - Version control
- **npm** - Package management

## 📦 Installation

### Prerequisites
- Node.js 18+ or latest LTS version
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/HorizonHnk/capetown-tourism-platform.git
   cd capetown-tourism-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Add your API keys and configuration
   ```bash
   cp .env.example .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:

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

# Additional APIs (optional)
# VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
# VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

⚠️ **Important**: Never commit `.env` file to version control. It's already added to `.gitignore`.

## 📁 Project Structure

```
capetown-tourism-app/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── home/
│   │   ├── attractions/
│   │   ├── ai/
│   │   ├── itinerary/
│   │   ├── user/
│   │   ├── blog/
│   │   └── widgets/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Attractions.jsx
│   │   ├── AIAssistant.jsx
│   │   ├── Contact.jsx
│   │   └── ...
│   ├── services/
│   │   ├── firebase.js
│   │   └── geminiAI.js
│   ├── context/
│   ├── hooks/
│   ├── utils/
│   │   └── constants.js
│   ├── data/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚀 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌐 Deployment

### Netlify (Recommended for initial deployment)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables in Netlify dashboard
   - Deploy!

3. **Configure custom domain** (optional)
   - Add custom domain in Netlify settings
   - Update DNS records
   - SSL automatically provisioned

### Manual Deployment

```bash
# Build for production
npm run build

# The dist/ folder contains all production files
# Upload to your hosting provider
```

## 📧 Contact & Support

- **Email**: hhnk3693@gmail.com
- **YouTube**: [@HNK2005](https://www.youtube.com/playlist?list=PLrZbkNpNVSwzyXZ9pyZ0JZCcaW3tMawup)
- **Twitter**: [@HnkHorizon](https://twitter.com/HnkHorizon)
- **Instagram**: [@hhnk.3693](https://instagram.com/hhnk.3693)
- **TikTok**: [@codingfever](https://tiktok.com/@codingfever)
- **Discord**: hnk0422_76455

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Cape Town tourism industry
- React and Vite communities
- Firebase team
- Google Gemini AI
- All open-source contributors

---

**Built with ❤️ for Cape Town tourism** 🌍✨
