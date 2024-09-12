'use client';
// components/AddLocation.jsx
// components/AddLocation.jsx
// components/AddLocation.jsx
// components/AddLocation.jsx
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

const AddLocationPage = () => {
  const [position, setPosition] = useState([24.7136, 46.6753]); // تعيين موقع افتراضي إلى الرياض، السعودية

  // const handleComplete = () => {
  //   if (position) {
  //     console.log('خط العرض:', position[0], 'خط الطول:', position[1]);
  //   } else {
  //     console.log('لم يتم تحديد موقع.');
  //   }
  // };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-[1069px] h-[597px]"> {/* تعيين ارتفاع للحاوية */}
        <MapComponent position={position} setPosition={setPosition} />
      </div>
      <button
        onClick={handleComplete}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        إكمال
      </button>
    </div>
  );
};

export default AddLocationPage;
































// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '600px',
// };

// // Set the default branch as the initial center and marker position
// const defaultBranch = { id: 31, title: "Murphy, Emard and Lockman", lat_lng: "24.774265,46.738586" };
// const [defaultLat, defaultLng] = defaultBranch.lat_lng.split(',').map(Number);
// const center = {
//   lat: defaultLat,
//   lng: defaultLng,
// };

// const branches = [
//   { id: 31, title: "Murphy, Emard and Lockman", lat_lng: "24.774265,46.738586" },
//   { id: 30, title: "Greenholt Ltd", lat_lng: "21.485811,39.192505" },
//   { id: 29, title: "Ankunding and Sons", lat_lng: "26.4207,50.0888" },
//   { id: 27, title: "Gibson Inc", lat_lng: "24.4686,39.6142" },
//   { id: 28, title: "Hickle-Waters", lat_lng: "18.2208,42.5053" },
//   { id: 25, title: "Maggio-Wilkinson", lat_lng: "25.3833,49.5865" },
// ];

// const getDistance = (lat1, lng1, lat2, lng2) => {
//   const toRad = (value) => value * (Math.PI / 180);
//   const R = 6371; // Radius of Earth in km
//   const dLat = toRad(lat2 - lat1);
//   const dLng = toRad(lng2 - lng1);
//   const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//             Math.sin(dLng / 2) * Math.sin(dLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in km
// };

// const useGeolocation = (setMarkerPosition, setError, map) => {
//   const handleLocateClick = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const newPosition = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           setMarkerPosition(newPosition);
//           if (map) {
//             map.panTo(newPosition);
//             map.setZoom(16);
//           }
//         },
//         (error) => {
//           console.error('Error getting location', error);
//           setError('Unable to retrieve your location.');
//         },
//         { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//       );
//     } else {
//       setError('Geolocation is not supported by this browser.');
//     }
//   };

//   return handleLocateClick;
// };

// const BranchSelector = ({ branches, sortedBranches, selectedBranch, setSelectedBranch, handleBranchSelect,printSelectedBranch }) => {
//   return (
//     <div className="absolute top-2 left-2 bg-white p-4 rounded shadow z-30 w-64">
//       <h3 className="font-bold mb-2">Select Branch</h3>
//       <div className="flex flex-col space-y-2">
//         {sortedBranches.map((branch) => (
//           <label key={branch.id} className="flex items-center space-x-2">
//             <input
//               type="radio"
//               name="branch"
//               value={branch.lat_lng}
//               checked={selectedBranch === branch.lat_lng}
//               onChange={() => {
//                 setSelectedBranch(branch.lat_lng);
//                 handleBranchSelect(branch.lat_lng);
//               }}
//             />
//             <span>{branch.title}</span>
//           </label>
//         ))}
//       </div>
//       <button
//           onClick={printSelectedBranch}
//           className="mt-2 bg-blue-500 w-full text-white px-4 py-2 rounded"
//         >
//           Confirm
//         </button>
//     </div>
//   );
// };

// const MapComponent = () => {
//   const [loading, setLoading] = useState(true);
//   const [markerPosition, setMarkerPosition] = useState(center);
//   const [map, setMap] = useState(null);
//   const [selectedBranch, setSelectedBranch] = useState(defaultBranch.lat_lng);
//   const [error, setError] = useState(null);
//   const [sortedBranches, setSortedBranches] = useState(branches);
//   const searchBoxRef = useRef(null);

