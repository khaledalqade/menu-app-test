'use client';



// components/MapComponent.jsx
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';
import SearchBox from './SearchBox1';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 24.7136,
  lng: 46.6753
};

function MapComponent() {
  const [markerPosition, setMarkerPosition] = useState(center);

  const handlePlaceSelected = (location) => {
    setMarkerPosition(location);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
      libraries={['places']} // تأكد من تضمين مكتبة الأماكن
    >
      <div className="relative autocomplete-container">
  <SearchBox onPlaceSelected={handlePlaceSelected} />
  <GoogleMap
    mapContainerStyle={containerStyle}
    center={markerPosition}
    zoom={10}
  >
    <Marker position={markerPosition} />
  </GoogleMap>
</div>

    </LoadScript>
  );
}

export default MapComponent;
