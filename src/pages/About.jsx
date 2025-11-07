import { Target, Users, Sparkles, Heart, Mail, Youtube, Twitter, Instagram } from 'lucide-react';
import { SOCIAL_MEDIA } from '../utils/constants';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Cape Town Tourism Platform</h1>
          <p className="text-xl text-gray-600">
            Your ultimate digital guide to exploring the beauty of Cape Town
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-gray-100 p-3 rounded-full mr-4">
              <Target className="h-8 w-8 text-gray-700" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            We created this platform to help travelers discover and experience the magic of Cape Town,
            South Africa's Mother City. Our goal is to provide comprehensive, up-to-date information
            and AI-powered tools that make planning your Cape Town adventure effortless and enjoyable.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're seeking breathtaking natural landscapes, rich history and culture, world-class
            wine and cuisine, or thrilling adventures, our platform guides you to create unforgettable
            memories in one of the world's most beautiful destinations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="bg-gray-100 p-3 rounded-full w-fit mb-4">
              <Sparkles className="h-6 w-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Planning</h3>
            <p className="text-gray-600">
              Our Google Gemini AI assistant provides personalized recommendations and helps create
              custom itineraries based on your preferences, budget, and travel style.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="bg-gray-100 p-3 rounded-full w-fit mb-4">
              <Users className="h-6 w-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Information</h3>
            <p className="text-gray-600">
              Access detailed guides on attractions, transportation, safety, events, and more - everything
              you need to plan and enjoy your Cape Town visit.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="bg-gray-100 p-3 rounded-full w-fit mb-4">
              <Heart className="h-6 w-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Made with Passion</h3>
            <p className="text-gray-600">
              Built by travelers for travelers, our platform combines cutting-edge technology with
              genuine love for Cape Town to deliver the best travel planning experience.
            </p>
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Technology</h2>
          <p className="text-lg text-gray-700 mb-6">
            This platform is built with modern web technologies to provide you with a fast, responsive,
            and delightful user experience:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">React 18+</p>
              <p className="text-sm text-gray-600">UI Framework</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">Vite</p>
              <p className="text-sm text-gray-600">Build Tool</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">Tailwind CSS</p>
              <p className="text-sm text-gray-600">Styling</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">Firebase</p>
              <p className="text-sm text-gray-600">Backend</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">Gemini AI</p>
              <p className="text-sm text-gray-600">AI Assistant</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">Formspree</p>
              <p className="text-sm text-gray-600">Contact Forms</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">React Router</p>
              <p className="text-sm text-gray-600">Navigation</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-900">Netlify</p>
              <p className="text-sm text-gray-600">Hosting</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-700 mb-6">
            Have questions, suggestions, or feedback? We'd love to hear from you!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="flex items-center text-gray-700 mb-3">
                <Mail className="h-5 w-5 mr-3" />
                <a href={`mailto:${SOCIAL_MEDIA.email}`} className="hover:text-gray-900">
                  {SOCIAL_MEDIA.email}
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a
                  href={SOCIAL_MEDIA.youtube.playlist}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5 text-gray-700" />
                </a>
                <a
                  href={`https://twitter.com/${SOCIAL_MEDIA.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5 text-gray-700" />
                </a>
                <a
                  href={`https://instagram.com/${SOCIAL_MEDIA.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-gray-700" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Open Source Section */}
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Open Source & Transparency</h2>
          <p className="text-gray-700 mb-4">
            This project is developed with modern web technologies and follows best practices in web development.
            We believe in transparency and continuous improvement.
          </p>
          <a
            href={SOCIAL_MEDIA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
