import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Trash2, Eye, Edit, Plus, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { db } from '../services/firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

const MyItineraries = () => {
  const { user } = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      loadItineraries();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadItineraries = async () => {
    try {
      setLoading(true);
      console.log('Loading itineraries for user:', user.uid);

      // Query itineraries from Firestore
      const itinerariesQuery = query(
        collection(db, 'itineraries'),
        where('userId', '==', user.uid)
      );

      const querySnapshot = await getDocs(itinerariesQuery);
      const firestoreItineraries = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Sort by createdAt manually (newest first)
      firestoreItineraries.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB - dateA;
      });

      setItineraries(firestoreItineraries);
      console.log('✅ Loaded itineraries from Firestore:', firestoreItineraries.length);
    } catch (error) {
      console.error('❌ Error loading itineraries from Firestore:', error);

      // Fallback to localStorage
      const saved = localStorage.getItem(`itineraries_${user.uid}`);
      if (saved) {
        setItineraries(JSON.parse(saved));
        console.log('📦 Loaded itineraries from localStorage');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadItineraries();
    setRefreshing(false);
  };

  const deleteItinerary = async (id) => {
    if (!window.confirm('Are you sure you want to delete this itinerary?')) return;

    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'itineraries', id));
      console.log('✅ Itinerary deleted from Firestore');

      // Update local state
      const updated = itineraries.filter(itinerary => itinerary.id !== id);
      setItineraries(updated);

      // Also remove from localStorage fallback
      if (user) {
        localStorage.setItem(`itineraries_${user.uid}`, JSON.stringify(updated));
      }
    } catch (error) {
      console.error('❌ Error deleting itinerary:', error);
      alert('Failed to delete itinerary. Please try again.');
    }
  };

  const getItineraryStats = (itinerary) => {
    const totalDays = itinerary.days?.length || 0;
    const totalActivities = itinerary.days?.reduce((sum, day) => sum + (day.activities?.length || 0), 0) || 0;
    return { totalDays, totalActivities };
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Not set';

    // Handle Firebase Timestamp
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }

    // Handle regular date string
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Log In</h2>
          <p className="text-gray-600">You need to be logged in to view your itineraries.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">My Itineraries</h1>
              <p className="text-xl text-gray-600">
                Manage and view your saved travel plans
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing || loading}
                className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Refresh itineraries"
              >
                <RefreshCw className={`h-5 w-5 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline text-sm font-medium text-gray-700">Refresh</span>
              </button>
              <Link
                to="/planner"
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Itinerary
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="h-12 w-12 mx-auto text-gray-400 animate-spin mb-4" />
              <p className="text-gray-600">Loading your itineraries...</p>
            </div>
          </div>
        ) : itineraries.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12">
            <div className="text-center">
              <Calendar className="h-20 w-20 mx-auto text-gray-300 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No Itineraries Yet</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start planning your Cape Town adventure! Create your first itinerary to organize your trip.
              </p>
              <Link
                to="/planner"
                className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-semibold"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Itinerary
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map((itinerary) => {
              const { totalDays, totalActivities } = getItineraryStats(itinerary);
              const firstDay = itinerary.days?.[0];
              const lastDay = itinerary.days?.[itinerary.days.length - 1];

              return (
                <div
                  key={itinerary.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Itinerary Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {itinerary.name || `Cape Town Trip ${itinerary.id}`}
                        </h3>
                        {firstDay?.date && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(firstDay.date)}
                            {lastDay?.date && lastDay.date !== firstDay.date && (
                              <> - {formatDate(lastDay.date)}</>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{totalDays} {totalDays === 1 ? 'day' : 'days'}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{totalActivities} {totalActivities === 1 ? 'activity' : 'activities'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Preview Activities */}
                  <div className="p-6 bg-gray-50">
                    {totalActivities > 0 ? (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-700 uppercase mb-3">
                          Highlights
                        </p>
                        {itinerary.days?.slice(0, 2).map((day, dayIndex) => (
                          day.activities?.slice(0, 2).map((activity, actIndex) => (
                            <div
                              key={`${dayIndex}-${actIndex}`}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <Clock className="h-3 w-3 mr-2 text-gray-400" />
                              <span className="truncate">{activity.name}</span>
                            </div>
                          ))
                        ))}
                        {totalActivities > 4 && (
                          <p className="text-xs text-gray-500 italic">
                            +{totalActivities - 4} more activities
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No activities planned yet</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-white border-t border-gray-200 flex gap-2">
                    <Link
                      to={`/planner?id=${itinerary.id}`}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                    <Link
                      to={`/planner?id=${itinerary.id}&edit=true`}
                      className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteItinerary(itinerary.id)}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete itinerary"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Last Modified */}
                  {itinerary.lastModified && (
                    <div className="px-4 pb-4 text-xs text-gray-500">
                      Last modified: {formatDate(itinerary.lastModified)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tips Section */}
        {itineraries.length > 0 && (
          <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Travel Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-semibold text-gray-900 mb-1">Download Offline</h4>
                <p className="text-sm text-gray-600">
                  Save your itineraries to access them without internet connection
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🗺️</div>
                <h4 className="font-semibold text-gray-900 mb-1">Plan Ahead</h4>
                <p className="text-sm text-gray-600">
                  Book popular attractions in advance to avoid disappointment
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-900 mb-1">Budget Wisely</h4>
                <p className="text-sm text-gray-600">
                  Use the budget calculator to track your travel expenses
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyItineraries;