//   useEffect(() => {
//     const sortBranches = () => {
//       const sorted = [...branches].sort((a, b) => {
//         const { lat: lat1, lng: lng1 } = markerPosition;
//         const [lat2A, lng2A] = a.lat_lng.split(',').map(Number);
//         const [lat2B, lng2B] = b.lat_lng.split(',').map(Number);
//         const distanceA = getDistance(lat1, lng1, lat2A, lng2A);
//         const distanceB = getDistance(lat1, lng1, lat2B, lng2B);
//         return distanceA - distanceB;
//       });
//       setSortedBranches(sorted);
//     };

//     sortBranches();
//   }, [markerPosition]);

//   const handleMapClick = (event) => {
//     console.log("event",event);
//     const { latLng } = event;
//     const newPosition = {
//       lat: latLng.lat(),
//       lng: latLng.lng(),
//     };
//     setMarkerPosition(newPosition);
//   };

//   const handleMapLoad = (mapInstance) => {
//     setMap(mapInstance);
//     setLoading(false);
//   };

//   const handleBranchSelect = (lat_lng) => {
//     const [lat, lng] = lat_lng.split(',').map(Number);
//     const newPosition = { lat, lng };
//     setMarkerPosition(newPosition);
//     if (map) {
//       map.panTo(newPosition);
//       map.setZoom(16);
//     }
//   };

//   const handleLocateClick = useGeolocation(setMarkerPosition, setError, map);

//   const onPlacesChanged = () => {
//     const places = searchBoxRef.current.getPlaces();
//     if (places.length === 0) return;

//     const place = places[0];
//     const newPosition = {
//       lat: place.geometry.location.lat(),
//       lng: place.geometry.location.lng(),
//     };
//     setMarkerPosition(newPosition);
//     if (map) {
//       map.panTo(newPosition);
//       map.setZoom(16);
//     }
//   };

//   const printSelectedBranch = () => {
//     const branch = branches.find(b => b.lat_lng === selectedBranch);
//     if (branch) {
//       console.log(`Selected Branch: ${branch.title}, Coordinates: ${branch.lat_lng}`);
//     } else {
//       console.log('No branch selected');
//     }
//   };

//   const selectedBranchDetails = branches.find(branch => branch.lat_lng === selectedBranch) || defaultBranch;

//   return (
//     <div className="relative" style={{ width: '100%', height: '600px' }}>
//       {loading && (
//         <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-80 z-20">
//           <div className="w-16 h-16 bg-gray-500 animate-pulse"></div>
//         </div>
//       )}

//       {error && (
//         <div className="absolute top-2 left-2 bg-red-500 text-white px-4 py-2 rounded shadow z-20">
//           {error}
//         </div>
//       )}

//       <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY} libraries={['places']}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={10}
//           options={{ mapTypeControl: false }}
//           onLoad={handleMapLoad}
//           onClick={handleMapClick}
//         >
//           <Marker position={markerPosition} />
//           {branches.map((branch) => {
//             const [lat, lng] = branch.lat_lng.split(',').map(Number);
//             return <Marker key={branch.id} position={{ lat, lng }} title={branch.title} />;
//           })}
//           {!loading && (
//             <button
//               onClick={handleLocateClick}
//               className="absolute bottom-2 left-2 bg-blue-500 text-white px-4 py-2 rounded shadow z-30"
//             >
//               Locate Me
//             </button>
//           )}
//         </GoogleMap>

//         <StandaloneSearchBox
//           onLoad={(ref) => (searchBoxRef.current = ref)}
//           onPlacesChanged={onPlacesChanged}
//         >
//           <input
//             type="text"
//             placeholder="Search for places"
//             className="absolute top-2 right-1/3 bg-white p-2 rounded shadow z-30 w-64"
//           />
//         </StandaloneSearchBox>
//       </LoadScript>

//       <BranchSelector
//         branches={branches}
//         sortedBranches={sortedBranches}
//         selectedBranch={selectedBranch}
//         setSelectedBranch={setSelectedBranch}
//         handleBranchSelect={handleBranchSelect}
//       />

//       <div className="absolute bottom-2 left-1/2 bg-white p-4 rounded shadow z-30 w-64">
//         <h3 className="font-bold mb-2">Branch Details</h3>
//         <p><strong>Title:</strong> {selectedBranchDetails.title}</p>
//         <p><strong>Coordinates:</strong> {selectedBranchDetails.lat_lng}</p>
        
//       </div>
//     </div>
//   );
// };

// export default MapComponent;
