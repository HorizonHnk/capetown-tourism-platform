import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hotel, UtensilsCrossed, MapPin, Star, DollarSign, Search, Filter, Calendar, Users, Sparkles, Heart, X, Grid, List, ChevronDown, Phone, Mail, Clock, Check, Share2, Eye, ChevronLeft, ChevronRight, Copy, CheckCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateChatResponse } from '../services/geminiAI';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { processPayment } from '../services/stripePayment';

// Sample data for hotels
const HOTELS = [
  {
    id: 'h1',
    name: 'The Table Bay Hotel',
    type: 'hotel',
    category: 'luxury',
    area: 'V&A Waterfront',
    rating: 4.8,
    reviews: 2340,
    pricePerNight: 4500,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Parking', 'Restaurant'],
    description: 'Iconic 5-star hotel with waterfront views and world-class amenities',
    features: ['Beachfront', 'City View', 'Pet Friendly'],
    phone: '+27 21 406 5000',
    email: 'info@tablebay.co.za',
    checkIn: '3:00 PM',
    checkOut: '11:00 AM'
  },
  {
    id: 'h2',
    name: 'Cape Grace Hotel',
    type: 'hotel',
    category: 'luxury',
    area: 'V&A Waterfront',
    rating: 4.9,
    reviews: 1876,
    pricePerNight: 5200,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    amenities: ['WiFi', 'Pool', 'Spa', 'Concierge', 'Room Service'],
    description: 'Elegant boutique hotel with personalized service and stunning views',
    features: ['Waterfront Views', 'Luxury', 'Mountain View'],
    phone: '+27 21 410 7100',
    email: 'info@capegrace.com',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: 'h3',
    name: 'POD Camps Bay',
    type: 'hotel',
    category: 'midrange',
    area: 'Camps Bay',
    rating: 4.6,
    reviews: 987,
    pricePerNight: 2200,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    amenities: ['WiFi', 'Pool', 'Beach Access', 'Breakfast'],
    description: 'Trendy boutique hotel steps from the beach with mountain backdrop',
    features: ['Beach Access', 'Mountain View', 'Modern'],
    phone: '+27 21 437 9000',
    email: 'stay@podhotels.com',
    checkIn: '3:00 PM',
    checkOut: '11:00 AM'
  },
  {
    id: 'h4',
    name: 'Dock House Boutique Hotel',
    type: 'guesthouse',
    category: 'midrange',
    area: 'V&A Waterfront',
    rating: 4.7,
    reviews: 654,
    pricePerNight: 1800,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    amenities: ['WiFi', 'Breakfast', 'Concierge', 'Parking'],
    description: 'Charming boutique hotel with personalized service',
    features: ['Boutique', 'Central Location'],
    phone: '+27 21 421 1234',
    email: 'info@dockhouse.co.za',
    checkIn: '2:00 PM',
    checkOut: '10:00 AM'
  },
  {
    id: 'h5',
    name: 'Cape Town Backpackers',
    type: 'hostel',
    category: 'budget',
    area: 'City Bowl',
    rating: 4.3,
    reviews: 1234,
    pricePerNight: 450,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
    amenities: ['WiFi', 'Kitchen', 'Social Areas', 'Tours'],
    description: 'Budget-friendly hostel with vibrant social atmosphere',
    features: ['Budget', 'Social', 'Central'],
    phone: '+27 21 423 4530',
    email: 'info@ctbackpackers.com',
    checkIn: '2:00 PM',
    checkOut: '10:00 AM'
  },
  {
    id: 'h6',
    name: 'Airbnb - Sea Point Studio',
    type: 'vacation rental',
    category: 'budget',
    area: 'Sea Point',
    rating: 4.5,
    reviews: 432,
    pricePerNight: 850,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    amenities: ['WiFi', 'Kitchen', 'Washing Machine', 'Self Check-in'],
    description: 'Cozy studio apartment with ocean views and self-catering facilities',
    features: ['Self-Catering', 'Ocean View', 'Affordable'],
    phone: 'Contact via Airbnb',
    email: 'airbnb.com',
    checkIn: 'Flexible',
    checkOut: 'Flexible'
  }
];

