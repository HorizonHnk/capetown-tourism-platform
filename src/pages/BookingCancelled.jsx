import { useNavigate } from 'react-router-dom';
import { XCircle, Home, RotateCcw, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const BookingCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Cancelled Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block"
            >
              <div className="bg-white rounded-full p-4 mb-4">
                <XCircle className="h-16 w-16 text-orange-500" />
              </div>
            </motion.div>

            <h1 className="text-4xl font-bold text-white mb-2">
              Payment Cancelled
            </h1>
            <p className="text-orange-100 text-lg">
              Your booking was not completed
            </p>
          </div>

          {/* Details Section */}
          <div className="px-8 py-8">
            <div className="mb-8">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  What happened?
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <p>You cancelled the payment process before completing it</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <p>No charges were made to your card</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <p>Your booking was not confirmed</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Reassurance Section */}
            <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start">
                <HelpCircle className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Don't worry!
                  </h3>
                  <p className="text-sm text-gray-700">
                    Your selected accommodation is still available. You can retry the
                    booking anytime. If you experienced any issues during checkout,
                    please contact our support team.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/accommodation')}
                className="flex-1 flex items-center justify-center px-6 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Try Again
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 flex items-center justify-center px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </button>
            </div>

            {/* Help Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                Need help?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                If you experienced any issues or have questions about the payment
                process, our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:hhnk3693@gmail.com"
                  className="text-center px-6 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
                >
                  Email Support
                </a>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-center px-6 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* Common Issues */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Common payment issues
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>
                    <strong>Card declined:</strong> Check your card details and ensure
                    you have sufficient funds
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>
                    <strong>3D Secure verification:</strong> Some banks require additional
                    verification via SMS or app
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <p>
                    <strong>Browser issues:</strong> Try clearing your cache or using a
                    different browser
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            We're here to make your Cape Town experience amazing! 🌍
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BookingCancelled;
