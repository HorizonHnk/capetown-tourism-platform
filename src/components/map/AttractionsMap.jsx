import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { Star, MapPin, Clock } from 'lucide-react';

const AttractionsMap = ({ attractions }) => {
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Cape Town center coordinates
  const center = { lat: -33.9249, lng: 18.4241 };

  if (!API_KEY) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200">
        <div className="text-center p-8">
          <MapPin className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Google Maps API Key Required
          </h3>
          <p className="text-gray-600 mb-4">
            To view attractions on the map, please add your Google Maps API key to the .env file.
          </p>
          <code className="text-sm bg-gray-200 px-3 py-2 rounded">
            VITE_GOOGLE_MAPS_API_KEY=your_api_key
          </code>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultCenter={center}
          defaultZoom={10}
          mapId="capetown-attractions-map"
          className="w-full h-full rounded-lg"
          style={{ width: '100%', height: '100%' }}
        >
          {attractions.map((attraction) => {
            if (!attraction.coordinates) return null;

            return (
              <AdvancedMarker
                key={attraction.id}
                position={attraction.coordinates}
                onClick={() => setSelectedAttraction(attraction)}
              >
                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <div className="text-sm font-semibold">{attraction.name}</div>
                </div>
              </AdvancedMarker>
            );
          })}

          {selectedAttraction && selectedAttraction.coordinates && (
            <InfoWindow
              position={selectedAttraction.coordinates}
              onCloseClick={() => setSelectedAttraction(null)}
            >
              <div className="p-2 max-w-xs">
                <div className="flex gap-3">
                  {selectedAttraction.image && (
                    <img
                      src={selectedAttraction.image}
                      alt={selectedAttraction.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {selectedAttraction.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {selectedAttraction.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <MapPin className="h-3 w-3" />
                      <span>{selectedAttraction.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Clock className="h-3 w-3" />
                      <span>{selectedAttraction.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{selectedAttraction.rating}</span>
                      <span className="text-gray-500">
                        ({selectedAttraction.reviewCount?.toLocaleString()})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default AttractionsMap;