// Sample data for restaurants
const RESTAURANTS = [
  {
    id: 'r1',
    name: 'The Test Kitchen',
    type: 'restaurant',
    cuisine: 'Fine Dining',
    area: 'Woodstock',
    rating: 4.9,
    reviews: 2876,
    priceRange: 'expensive',
    avgPrice: 950,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    features: ['Fine Dining', 'Chef\'s Table', 'Wine Pairing'],
    description: 'Award-winning restaurant with innovative tasting menus',
    dietary: ['Vegetarian Options', 'Gluten-Free'],
    phone: '+27 21 447 2337',
    email: 'info@thetestkitchen.co.za',
    hours: 'Tue-Sat: 6:00 PM - 10:00 PM'
  },
  {
    id: 'r2',
    name: 'La Colombe',
    type: 'restaurant',
    cuisine: 'French',
    area: 'Constantia',
    rating: 4.8,
    reviews: 1987,
    priceRange: 'expensive',
    avgPrice: 850,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    features: ['Mountain Views', 'Wine Estate', 'Romantic'],
    description: 'French-Asian fusion in a stunning vineyard setting',
    dietary: ['Vegetarian', 'Vegan Options'],
    phone: '+27 21 794 2390',
    email: 'info@lacolombe.co.za',
    hours: 'Daily: 12:00 PM - 9:00 PM'
  },
  {
    id: 'r3',
    name: 'Gold Restaurant',
    type: 'restaurant',
    cuisine: 'South African',
    area: 'Green Point',
    rating: 4.7,
    reviews: 3421,
    priceRange: 'moderate',
    avgPrice: 550,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    features: ['Live Music', 'Cultural Experience', 'Traditional'],
    description: 'Authentic African cuisine with live entertainment',
    dietary: ['Halal', 'Vegetarian'],
    phone: '+27 21 421 4653',
    email: 'info@goldrestaurant.co.za',
    hours: 'Daily: 6:30 PM - 10:30 PM'
  },
  {
    id: 'r4',
    name: 'Harbour House',
    type: 'restaurant',
    cuisine: 'Seafood',
    area: 'V&A Waterfront',
    rating: 4.6,
    reviews: 2145,
    priceRange: 'moderate',
    avgPrice: 420,
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
    features: ['Waterfront Views', 'Fresh Seafood', 'Outdoor Seating'],
    description: 'Fresh seafood with spectacular harbor views',
    dietary: ['Gluten-Free Options'],
    phone: '+27 21 418 4744',
    email: 'info@harbourhouse.co.za',
    hours: 'Daily: 12:00 PM - 10:00 PM'
  },
  {
    id: 'r5',
    name: 'Mzansi Restaurant',
    type: 'restaurant',
    cuisine: 'Cape Malay',
    area: 'Bo-Kaap',
    rating: 4.5,
    reviews: 876,
    priceRange: 'budget',
    avgPrice: 220,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    features: ['Local Cuisine', 'Family-Friendly', 'Traditional'],
    description: 'Traditional Cape Malay dishes in the heart of Bo-Kaap',
    dietary: ['Halal', 'Vegetarian'],
    phone: '+27 21 422 0221',
    email: 'info@mzansi.co.za',
    hours: 'Mon-Sat: 11:00 AM - 9:00 PM'
  },
  {
    id: 'r6',
    name: 'Shortmarket Club',
    type: 'restaurant',
    cuisine: 'International',
    area: 'City Center',
    rating: 4.7,
    reviews: 1654,
    priceRange: 'moderate',
    avgPrice: 480,
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800',
    features: ['Trendy', 'Creative Menu', 'Cocktails'],
    description: 'Contemporary dining with creative seasonal menus',
    dietary: ['Vegetarian', 'Vegan', 'Gluten-Free'],
    phone: '+27 21 447 1836',
    email: 'info@shortmarket.co.za',
    hours: 'Daily: 6:00 PM - 11:00 PM'
  }
];

