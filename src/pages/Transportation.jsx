import { Bus, Car, Plane, Train, DollarSign, Clock, MapPin } from 'lucide-react';

const Transportation = () => {
  const transportOptions = [
    {
      icon: Plane,
      title: "Cape Town International Airport",
      description: "Main gateway to Cape Town with flights from major cities worldwide",
      details: [
        "20km from city center",
        "Approx. 30-minute drive",
        "Multiple transport options available"
      ],
      options: [
        { name: "Uber/Bolt", cost: "R200-R300", time: "25-35 min" },
        { name: "MyCiTi Airport Bus", cost: "R95", time: "35-45 min" },
        { name: "Airport Shuttle", cost: "R150-R250", time: "30-40 min" },
        { name: "Car Rental", cost: "From R300/day", time: "25 min" }
      ]
    },
    {
      icon: Bus,
      title: "MyCiTi Bus System",
      description: "Reliable and safe bus rapid transit system throughout Cape Town",
      details: [
        "Extensive route network",
        "myconnect card required",
        "Affordable and efficient"
      ],
      options: [
        { name: "Airport Route", cost: "R95", time: "Peak: 35-45 min" },
        { name: "City Routes", cost: "R8-R25", time: "Varies" },
        { name: "Waterfront Route", cost: "R10-R15", time: "15-30 min" }
      ]
    },
    {
      icon: Car,
      title: "Car Rental & Driving",
      description: "Freedom to explore at your own pace with rental cars",
      details: [
        "Drive on the left side",
        "Valid driver's license required",
        "Many scenic routes available"
      ],
      options: [
        { name: "Economy Car", cost: "R300-R450/day", time: "Full flexibility" },
        { name: "SUV", cost: "R500-R750/day", time: "Full flexibility" },
        { name: "Luxury Car", cost: "R1000+/day", time: "Full flexibility" }
      ]
    },
    {
      icon: Train,
      title: "Metrorail Trains",
      description: "Budget-friendly option for specific routes (use with caution)",
      details: [
        "Very affordable option",
        "Limited routes",
        "Safety concerns - use during daylight"
      ],
      options: [
        { name: "Southern Line", cost: "R10-R20", time: "Varies" },
        { name: "Northern Line", cost: "R10-R20", time: "Varies" }
      ]
    }
  ];

  const tips = [
    "Book Uber or Bolt rather than hailing taxis on the street",
    "Get a myconnect card for MyCiTi buses at any station",
    "Car rental includes GPS - essential for navigation",
    "Avoid driving in townships without a guide",
    "Download offline maps before traveling",
    "Traffic is heavy during peak hours (7-9 AM, 4-6 PM)"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Transportation Guide</h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about getting around Cape Town
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Transport Options */}
        <div className="space-y-8">
          {transportOptions.map((transport, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-100 p-3 rounded-full mr-4">
                    <transport.icon className="h-8 w-8 text-gray-700" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{transport.title}</h2>
                    <p className="text-gray-600">{transport.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {transport.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <div className="h-2 w-2 bg-gray-400 rounded-full mr-2"></div>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Options & Pricing</h3>
                <div className="space-y-3">
                  {transport.options.map((option, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{option.name}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {option.cost}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {option.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Travel Tips */}
        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Transportation Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-gray-100 rounded-full p-2 mr-3 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-gray-700" />
                </div>
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Routes */}
        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Routes</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Airport → City Center / Waterfront</h3>
              <p className="text-gray-600 text-sm mb-2">Best option: MyCiTi Airport Bus (R95) or Uber (R200-R300)</p>
              <p className="text-gray-500 text-sm">Duration: 25-45 minutes depending on traffic</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">City Center → Table Mountain</h3>
              <p className="text-gray-600 text-sm mb-2">Best option: Uber/Bolt (R50-R80) or MyCiTi Bus</p>
              <p className="text-gray-500 text-sm">Duration: 10-15 minutes</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">City Center → Cape Point</h3>
              <p className="text-gray-600 text-sm mb-2">Best option: Rental car or organized tour</p>
              <p className="text-gray-500 text-sm">Duration: 60-90 minutes one way</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">City Center → Wine Regions (Stellenbosch)</h3>
              <p className="text-gray-600 text-sm mb-2">Best option: Wine tour or rental car (don't drink and drive!)</p>
              <p className="text-gray-500 text-sm">Duration: 45-60 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transportation;
