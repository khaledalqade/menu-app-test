'use client';

// components/MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchBox from './SearchBox'; // استيراد SearchBox

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ position }) => {
  const map = useMap();

  React.useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), {
        animate: true,
        duration: 1,
      });
    }
  }, [position, map]);

  return position ? <Marker position={position} /> : null;
};

const MapComponent = ({ position, setPosition }) => {
  const handleSearch = async (query) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
      }
    } catch (error) {
      console.error('خطأ في البحث:', error);
    }
  };

  return (
    <div className="relative h-full">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '100%', width: '100%' }} // التأكد من أن الخريطة تأخذ المساحة الكاملة
        className="z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} />
      </MapContainer>
      <div className="absolute top-2 right-1 transform -translate-x-1/2 z-50 w-80">
        <SearchBox onSearch={handleSearch} />
      </div>
      <div className="absolute left-2 top-2 z-50 w-1/3 p-4 bg-white shadow-lg">
        <h1 className="text-xl font-bold mb-4">Address</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="addressType" className="block text-sm font-medium text-gray-700">Address type</label>
            <select id="addressType" name="addressType" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>Home</option>
              <option>Work</option>
              <option>Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="addressName" className="block text-sm font-medium text-gray-700">Address name</label>
            <input type="text" id="addressName" name="addressName" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="addressDescription" className="block text-sm font-medium text-gray-700">Address Description</label>
            <textarea id="addressDescription" name="addressDescription" rows="3" className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="note" className="block text-sm font-medium text-gray-700">Note</label>
            <textarea id="note" name="note" rows="3" className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"></textarea>
          </div>
          <div className="flex justify-between">
            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700">Add an address</button>
            <button type="button" className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700">Confirm address</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MapComponent;
