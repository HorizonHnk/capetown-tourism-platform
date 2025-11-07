import { Shield, AlertTriangle, Phone, MapPin, Sun, Heart } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../utils/constants';

const Safety = () => {
  const safetyTips = [
    {
      icon: MapPin,
      title: "Stay Aware of Your Surroundings",
      tips: [
        "Keep valuables out of sight and avoid displaying expensive jewelry or electronics",
        "Stay in well-lit, populated areas, especially at night",
        "Use reputable accommodations in safe neighborhoods",
        "Avoid walking alone after dark - use Uber or Bolt instead"
      ]
    },
    {
      icon: Shield,
      title: "Safe Areas & Neighborhoods",
      tips: [
        "V&A Waterfront, City Bowl, and Atlantic Seaboard are generally safe",
        "Camps Bay, Clifton, and Sea Point are popular and well-patrolled",
        "Green Point and Gardens are good for walking during the day",
        "Ask your accommodation for area-specific safety advice"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Common Sense Precautions",
      tips: [
        "Don't leave bags or valuables visible in parked cars",
        "Keep car doors locked and windows up while driving",
        "Use ATMs inside banks or shopping malls during daylight",
        "Make copies of important documents and store separately",
        "Share your itinerary with family or friends"
      ]
    },
    {
      icon: Sun,
      title: "Health & Weather Safety",
      tips: [
        "Use high SPF sunscreen - Cape Town sun is strong year-round",
        "Stay hydrated, especially during summer months",
        "Tap water is safe to drink throughout Cape Town",
        "Watch out for strong ocean currents when swimming",
        "Table Mountain weather changes quickly - bring layers"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety Tips for Cape Town</h1>
          <p className="text-xl text-gray-600">
            Stay safe and enjoy your visit with these important guidelines
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <Heart className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Cape Town is Generally Safe for Tourists</h3>
              <p className="text-blue-800">
                Millions of tourists visit Cape Town every year and have wonderful, safe experiences.
                Like any major city, being aware and taking sensible precautions ensures a worry-free visit.
                The tips below will help you stay safe while enjoying all that Cape Town has to offer.
              </p>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {safetyTips.map((section, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 p-3 rounded-full mr-4">
                  <section.icon className="h-6 w-6 text-gray-700" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start text-gray-700">
                    <span className="text-gray-400 mr-2">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Emergency Contacts */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Phone className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Emergency Contacts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-red-300">
              <p className="text-sm text-gray-600 mb-2">Emergency Services</p>
              <p className="text-3xl font-bold text-gray-900">{EMERGENCY_CONTACTS.emergencyServices}</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-red-300">
              <p className="text-sm text-gray-600 mb-2">Police</p>
              <p className="text-3xl font-bold text-gray-900">{EMERGENCY_CONTACTS.police}</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-red-300">
              <p className="text-sm text-gray-600 mb-2">Ambulance</p>
              <p className="text-3xl font-bold text-gray-900">{EMERGENCY_CONTACTS.ambulance}</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-red-300">
              <p className="text-sm text-gray-600 mb-2">Fire Department</p>
              <p className="text-3xl font-bold text-gray-900">{EMERGENCY_CONTACTS.fire}</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-red-300">
              <p className="text-sm text-gray-600 mb-2">Tourist Police</p>
              <p className="text-3xl font-bold text-gray-900">{EMERGENCY_CONTACTS.touristPolice}</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-red-300">
              <p className="text-sm text-gray-600 mb-2">Your Embassy</p>
              <p className="text-sm text-gray-900">Contact before travel</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg border border-red-300">
            <p className="text-sm text-gray-700">
              <strong>Important:</strong> Save these numbers in your phone before traveling.
              All emergency numbers work from any phone, even without credit or a SIM card.
            </p>
          </div>
        </div>

        {/* Health Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Health & Medical Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Medical Facilities</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Excellent private hospitals and clinics available</li>
                <li>• Pharmacies (chemists) widely available</li>
                <li>• Travel insurance highly recommended</li>
                <li>• Many doctors speak English</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Health Precautions</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• No mandatory vaccinations for most travelers</li>
                <li>• Malaria-free in Cape Town area</li>
                <li>• Tap water is safe to drink</li>
                <li>• Bring any prescription medications</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Private Hospitals (24/7 Emergency)</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Mediclinic Cape Town: 021 464 5500</li>
              <li>• Netcare Christiaan Barnard Memorial Hospital: 021 480 6111</li>
              <li>• Groote Schuur Hospital (Public): 021 404 9111</li>
            </ul>
          </div>
        </div>

        {/* Helpful Resources */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Helpful Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Before You Go</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Register with your embassy</li>
                <li>• Get comprehensive travel insurance</li>
                <li>• Make copies of important documents</li>
                <li>• Share your itinerary with family/friends</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Useful Apps</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Uber & Bolt for safe transportation</li>
                <li>• Google Maps for navigation</li>
                <li>• WhatsApp for communication</li>
                <li>• SnapScan or Zapper for payments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safety;
