import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Calendar, Mail, Download, Home, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';

const BookingSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('booking_id');
  const [updating, setUpdating] = useState(true);

  useEffect(() => {
    // Update booking status in Firestore
    const updateBookingStatus = async () => {
      if (!bookingId) {
        setUpdating(false);
        return;
      }

      try {
        const bookingRef = doc(db, 'bookings', bookingId);
        await updateDoc(bookingRef, {
          status: 'paid',
          paidAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        console.log('✅ Booking status updated to "paid"');
      } catch (error) {
        console.error('❌ Error updating booking status:', error);
      } finally {
        setUpdating(false);
      }
    };

    updateBookingStatus();
  }, [bookingId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block"
            >
              <div className="bg-white rounded-full p-4 mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
            </motion.div>

            <h1 className="text-4xl font-bold text-white mb-2">
              Payment Successful!
            </h1>
            <p className="text-green-100 text-lg">
              Your booking has been confirmed
            </p>
          </div>

          {/* Details Section */}
          <div className="px-8 py-8">
            {updating ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Confirming your booking...</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                      What happens next?
                    </h2>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Mail className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Confirmation Email</p>
                          <p className="text-sm text-gray-600">
                            We've sent a confirmation email with all booking details
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Calendar className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Booking Confirmation</p>
                          <p className="text-sm text-gray-600">
                            The accommodation will contact you within 24 hours
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Download className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Receipt Available</p>
                          <p className="text-sm text-gray-600">
                            Download your receipt from "My Bookings"
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {bookingId && (
                  <div className="mb-8 bg-gray-50 rounded-lg p-6">
                    <p className="text-sm text-gray-600 mb-2">Booking Reference</p>
                    <p className="text-2xl font-bold text-gray-900 font-mono">
                      #{bookingId.substring(0, 8).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Keep this reference number for your records
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/my-bookings')}
                    className="flex-1 flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    <Eye className="h-5 w-5 mr-2" />
                    View Booking
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 flex items-center justify-center px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    <Home className="h-5 w-5 mr-2" />
                    Back to Home
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Need to make changes?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    You can view and manage your booking from the "My Bookings" page.
                    For cancellations or modifications, please contact us at{' '}
                    <a
                      href="mailto:hhnk3693@gmail.com"
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      hhnk3693@gmail.com
                    </a>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Success Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            Thank you for choosing Cape Town Tourism Platform! 🌍
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;
