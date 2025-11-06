import { Link } from 'react-router-dom';
import { MapPin, Mail, Youtube, Twitter, Instagram } from 'lucide-react';
import { SOCIAL_MEDIA, NAV_ITEMS } from '../../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold">Cape Town Tourism</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your ultimate guide to exploring the beauty, culture, and adventures of Cape Town, South Africa.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_ITEMS.slice(0, 6).map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/safety" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link to="/transportation" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Transportation
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Events Calendar
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href={SOCIAL_MEDIA.youtube.playlist}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a
                href={`https://twitter.com/${SOCIAL_MEDIA.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href={`https://instagram.com/${SOCIAL_MEDIA.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${SOCIAL_MEDIA.email}`} className="hover:text-white transition-colors">
                {SOCIAL_MEDIA.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Cape Town Tourism Platform. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
