import { useState, useEffect } from 'react';
import { Calendar, MapPin, DollarSign, Clock, Hotel, UtensilsCrossed, Trash2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, query, where, getDocs, deleteDoc, doc, orderBy } from 'firebase/firestore';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all'); // all, hotels, restaurants
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadBookings();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadBookings();
    setRefreshing(false);
  };

  const loadBookings = async () => {
    try {
      setLoading(true);
      console.log('Loading bookings for user:', user.uid);

      // Try with orderBy first (requires composite index)
      try {
        const bookingsQuery = query(
          collection(db, 'bookings'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(bookingsQuery);
        const firestoreBookings = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setBookings(firestoreBookings);
        console.log('✅ Loaded bookings from Firestore (with orderBy):', firestoreBookings.length);
        return;
      } catch (indexError) {
        console.warn('⚠️ Composite index not available, trying without orderBy:', indexError.message);

        // Fallback: Query without orderBy (doesn't require index)
        const simpleQuery = query(
          collection(db, 'bookings'),
          where('userId', '==', user.uid)
        );

        const querySnapshot = await getDocs(simpleQuery);
        const firestoreBookings = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Sort manually on client side
        firestoreBookings.sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(a.bookedAt);
          const dateB = b.createdAt?.toDate?.() || new Date(b.bookedAt);
          return dateB - dateA;
        });

        setBookings(firestoreBookings);
        console.log('✅ Loaded bookings from Firestore (without orderBy):', firestoreBookings.length);
      }
    } catch (error) {
      console.error('❌ Error loading bookings from Firestore:', error);
      console.error('Error details:', error.code, error.message);

      // Fallback to localStorage
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      savedBookings.sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));
      setBookings(savedBookings);
      console.log('📦 Loaded bookings from localStorage:', savedBookings.length);
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (bookingId, bookingNumber) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        // Delete from Firestore if we have an ID
        if (bookingId) {
          await deleteDoc(doc(db, 'bookings', bookingId));
          console.log('Booking deleted from Firestore');
        }

        // Update local state
        const updatedBookings = bookings.filter(b => b.bookingNumber !== bookingNumber);
        setBookings(updatedBookings);

        // Also remove from localStorage fallback
        const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const updatedLocalBookings = savedBookings.filter(b => b.bookingNumber !== bookingNumber);
        localStorage.setItem('bookings', JSON.stringify(updatedLocalBookings));
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('Failed to delete booking. Please try again.');
      }
    }
  };

  const clearAllBookings = async () => {
    if (window.confirm('Are you sure you want to clear all bookings? This cannot be undone.')) {
      try {
        // Delete all bookings from Firestore
        const deletePromises = bookings.map(booking => {
          if (booking.id) {
            return deleteDoc(doc(db, 'bookings', booking.id));
          }
          return Promise.resolve();
        });

        await Promise.all(deletePromises);
        console.log('All bookings deleted from Firestore');

        // Clear local state
        setBookings([]);

        // Clear localStorage fallback
        localStorage.removeItem('bookings');
      } catch (error) {
        console.error('Error clearing bookings:', error);
        alert('Failed to clear all bookings. Please try again.');
      }
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    if (filter === 'hotels') return booking.item.pricePerNight !== undefined;
    if (filter === 'restaurants') return booking.item.avgPrice !== undefined;
    return true;
  });

  const isHotel = (booking) => booking.item.pricePerNight !== undefined;

  const getBookingStatus = (booking) => {
    if (isHotel(booking)) {
      const checkInDate = new Date(booking.details.checkIn);
      const today = new Date();
      if (checkInDate > today) return 'upcoming';
      if (checkInDate.toDateString() === today.toDateString()) return 'today';
      return 'past';
    } else {
      const reservationDate = new Date(booking.details.date);
      const today = new Date();
      if (reservationDate > today) return 'upcoming';
      if (reservationDate.toDateString() === today.toDateString()) return 'today';
      return 'past';
    }
  };

  const totalSpent = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const upcomingCount = bookings.filter(b => getBookingStatus(b) === 'upcoming').length;

  // Show login prompt if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h3>
            <p className="text-gray-600 mb-6">
              You need to be logged in to view your bookings.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/login"
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
            <p className="text-gray-600">View and manage all your bookings</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh bookings"
          >
            <RefreshCw className={`h-5 w-5 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline text-sm font-medium text-gray-700">Refresh</span>
          </button>
        </div>

        {/* Stats Cards */}
        {bookings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingCount}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">R{totalSpent.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        {bookings.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All ({bookings.length})
              </button>
              <button
                onClick={() => setFilter('hotels')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'hotels'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Hotels ({bookings.filter(b => isHotel(b)).length})
              </button>
              <button
                onClick={() => setFilter('restaurants')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'restaurants'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Restaurants ({bookings.filter(b => !isHotel(b)).length})
              </button>
            </div>

            <button
              onClick={clearAllBookings}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
              <p className="text-gray-600">Loading your bookings...</p>
            </div>
          </div>
        ) : /* Bookings List */
        filteredBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all'
                ? "You haven't made any bookings yet. Start exploring and book your perfect stay!"
                : `No ${filter} bookings found. Try changing the filter.`
              }
            </p>
            {filter === 'all' && (
              <a
                href="/accommodation"
                className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Browse Accommodation
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredBookings.map((booking, index) => {
                const status = getBookingStatus(booking);
                const hotel = isHotel(booking);

                return (
                  <motion.div
                    key={booking.bookingNumber}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Image */}
                        <img
                          src={booking.item.image}
                          alt={booking.item.name}
                          className="w-full sm:w-48 h-48 object-cover rounded-lg"
                        />

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                {hotel ? (
                                  <Hotel className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                ) : (
                                  <UtensilsCrossed className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                )}
                                <h3 className="text-lg font-bold text-gray-900 truncate">
                                  {booking.item.name}
                                </h3>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                                <MapPin className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">{booking.item.area}</span>
                              </div>
                            </div>

                            {/* Status Badge */}
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                                status === 'upcoming'
                                  ? 'bg-green-100 text-green-700'
                                  : status === 'today'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {status === 'upcoming' ? 'Upcoming' : status === 'today' ? 'Today' : 'Past'}
                            </span>
                          </div>

                          {/* Booking Details */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            <div className="space-y-2">
                              {hotel ? (
                                <>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-700">
                                      {new Date(booking.details.checkIn).toLocaleDateString()} - {new Date(booking.details.checkOut).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Hotel className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-700">
                                      {booking.details.rooms} room(s), {booking.details.guests} guest(s)
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-700">
                                      {new Date(booking.details.date).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-700">
                                      {booking.details.time}, {booking.details.partySize} person(s)
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-600">Booking #:</span>
                                <span className="font-mono font-semibold text-gray-900">
                                  {booking.bookingNumber}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <DollarSign className="h-4 w-4 text-gray-500" />
                                <span className="font-bold text-green-600">
                                  R{booking.totalPrice.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Special Requests */}
                          {booking.details.specialRequests && (
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-600 mb-1">Special Requests:</p>
                              <p className="text-sm text-gray-700">{booking.details.specialRequests}</p>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <p className="text-xs text-gray-500">
                              Booked on {new Date(booking.bookedAt).toLocaleString()}
                            </p>
                            <button
                              onClick={() => deleteBooking(booking.id, booking.bookingNumber)}
                              className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">About Your Bookings</h4>
              <p className="text-sm text-blue-800">
                Your bookings are stored locally in your browser. They will remain here even after closing the browser.
                However, clearing your browser data will remove all bookings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
