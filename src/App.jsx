import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Attractions from './pages/Attractions';
import AIAssistant from './pages/AIAssistant';
import Contact from './pages/Contact';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="attractions" element={<Attractions />} />
          <Route path="ai-assistant" element={<AIAssistant />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="planner"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold">Itinerary Planner</h1>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            }
          />
          <Route
            path="blog"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold">Travel Blog</h1>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            }
          />
          <Route
            path="transportation"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold">Transportation Guide</h1>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            }
          />
          <Route
            path="safety"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold">Safety Tips</h1>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            }
          />
          <Route
            path="events"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold">Events & Festivals</h1>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            }
          />
          <Route
            path="about"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold">About Us</h1>
                <p className="text-gray-600 mt-4">
                  Cape Town Tourism Platform - Your ultimate guide to exploring Cape Town, South Africa.
                </p>
              </div>
            }
          />
          <Route
            path="privacy"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold">Privacy Policy</h1>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            }
          />
          <Route
            path="terms"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold">Terms of Service</h1>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            }
          />
          <Route
            path="*"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
                <p className="text-xl text-gray-600">The page you're looking for doesn't exist.</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
