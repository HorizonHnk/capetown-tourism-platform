import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { Star, MapPin, Clock } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const LeafletMap = ({ attractions }) => {
  const [map, setMap] = useState(null);

  // Cape Town center coordinates
  const center = [-33.9249, 18.4241];

  // Adjust map bounds when attractions change
  useEffect(() => {
    if (map && attractions.length > 0) {
      const bounds = attractions
        .filter(attraction => attraction.coordinates)
        .map(attraction => [attraction.coordinates.lat, attraction.coordinates.lng]);

      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [map, attractions]);

  return (
    <div className="h-full w-full">
      <MapContainer
        center={center}
        zoom={11}
        className="w-full h-full rounded-lg"
        style={{ width: '100%', height: '100%' }}
        whenCreated={setMap}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {attractions.map((attraction) => {
          if (!attraction.coordinates) return null;

          return (
            <Marker
              key={attraction.id}
              position={[attraction.coordinates.lat, attraction.coordinates.lng]}
            >
              <Popup maxWidth={350} className="custom-popup">
                <div className="p-2">
                  <div className="flex gap-3">
                    {attraction.image && (
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1 text-base">
                        {attraction.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {attraction.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <MapPin className="h-3 w-3" />
                        <span>{attraction.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <Clock className="h-3 w-3" />
                        <span>{attraction.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{attraction.rating}</span>
                        <span className="text-gray-500">
                          ({attraction.reviewCount?.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
