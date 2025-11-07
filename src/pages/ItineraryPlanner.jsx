import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, Trash2, Clock, DollarSign, Download, Save, Calculator, PieChart, Check } from 'lucide-react';
import { FEATURED_ATTRACTIONS } from '../utils/constants';
import { exportItineraryToPDF } from '../services/pdfExport';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ItineraryPlanner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [days, setDays] = useState([
    { id: 1, date: '', activities: [] }
  ]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [showAttractionSelector, setShowAttractionSelector] = useState(false);
  const [showBudgetCalculator, setShowBudgetCalculator] = useState(false);
  const [budget, setBudget] = useState({
    accommodation: 0,
    food: 0,
    transportation: 0,
    activities: 0,
    shopping: 0,
    other: 0,
    totalBudget: 0
  });
  const [currency, setCurrency] = useState('ZAR');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [itineraryName, setItineraryName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  const addDay = () => {
    const newDay = {
      id: days.length + 1,
      date: '',
      activities: []
    };
    setDays([...days, newDay]);
  };

  const removeDay = (dayIndex) => {
    if (days.length > 1) {
      setDays(days.filter((_, index) => index !== dayIndex));
      if (selectedDay >= days.length - 1) {
        setSelectedDay(Math.max(0, selectedDay - 1));
      }
    }
  };

  const addActivity = (attraction) => {
    const updatedDays = [...days];
    const priceMap = { free: 0, budget: 150, midrange: 350, luxury: 1000 };
    updatedDays[selectedDay].activities.push({
      ...attraction,
      time: '09:00',
      notes: '',
      customCost: priceMap[attraction.priceRange] || 0
    });
    setDays(updatedDays);
    setShowAttractionSelector(false);
  };

  const updateActivityCost = (dayIndex, activityIndex, cost) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].activities[activityIndex].customCost = parseFloat(cost) || 0;
    setDays(updatedDays);
  };

  const removeActivity = (dayIndex, activityIndex) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].activities = updatedDays[dayIndex].activities.filter(
      (_, index) => index !== activityIndex
    );
    setDays(updatedDays);
  };

  const updateActivityTime = (dayIndex, activityIndex, time) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].activities[activityIndex].time = time;
    setDays(updatedDays);
  };

  const updateActivityNotes = (dayIndex, activityIndex, notes) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].activities[activityIndex].notes = notes;
    setDays(updatedDays);
  };

  const updateDayDate = (dayIndex, date) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].date = date;
    setDays(updatedDays);
  };

  const getTotalCost = () => {
    return days.reduce((total, day) => {
      return total + day.activities.reduce((dayTotal, activity) => {
        return dayTotal + (activity.customCost || 0);
      }, 0);
    }, 0);
  };

  const getTotalBudget = () => {
    return budget.accommodation + budget.food + budget.transportation +
           budget.activities + budget.shopping + budget.other;
  };

  const getRemainingBudget = () => {
    return getTotalBudget() - getTotalCost();
  };

  const convertCurrency = (amount) => {
    const rates = {
      ZAR: 1,
      USD: 0.054,
      EUR: 0.050,
      GBP: 0.043
    };
    return (amount * rates[currency]).toFixed(2);
  };

  const getCurrencySymbol = () => {
    const symbols = { ZAR: 'R', USD: '$', EUR: '€', GBP: '£' };
    return symbols[currency] || 'R';
  };

  const updateBudgetCategory = (category, value) => {
    setBudget(prev => ({
      ...prev,
      [category]: parseFloat(value) || 0
    }));
  };

  const downloadItinerary = () => {
    exportItineraryToPDF(days, budget);
  };

  const handleSave = () => {
    // Check if user is logged in
    if (!user) {
      navigate('/login', { state: { from: '/planner' } });
      return;
    }

    // Check if there are activities to save
    const totalActivities = days.reduce((sum, day) => sum + day.activities.length, 0);
    if (totalActivities === 0) {
      alert('Please add at least one activity to your itinerary before saving.');
      return;
    }

    setShowSaveModal(true);
  };

  const saveItinerary = async () => {
    if (!itineraryName.trim()) {
      alert('Please enter a name for your itinerary');
      return;
    }

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const itineraryData = {
        name: itineraryName.trim(),
        days: days,
        budget: budget,
        currency: currency,
        totalDays: days.length,
        totalActivities: days.reduce((sum, day) => sum + day.activities.length, 0),
        totalCost: getTotalCost(),
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'itineraries'), itineraryData);

      setSaveSuccess(true);
      console.log('✅ Itinerary saved successfully!');

      // Show success message for 2 seconds then close modal
      setTimeout(() => {
        setShowSaveModal(false);
        setSaveSuccess(false);
        setItineraryName('');
      }, 2000);

    } catch (error) {
      console.error('❌ Error saving itinerary:', error);
      alert('Failed to save itinerary. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Itinerary Planner</h1>
          <p className="text-xl text-gray-600">
            Plan your perfect Cape Town trip day by day
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Days List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Days</h3>
                <button
                  onClick={addDay}
                  className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2">
                {days.map((day, index) => (
                  <div
                    key={day.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                      selectedDay === index
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedDay(index)}
                  >
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-medium">Day {index + 1}</span>
                    </div>
                    {days.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeDay(index);
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Total Days:</span>
                    <span className="font-semibold">{days.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Activities:</span>
                    <span className="font-semibold">
                      {days.reduce((total, day) => total + day.activities.length, 0)}
                    </span>
                  </div>
                </div>

                {/* Budget Summary */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900">Budget Summary</span>
                    <button
                      onClick={() => setShowBudgetCalculator(true)}
                      className="p-1 hover:bg-gray-200 rounded"
                      title="Budget Calculator"
                    >
                      <Calculator className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Budget:</span>
                      <span className="font-semibold text-gray-900">
                        {getCurrencySymbol()}{convertCurrency(getTotalBudget())}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Activities Cost:</span>
                      <span className="font-semibold text-gray-900">
                        {getCurrencySymbol()}{convertCurrency(getTotalCost())}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-gray-200">
                      <span className="text-gray-600">Remaining:</span>
                      <span className={`font-semibold ${getRemainingBudget() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {getCurrencySymbol()}{convertCurrency(getRemainingBudget())}
                      </span>
                    </div>
                  </div>
                  {getTotalBudget() > 0 && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            (getTotalCost() / getTotalBudget()) > 1 ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min((getTotalCost() / getTotalBudget()) * 100, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-center">
                        {((getTotalCost() / getTotalBudget()) * 100).toFixed(0)}% of budget used
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <button
                    onClick={downloadItinerary}
                    className="w-full flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                    title="Export as PDF"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </button>
                  <button
                    onClick={handleSave}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Save itinerary"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Selected Day */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Day {selectedDay + 1}
                  </h2>
                  <input
                    type="date"
                    value={days[selectedDay]?.date || ''}
                    onChange={(e) => updateDayDate(selectedDay, e.target.value)}
                    className="mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <button
                  onClick={() => setShowAttractionSelector(true)}
                  className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Activity
                </button>
              </div>

              {days[selectedDay]?.activities.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-600 mb-4">No activities planned for this day</p>
                  <button
                    onClick={() => setShowAttractionSelector(true)}
                    className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add First Activity
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {days[selectedDay]?.activities.map((activity, activityIndex) => (
                    <div
                      key={activityIndex}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <input
                              type="time"
                              value={activity.time}
                              onChange={(e) =>
                                updateActivityTime(selectedDay, activityIndex, e.target.value)
                              }
                              className="px-3 py-1 border border-gray-300 rounded text-sm"
                            />
                            <h3 className="font-semibold text-gray-900">{activity.name}</h3>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {activity.duration}
                            </span>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4" />
                              <input
                                type="number"
                                value={activity.customCost || 0}
                                onChange={(e) =>
                                  updateActivityCost(selectedDay, activityIndex, e.target.value)
                                }
                                className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                                placeholder="Cost"
                                min="0"
                              />
                              <span className="text-xs text-gray-500">{currency}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeActivity(selectedDay, activityIndex)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                      <textarea
                        placeholder="Add notes..."
                        value={activity.notes}
                        onChange={(e) =>
                          updateActivityNotes(selectedDay, activityIndex, e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900"
                        rows="2"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Attraction Selector Modal */}
      {showAttractionSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Add Activity</h3>
                <button
                  onClick={() => setShowAttractionSelector(false)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FEATURED_ATTRACTIONS.map((attraction) => (
                  <div
                    key={attraction.id}
                    onClick={() => addActivity(attraction)}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-lg cursor-pointer transition-shadow"
                  >
                    <div className="flex gap-4">
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {attraction.name}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {attraction.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{attraction.duration}</span>
                          <span>•</span>
                          <span>{attraction.priceRange}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Itinerary Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Save Your Itinerary</h3>

            {!saveSuccess ? (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Itinerary Name
                  </label>
                  <input
                    type="text"
                    value={itineraryName}
                    onChange={(e) => setItineraryName(e.target.value)}
                    placeholder="e.g., Cape Town Adventure 2025"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    autoFocus
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && itineraryName.trim()) {
                        saveItinerary();
                      }
                    }}
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Summary</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Days:</span>
                      <span className="font-medium text-gray-900">{days.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Activities:</span>
                      <span className="font-medium text-gray-900">
                        {days.reduce((sum, day) => sum + day.activities.length, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Cost:</span>
                      <span className="font-medium text-gray-900">
                        {getCurrencySymbol()}{convertCurrency(getTotalCost())}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowSaveModal(false);
                      setItineraryName('');
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveItinerary}
                    disabled={isSaving || !itineraryName.trim()}
                    className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Itinerary
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Saved Successfully!</h4>
                <p className="text-gray-600">Your itinerary has been saved.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Budget Calculator Modal */}
      {showBudgetCalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calculator className="h-6 w-6 text-gray-900" />
                  <h3 className="text-2xl font-bold text-gray-900">Budget Calculator</h3>
                </div>
                <button
                  onClick={() => setShowBudgetCalculator(false)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
              {/* Currency Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
                >
                  <option value="ZAR">ZAR (South African Rand)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                  <option value="GBP">GBP (British Pound)</option>
                </select>
              </div>

              {/* Budget Categories */}
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Budget Breakdown
                </h4>

                {[
                  { key: 'accommodation', label: 'Accommodation', icon: '🏨' },
                  { key: 'food', label: 'Food & Dining', icon: '🍽️' },
                  { key: 'transportation', label: 'Transportation', icon: '🚗' },
                  { key: 'activities', label: 'Activities & Tours', icon: '🎭' },
                  { key: 'shopping', label: 'Shopping & Souvenirs', icon: '🛍️' },
                  { key: 'other', label: 'Other Expenses', icon: '💰' }
                ].map(({ key, label, icon }) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-2xl">{icon}</span>
                    <label className="flex-1 text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{getCurrencySymbol()}</span>
                      <input
                        type="number"
                        value={budget[key]}
                        onChange={(e) => updateBudgetCategory(key, e.target.value)}
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Budget Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Budget:</span>
                    <span className="font-semibold text-gray-900">
                      {getCurrencySymbol()}{convertCurrency(getTotalBudget())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Activities Cost:</span>
                    <span className="font-semibold text-gray-900">
                      {getCurrencySymbol()}{convertCurrency(getTotalCost())}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="font-semibold text-gray-900">Remaining:</span>
                    <span className={`font-bold ${getRemainingBudget() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {getCurrencySymbol()}{convertCurrency(getRemainingBudget())}
                    </span>
                  </div>
                </div>

                {/* Budget Progress Bar */}
                {getTotalBudget() > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Budget Usage</span>
                      <span>{((getTotalCost() / getTotalBudget()) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          (getTotalCost() / getTotalBudget()) > 1
                            ? 'bg-red-500'
                            : (getTotalCost() / getTotalBudget()) > 0.8
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((getTotalCost() / getTotalBudget()) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Budget Status Messages */}
                {getTotalBudget() > 0 && (
                  <div className="mt-3">
                    {getRemainingBudget() < 0 && (
                      <p className="text-xs text-red-600 bg-red-50 p-2 rounded">
                        ⚠️ Warning: You are over budget by {getCurrencySymbol()}{Math.abs(convertCurrency(getRemainingBudget()))}
                      </p>
                    )}
                    {getRemainingBudget() >= 0 && (getTotalCost() / getTotalBudget()) > 0.8 && (
                      <p className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded">
                        ⚡ You're using {((getTotalCost() / getTotalBudget()) * 100).toFixed(0)}% of your budget
                      </p>
                    )}
                    {getRemainingBudget() >= 0 && (getTotalCost() / getTotalBudget()) <= 0.8 && (
                      <p className="text-xs text-green-600 bg-green-50 p-2 rounded">
                        ✓ Your spending is within budget
                      </p>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowBudgetCalculator(false)}
                className="w-full mt-6 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryPlanner;
