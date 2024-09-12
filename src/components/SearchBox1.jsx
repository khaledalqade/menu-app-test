'use client';
// components/SearchBox.jsx
import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';

function SearchBox({ onPlaceSelected }) {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        onPlaceSelected(location);
      }
    }
  };

  return (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
      fields={['geometry', 'formatted_address']} // تأكد من تضمين الحقول المطلوبة
    >
      <input
        type="text"
        placeholder="Search for places..."
        className="p-2 border border-gray-300 rounded"
      />
    </Autocomplete>
  );
}

export default SearchBox;
