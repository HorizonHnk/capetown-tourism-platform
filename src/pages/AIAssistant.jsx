const AIAssistant = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">AI Travel Assistant</h1>
      <p className="text-xl text-gray-600 mb-8">
        Get personalized recommendations and itineraries powered by Google Gemini AI.
      </p>
      <div className="mt-8 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <p className="text-gray-700 mb-4">
          🤖 AI-powered travel assistant coming soon!
        </p>
        <p className="text-gray-600">
          Features will include:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
          <li>Personalized itinerary generation</li>
          <li>Real-time chat assistance</li>
          <li>Budget planning</li>
          <li>Weather-based recommendations</li>
          <li>Landmark identification from photos</li>
        </ul>
      </div>
    </div>
  );
};

export default AIAssistant;
