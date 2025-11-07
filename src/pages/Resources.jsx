import { useState } from 'react';
import { Download, MapPin, Smartphone, Globe, Calculator, Cloud, Book, FileText, ExternalLink } from 'lucide-react';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Maps & Guides', 'Mobile Apps', 'Useful Links', 'Tools'];

  const resources = [
    // Maps & Guides
    {
      id: 1,
      title: "Official Cape Town Tourism Guide",
      description: "Comprehensive PDF guide with attractions, dining, and accommodations",
      category: "Maps & Guides",
      type: "PDF Download",
      icon: FileText,
      link: "https://www.capetown.travel/",
      size: "12 MB"
    },
    {
      id: 2,
      title: "Cape Town Area Maps",
      description: "Detailed maps of Table Mountain, City Bowl, and surrounding areas",
      category: "Maps & Guides",
      type: "Interactive Map",
      icon: MapPin,
      link: "https://www.google.com/maps/place/Cape+Town",
      size: "Online"
    },
    {
      id: 3,
      title: "3-Day Itinerary Guide",
      description: "Perfect 3-day plan for first-time visitors to Cape Town",
      category: "Maps & Guides",
      type: "PDF Download",
      icon: Book,
      link: "#",
      size: "2 MB"
    },
    {
      id: 4,
      title: "Wine Region Map",
      description: "Complete map of Stellenbosch, Franschhoek, and Constantia wine routes",
      category: "Maps & Guides",
      type: "PDF Download",
      icon: MapPin,
      link: "#",
      size: "5 MB"
    },

    // Mobile Apps
    {
      id: 5,
      title: "Cape Town Travel Guide Offline",
      description: "Offline maps, GPS navigation, and zoomable area guides",
      category: "Mobile Apps",
      type: "iOS & Android",
      icon: Smartphone,
      link: "https://play.google.com/store",
      size: "Free"
    },
    {
      id: 6,
      title: "MyCiTi Bus App",
      description: "Real-time bus tracking, routes, and fare calculator",
      category: "Mobile Apps",
      type: "iOS & Android",
      icon: Smartphone,
      link: "https://myciti.org.za/",
      size: "Free"
    },
    {
      id: 7,
      title: "GPSmyCity Walking Tours",
      description: "Self-guided walking tours with offline maps and GPS tracking",
      category: "Mobile Apps",
      type: "iOS & Android",
      icon: Smartphone,
      link: "https://www.gpsmycity.com/",
      size: "Free + Paid"
    },
    {
      id: 8,
      title: "Weather South Africa",
      description: "Accurate weather forecasts and alerts for Cape Town",
      category: "Mobile Apps",
      type: "iOS & Android",
      icon: Cloud,
      link: "#",
      size: "Free"
    },

    // Useful Links
    {
      id: 9,
      title: "Official Cape Town Tourism",
      description: "Official tourism board website with latest events and updates",
      category: "Useful Links",
      type: "Website",
      icon: Globe,
      link: "https://www.capetown.travel/",
      size: "Online"
    },
    {
      id: 10,
      title: "Table Mountain Aerial Cableway",
      description: "Book tickets online and check operating hours",
      category: "Useful Links",
      type: "Website",
      icon: Globe,
      link: "https://www.tablemountain.net/",
      size: "Online"
    },
    {
      id: 11,
      title: "Cape Town on TripAdvisor",
      description: "Reviews, ratings, and recommendations from travelers",
      category: "Useful Links",
      type: "Website",
      icon: Globe,
      link: "https://www.tripadvisor.com/Tourism-g295424-Cape_Town_Central",
      size: "Online"
    },
    {
      id: 12,
      title: "South African Tourism",
      description: "National tourism information and travel advisories",
      category: "Useful Links",
      type: "Website",
      icon: Globe,
      link: "https://www.southafrica.net/",
      size: "Online"
    },

    // Tools
    {
      id: 13,
      title: "Currency Converter (ZAR)",
      description: "Real-time South African Rand exchange rates",
      category: "Tools",
      type: "Calculator",
      icon: Calculator,
      link: "https://www.xe.com/currencyconverter/convert/?Amount=1&From=ZAR&To=USD",
      size: "Online"
    },
    {
      id: 14,
      title: "Cape Town Weather Widget",
      description: "7-day weather forecast and historical climate data",
      category: "Tools",
      type: "Widget",
      icon: Cloud,
      link: "https://www.timeanddate.com/weather/south-africa/cape-town",
      size: "Online"
    },
    {
      id: 15,
      title: "Distance Calculator",
      description: "Calculate distances between Cape Town attractions",
      category: "Tools",
      type: "Calculator",
      icon: MapPin,
      link: "https://www.google.com/maps",
      size: "Online"
    },
    {
      id: 16,
      title: "Budget Planner",
      description: "Plan your daily budget for accommodation, food, and activities",
      category: "Tools",
      type: "Spreadsheet",
      icon: Calculator,
      link: "#",
      size: "Free"
    }
  ];

  const filteredResources = resources.filter(resource =>
    selectedCategory === 'All' || resource.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel Resources</h1>
          <p className="text-xl text-gray-600">
            Essential tools, maps, apps, and guides for exploring Cape Town
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 mb-8">
          Showing {filteredResources.length} of {resources.length} resources
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <resource.icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                    {resource.type}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">{resource.size}</span>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                  >
                    {resource.type.includes('Download') ? (
                      <>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </>
                    ) : (
                      <>
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open
                      </>
                    )}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access Tools Section */}
        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Access Tools</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Currency Converter */}
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <Calculator className="h-6 w-6 text-gray-700 mr-3" />
                <h3 className="font-semibold text-gray-900">Currency Converter</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                1 USD ≈ 18-19 ZAR (Check live rates)
              </p>
              <a
                href="https://www.xe.com/currencyconverter/convert/?Amount=1&From=ZAR&To=USD"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-gray-900 hover:text-gray-700"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Convert Currency
              </a>
            </div>

            {/* Weather Widget */}
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <Cloud className="h-6 w-6 text-gray-700 mr-3" />
                <h3 className="font-semibold text-gray-900">Weather Forecast</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Check current conditions and 7-day forecast
              </p>
              <a
                href="https://www.timeanddate.com/weather/south-africa/cape-town"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-gray-900 hover:text-gray-700"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View Weather
              </a>
            </div>
          </div>
        </div>

        {/* Download Tips */}
        <div className="mt-8 bg-gray-100 border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">💡 Resource Tips</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Download offline maps before your trip for areas with poor connectivity</li>
            <li>• Save important documents and emergency contacts on your device</li>
            <li>• Install the MyCiTi app for real-time bus tracking</li>
            <li>• Check official tourism websites for the latest updates and advisories</li>
            <li>• Bookmark currency converters for quick reference while shopping</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Resources;