const AREAS = ['All Areas', 'V&A Waterfront', 'Camps Bay', 'City Bowl', 'Sea Point', 'Constantia', 'Green Point', 'Woodstock', 'Bo-Kaap', 'City Center'];
const ACCOMMODATION_TYPES = ['All Types', 'hotel', 'guesthouse', 'hostel', 'vacation rental'];
const PRICE_CATEGORIES = ['All Prices', 'budget', 'midrange', 'luxury'];
const CUISINES = ['All Cuisines', 'Fine Dining', 'French', 'South African', 'Seafood', 'Cape Malay', 'International'];
const RESTAURANT_PRICE_RANGES = ['All Prices', 'budget', 'moderate', 'expensive'];

const Accommodation = () => {
  const [activeTab, setActiveTab] = useState('hotels');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');
  const [selectedCuisine, setSelectedCuisine] = useState('All Cuisines');
  const [showFilters, setShowFilters] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('rating'); // rating, price, reviews
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Booking modal state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
    partySize: 1,
    date: '',
    time: '',
    specialRequests: ''
  });

  // Additional modal states
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [detailedItem, setDetailedItem] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationDetails, setConfirmationDetails] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareItem, setShareItem] = useState(null);
  const [copied, setCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter hotels
  const filteredHotels = HOTELS.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea = selectedArea === 'All Areas' || hotel.area === selectedArea;
    const matchesType = selectedType === 'All Types' || hotel.type === selectedType;
    const matchesPrice = selectedPrice === 'All Prices' || hotel.category === selectedPrice;

    return matchesSearch && matchesArea && matchesType && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price') return a.pricePerNight - b.pricePerNight;
    if (sortBy === 'reviews') return b.reviews - a.reviews;
    return 0;
  });

  // Filter restaurants
  const filteredRestaurants = RESTAURANTS.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea = selectedArea === 'All Areas' || restaurant.area === selectedArea;
    const matchesCuisine = selectedCuisine === 'All Cuisines' || restaurant.cuisine === selectedCuisine;
    const matchesPrice = selectedPrice === 'All Prices' || restaurant.priceRange === selectedPrice;

    return matchesSearch && matchesArea && matchesCuisine && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price') return a.avgPrice - b.avgPrice;
    if (sortBy === 'reviews') return b.reviews - a.reviews;
    return 0;
  });

  // Get AI recommendations
  const getAIRecommendations = async () => {
    setIsLoadingAI(true);
    try {
      const prompt = activeTab === 'hotels'
        ? `Recommend 3 best hotels in Cape Town for different budgets (luxury, mid-range, budget). Include one sentence about each.`
        : `Recommend 3 must-try restaurants in Cape Town with different cuisines. Include one sentence about each.`;

      const response = await generateChatResponse(prompt);
      setAiSuggestion(response);
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      setAiSuggestion('Unable to get AI recommendations at the moment. Please try again.');
    }
    setIsLoadingAI(false);
  };

  const toggleFavorite = (item) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite({
        id: item.id,
        name: item.name,
        category: activeTab === 'hotels' ? 'accommodation' : 'dining',
        image: item.image,
        rating: item.rating,
        location: item.area
      });
    }
  };

  const openBookingModal = (item) => {
    // Check if user is logged in before allowing booking
    if (!user) {
      navigate('/login', { state: { from: '/accommodation' } });
      return;
    }

    setSelectedItem(item);
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedItem(null);
    setBookingDetails({
      checkIn: '',
      checkOut: '',
      guests: 1,
      rooms: 1,
      partySize: 1,
      date: '',
      time: '',
      specialRequests: ''
    });
  };

  const handleBooking = async () => {
    // Ensure user is logged in
    if (!user) {
      navigate('/login', { state: { from: '/accommodation' } });
      return;
    }

    // Calculate total price
    const totalPrice = calculateTotalPrice();
    const bookingNumber = 'BK' + Date.now().toString().slice(-8);

    const confirmation = {
      bookingNumber,
      item: selectedItem,
      details: bookingDetails,
      totalPrice,
      bookedAt: new Date().toISOString(),
      userId: user.uid,
      userEmail: user.email,
      status: 'pending_payment' // New status field
    };

    try {
      // First, save booking to Firestore with "pending_payment" status
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...confirmation,
        createdAt: serverTimestamp()
      });

      console.log('✅ Booking created with ID:', docRef.id);

      // Prepare payment details
      const paymentDetails = {
        bookingId: docRef.id,
        accommodationName: selectedItem.name,
        checkIn: bookingDetails.checkIn || bookingDetails.date || 'N/A',
        checkOut: bookingDetails.checkOut || 'N/A',
        userId: user.uid,
        userEmail: user.email,
        accommodationId: selectedItem.id,
      };

      // Process payment through Stripe
      console.log('💳 Initiating payment...');
      await processPayment(paymentDetails, totalPrice);

      // Show confirmation (payment will be completed via Stripe)
      setConfirmationDetails({
        ...confirmation,
        bookingId: docRef.id
      });
      setShowBookingModal(false);
      setShowConfirmation(true);

      console.log('✅ Booking process initiated successfully');
    } catch (error) {
      console.error('❌ Error during booking/payment:', error);
      alert('Failed to process booking. Please try again.');

      // Fall back to localStorage if Firestore fails
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      savedBookings.push(confirmation);
      localStorage.setItem('bookings', JSON.stringify(savedBookings));
    }
  };

  // Calculate total price based on booking details
  const calculateTotalPrice = () => {
    if (!selectedItem) return 0;

    if (activeTab === 'hotels') {
      const checkIn = new Date(bookingDetails.checkIn);
      const checkOut = new Date(bookingDetails.checkOut);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

      if (nights > 0) {
        return selectedItem.pricePerNight * nights * bookingDetails.rooms;
      }
    } else {
      return selectedItem.avgPrice * bookingDetails.partySize;
    }

    return 0;
  };

  // Detailed view handlers
  const openDetailedView = (item) => {
    setDetailedItem(item);
    setShowDetailedView(true);
    setCurrentImageIndex(0);
  };

  const closeDetailedView = () => {
    setShowDetailedView(false);
    setDetailedItem(null);
  };

  // Share handlers
  const openShareModal = (item) => {
    setShareItem(item);
    setShowShareModal(true);
    setCopied(false);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setShareItem(null);
    setCopied(false);
  };

  const copyToClipboard = () => {
    const url = `${window.location.origin}/accommodation?item=${shareItem.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Compare handlers
  const toggleCompare = (item) => {
    if (compareList.find(i => i.id === item.id)) {
      setCompareList(compareList.filter(i => i.id !== item.id));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, item]);
      } else {
        alert('You can only compare up to 3 items at a time');
      }
    }
  };

  const isInCompare = (itemId) => {
    return compareList.some(i => i.id === itemId);
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  // Format AI suggestion text with proper markdown rendering
  const formatAISuggestion = (text) => {
    if (!text) return null;

    // Split by lines
    const lines = text.split('\n');

    return lines.map((line, index) => {
      // Skip empty lines
      if (!line.trim()) return <br key={index} />;

      // Check if line starts with bullet point and remove it for processing
      const isBulletPoint = line.trim().startsWith('•');
      const cleanLine = isBulletPoint ? line.trim().substring(1).trim() : line;

      // Process bold markdown **text** -> <strong>text</strong>
      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={partIndex} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
        }
        return <span key={partIndex}>{part}</span>;
      });

      // Render bullet point line
      if (isBulletPoint) {
        return (
          <div key={index} className="flex gap-2 mb-1">
            <span className="text-purple-600 font-bold flex-shrink-0">•</span>
            <span className="flex-1">{formattedLine}</span>
          </div>
        );
      }

      // Regular line
      return (
        <div key={index} className="mb-1">
          {formattedLine}
        </div>
      );
    });
  };

  const renderHotelCard = (hotel) => (
    <motion.div
      key={hotel.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow ${
        viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
      }`}
    >
      <div className={`relative ${viewMode === 'list' ? 'sm:w-1/3' : ''}`}>
        <img
          src={hotel.image}
          alt={hotel.name}
          className={`w-full object-cover ${viewMode === 'list' ? 'h-full min-h-[200px]' : 'h-48'}`}
        />
        <button
          onClick={() => toggleFavorite(hotel)}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
        >
          <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isFavorite(hotel.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gray-900 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
          {hotel.type}
        </div>
      </div>
      <div className={`p-3 sm:p-4 ${viewMode === 'list' ? 'sm:w-2/3 flex flex-col justify-between' : ''}`}>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-1">{hotel.name}</h3>
          <div className="flex items-center mb-1 sm:mb-2">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mr-1 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-600 truncate">{hotel.area}</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-3">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current mr-1 flex-shrink-0" />
            <span className="font-semibold text-sm sm:text-base text-gray-900">{hotel.rating}</span>
            <span className="text-xs sm:text-sm text-gray-600 ml-1">({hotel.reviews} reviews)</span>
          </div>
          <p className="text-gray-700 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{hotel.description}</p>
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
            {hotel.amenities.slice(0, viewMode === 'list' ? 6 : 4).map((amenity, index) => (
              <span key={index} className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-100 text-gray-700 text-[10px] sm:text-xs rounded">
                {amenity}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">R{hotel.pricePerNight}</span>
              <span className="text-xs sm:text-sm text-gray-600">/night</span>
            </div>
            <div className="flex gap-1 sm:gap-2">
              <button
                onClick={() => openDetailedView(hotel)}
                className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                title="View Details"
              >
                <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={() => openShareModal(hotel)}
                className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                title="Share"
              >
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={() => toggleCompare(hotel)}
                className={`p-1.5 sm:p-2 rounded transition-colors ${
                  isInCompare(hotel.id)
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="Compare"
              >
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
          <button
            onClick={() => openBookingModal(hotel)}
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderRestaurantCard = (restaurant) => (
    <motion.div
      key={restaurant.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow ${
        viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
      }`}
    >
      <div className={`relative ${viewMode === 'list' ? 'sm:w-1/3' : ''}`}>
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className={`w-full object-cover ${viewMode === 'list' ? 'h-full min-h-[200px]' : 'h-48'}`}
        />
        <button
          onClick={() => toggleFavorite(restaurant)}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
        >
          <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isFavorite(restaurant.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gray-900 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
          {restaurant.cuisine}
        </div>
      </div>
      <div className={`p-3 sm:p-4 ${viewMode === 'list' ? 'sm:w-2/3 flex flex-col justify-between' : ''}`}>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-1">{restaurant.name}</h3>
          <div className="flex items-center mb-1 sm:mb-2">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mr-1 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-600 truncate">{restaurant.area}</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-3">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current mr-1 flex-shrink-0" />
            <span className="font-semibold text-sm sm:text-base text-gray-900">{restaurant.rating}</span>
            <span className="text-xs sm:text-sm text-gray-600 ml-1">({restaurant.reviews} reviews)</span>
          </div>
          <p className="text-gray-700 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{restaurant.description}</p>
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
            {restaurant.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-100 text-gray-700 text-[10px] sm:text-xs rounded">
                {feature}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <div>
              <span className="text-xs sm:text-sm text-gray-600">Avg. R{restaurant.avgPrice}/person</span>
            </div>
            <div className="flex gap-1 sm:gap-2">
              <button
                onClick={() => openDetailedView(restaurant)}
                className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                title="View Details"
              >
                <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={() => openShareModal(restaurant)}
                className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                title="Share"
              >
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={() => toggleCompare(restaurant)}
                className={`p-1.5 sm:p-2 rounded transition-colors ${
                  isInCompare(restaurant.id)
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="Compare"
              >
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
          <button
            onClick={() => openBookingModal(restaurant)}
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
          >
            Reserve
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Responsive */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
              Find Your Perfect Stay & Dining
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-gray-300 max-w-3xl mx-auto px-2">
              Discover the best hotels, guesthouses, and restaurants in Cape Town
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Tabs - Responsive */}
        <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('hotels');
              setSearchQuery('');
              setSelectedArea('All Areas');
              setSelectedType('All Types');
              setSelectedPrice('All Prices');
            }}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'hotels'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Hotel className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden xs:inline">Accommodation</span>
            <span className="xs:hidden">Hotels</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('restaurants');
              setSearchQuery('');
              setSelectedArea('All Areas');
              setSelectedCuisine('All Cuisines');
              setSelectedPrice('All Prices');
            }}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'restaurants'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <UtensilsCrossed className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden xs:inline">Dining</span>
            <span className="xs:hidden">Food</span>
          </button>
        </div>

        {/* Search and Filters - Responsive */}
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'hotels' ? 'hotels' : 'restaurants'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base whitespace-nowrap flex-1 sm:flex-initial justify-center"
                >
                  <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Filters</span>
                </button>
                <button
                  onClick={getAIRecommendations}
                  disabled={isLoadingAI}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 text-sm sm:text-base whitespace-nowrap flex-1 sm:flex-initial justify-center"
                >
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">AI Suggestions</span>
                  <span className="sm:hidden">AI</span>
                </button>
              </div>
            </div>

            {/* View Mode and Sort */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-1 sm:gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 sm:p-2 rounded ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}`}
                  title="Grid view"
                >
                  <Grid className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 sm:p-2 rounded ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}`}
                  title="List view"
                >
                  <List className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs sm:text-sm text-gray-700 whitespace-nowrap">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 rounded text-xs sm:text-sm focus:ring-2 focus:ring-gray-900"
                >
                  <option value="rating">Rating</option>
                  <option value="price">Price</option>
                  <option value="reviews">Reviews</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Options - Responsive */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-200"
              >
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Area</label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs sm:text-sm"
                  >
                    {AREAS.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>

                {activeTab === 'hotels' ? (
                  <>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Type</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs sm:text-sm"
                      >
                        {ACCOMMODATION_TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Price Range</label>
                      <select
                        value={selectedPrice}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        className="w-full px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs sm:text-sm"
                      >
                        {PRICE_CATEGORIES.map(price => (
                          <option key={price} value={price}>{price}</option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Cuisine</label>
                      <select
                        value={selectedCuisine}
                        onChange={(e) => setSelectedCuisine(e.target.value)}
                        className="w-full px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs sm:text-sm"
                      >
                        {CUISINES.map(cuisine => (
                          <option key={cuisine} value={cuisine}>{cuisine}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Price Range</label>
                      <select
                        value={selectedPrice}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        className="w-full px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs sm:text-sm"
                      >
                        {RESTAURANT_PRICE_RANGES.map(price => (
                          <option key={price} value={price}>{price}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Suggestions - Responsive */}
        <AnimatePresence>
          {aiSuggestion && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-3 sm:p-4 md:p-6 mb-4 sm:mb-6"
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">AI Recommendations</h3>
                  <div className="text-xs sm:text-sm md:text-base text-gray-700 break-words">
                    {formatAISuggestion(aiSuggestion)}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results - Responsive */}
        <div className="mb-3 sm:mb-4 flex flex-col xs:flex-row xs:items-center justify-between gap-2">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            {activeTab === 'hotels'
              ? `${filteredHotels.length} ${filteredHotels.length === 1 ? 'Accommodation' : 'Accommodations'} Found`
              : `${filteredRestaurants.length} ${filteredRestaurants.length === 1 ? 'Restaurant' : 'Restaurants'} Found`
            }
          </h2>
        </div>

        {/* Cards Grid/List - Responsive */}
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6' : 'flex flex-col gap-3 sm:gap-4 md:gap-6'}`}>
          {activeTab === 'hotels'
            ? filteredHotels.map(hotel => renderHotelCard(hotel))
            : filteredRestaurants.map(restaurant => renderRestaurantCard(restaurant))
          }
        </div>

        {/* No Results */}
        {((activeTab === 'hotels' && filteredHotels.length === 0) ||
          (activeTab === 'restaurants' && filteredRestaurants.length === 0)) && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              No results found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>

      {/* Booking Modal - Responsive */}
      <AnimatePresence>
        {showBookingModal && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={closeBookingModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-3 sm:p-4 md:p-6 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  {activeTab === 'hotels' ? 'Book Accommodation' : 'Reserve Table'}
                </h2>
                <button
                  onClick={closeBookingModal}
                  className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              <div className="p-3 sm:p-4 md:p-6">
                {/* Selected Item Info */}
                <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full xs:w-24 sm:w-32 h-32 xs:h-24 sm:h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2 truncate">{selectedItem.name}</h3>
                    <div className="flex items-center mb-1 sm:mb-2">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mr-1 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600 truncate">{selectedItem.area}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-xs sm:text-sm font-semibold">{selectedItem.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-3 sm:space-y-4">
                  {activeTab === 'hotels' ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Check-in
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            <input
                              type="date"
                              value={bookingDetails.checkIn}
                              onChange={(e) => setBookingDetails({...bookingDetails, checkIn: e.target.value})}
                              className="w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Check-out
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            <input
                              type="date"
                              value={bookingDetails.checkOut}
                              onChange={(e) => setBookingDetails({...bookingDetails, checkOut: e.target.value})}
                              className="w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Guests
                          </label>
                          <div className="relative">
                            <Users className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            <input
                              type="number"
                              min="1"
                              value={bookingDetails.guests}
                              onChange={(e) => setBookingDetails({...bookingDetails, guests: parseInt(e.target.value)})}
                              className="w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Rooms
                          </label>
                          <div className="relative">
                            <Hotel className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            <input
                              type="number"
                              min="1"
                              value={bookingDetails.rooms}
                              onChange={(e) => setBookingDetails({...bookingDetails, rooms: parseInt(e.target.value)})}
                              className="w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            <input
                              type="date"
                              value={bookingDetails.date}
                              onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
                              className="w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Time
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            <input
                              type="time"
                              value={bookingDetails.time}
                              onChange={(e) => setBookingDetails({...bookingDetails, time: e.target.value})}
                              className="w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          Party Size
                        </label>
                        <div className="relative">
                          <Users className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          <input
                            type="number"
                            min="1"
                            value={bookingDetails.partySize}
                            onChange={(e) => setBookingDetails({...bookingDetails, partySize: parseInt(e.target.value)})}
                            className="w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs sm:text-sm"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={bookingDetails.specialRequests}
                      onChange={(e) => setBookingDetails({...bookingDetails, specialRequests: e.target.value})}
                      rows="3"
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-xs sm:text-sm resize-none"
                      placeholder="Any special requirements..."
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2">
                    <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">Contact Information</h4>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="break-all">{selectedItem.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="break-all">{selectedItem.email}</span>
                    </div>
                    {activeTab === 'hotels' ? (
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span>Check-in: {selectedItem.checkIn} | Check-out: {selectedItem.checkOut}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span>{selectedItem.hours}</span>
                      </div>
                    )}
                  </div>

                  {/* Price Summary */}
                  {calculateTotalPrice() > 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3 sm:p-4">
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">Price Summary</h4>
                      {activeTab === 'hotels' && bookingDetails.checkIn && bookingDetails.checkOut && (
                        <div className="space-y-1 text-xs sm:text-sm text-gray-700">
                          <div className="flex justify-between">
                            <span>R{selectedItem.pricePerNight} × {Math.ceil((new Date(bookingDetails.checkOut) - new Date(bookingDetails.checkIn)) / (1000 * 60 * 60 * 24))} nights × {bookingDetails.rooms} room(s)</span>
                          </div>
                        </div>
                      )}
                      {activeTab === 'restaurants' && (
                        <div className="space-y-1 text-xs sm:text-sm text-gray-700">
                          <div className="flex justify-between">
                            <span>R{selectedItem.avgPrice} × {bookingDetails.partySize} person(s)</span>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-green-300">
                        <span className="font-bold text-base sm:text-lg">Total:</span>
                        <span className="font-bold text-xl sm:text-2xl text-green-600">R{calculateTotalPrice().toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col-reverse xs:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    onClick={closeBookingModal}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBooking}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                    Confirm {activeTab === 'hotels' ? 'Booking' : 'Reservation'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && confirmationDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Booking Confirmed!
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your booking has been successfully confirmed.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking Number:</span>
                      <span className="font-semibold">{confirmationDetails.bookingNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property:</span>
                      <span className="font-semibold">{confirmationDetails.item.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-bold text-green-600">R{confirmationDetails.totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booked:</span>
                      <span className="text-xs">{confirmationDetails.bookedAt}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && shareItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={closeShareModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Share</h3>
                <button onClick={closeShareModal} className="p-1 hover:bg-gray-100 rounded">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">Share {shareItem.name} with others</p>
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={`${window.location.origin}/accommodation?item=${shareItem.id}`}
                    readOnly
                    className="flex-1 text-sm bg-transparent border-none focus:outline-none"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                  >
                    {copied ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {copied && (
                <p className="text-sm text-green-600 mb-4">Link copied to clipboard!</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed View Modal */}
      <AnimatePresence>
        {showDetailedView && detailedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={closeDetailedView}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-lg">
                <h2 className="text-xl font-bold text-gray-900">{detailedItem.name}</h2>
                <button onClick={closeDetailedView} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-4 sm:p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                <img
                  src={detailedItem.image}
                  alt={detailedItem.name}
                  className="w-full h-64 sm:h-96 object-cover rounded-lg mb-4"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{detailedItem.area}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{detailedItem.rating} ({detailedItem.reviews} reviews)</span>
                      </div>
                      {activeTab === 'hotels' ? (
                        <>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span>R{detailedItem.pricePerNight}/night</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Hotel className="h-4 w-4 text-gray-500" />
                            <span>{detailedItem.type}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span>R{detailedItem.avgPrice}/person</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <UtensilsCrossed className="h-4 w-4 text-gray-500" />
                            <span>{detailedItem.cuisine}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      {activeTab === 'hotels' ? 'Amenities' : 'Features'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(detailedItem.amenities || detailedItem.features)?.map((item, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-gray-700">{detailedItem.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Sample Reviews</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm font-semibold">John D.</span>
                      </div>
                      <p className="text-sm text-gray-700">Amazing experience! Highly recommended.</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm font-semibold">Sarah M.</span>
                      </div>
                      <p className="text-sm text-gray-700">Great location and excellent service.</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      closeDetailedView();
                      openBookingModal(detailedItem);
                    }}
                    className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    {activeTab === 'hotels' ? 'Book Now' : 'Reserve Table'}
                  </button>
                  <button
                    onClick={() => {
                      toggleFavorite(detailedItem);
                    }}
                    className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite(detailedItem.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Bar */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-40"
          >
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-sm sm:text-base">
                    Compare ({compareList.length}/3)
                  </span>
                  <div className="flex gap-2">
                    {compareList.map((item) => (
                      <div key={item.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        <span className="truncate max-w-[100px]">{item.name}</span>
                        <button
                          onClick={() => toggleCompare(item)}
                          className="hover:text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={clearCompare}
                    className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => alert('Comparison feature - showing side by side comparison of selected items')}
                    className="px-3 sm:px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                  >
                    Compare
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accommodation;
