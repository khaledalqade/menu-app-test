// 'use client';

// import dynamic from 'next/dynamic';
// import { useState, useEffect } from 'react';
// import 'leaflet/dist/leaflet.css';

// const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
// const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
// const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
// const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// export default function AddAddress() {
//   const [position, setPosition] = useState([24.7136, 46.6753]); // Default Riyadh coordinates
//   const [userPosition, setUserPosition] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserPosition([latitude, longitude]);
//           setPosition([latitude, longitude]);
//         },
//         (error) => {
//           console.error("Error obtaining location", error);
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 5000,
//           maximumAge: 0
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }

//     return () => {
//       // Handle any cleanup if necessary
//     };
//   }, []);

//   return (
//     <div className="flex h-screen">
//       <div className="w-1/3 p-4 bg-white shadow-lg">
//         <h1 className="text-xl font-bold mb-4">Address</h1>
//         <form>
//           <div className="mb-4">
//             <label htmlFor="addressType" className="block text-sm font-medium text-gray-700">Address type</label>
//             <select id="addressType" name="addressType" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
//               <option>Home</option>
//               <option>Work</option>
//               <option>Other</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="addressName" className="block text-sm font-medium text-gray-700">Address name</label>
//             <input type="text" id="addressName" name="addressName" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="addressDescription" className="block text-sm font-medium text-gray-700">Address Description</label>
//             <textarea id="addressDescription" name="addressDescription" rows="3" className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"></textarea>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="note" className="block text-sm font-medium text-gray-700">Note</label>
//             <textarea id="note" name="note" rows="3" className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"></textarea>
//           </div>
//           <div className="flex justify-between">
//             <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700">Add an address</button>
//             <button type="button" className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700">Confirm address</button>
//           </div>
//         </form>
//       </div>
//       <div className="w-2/3 h-full">
//         <MapContainer key={JSON.stringify(position)} center={position} zoom={13} className="h-full">
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           />
//           {userPosition && (
//             <Marker position={userPosition}>
//               <Popup>
//                 You are here.
//               </Popup>
//             </Marker>
//           )}
//         </MapContainer>
//       </div>
//     </div>
//   );
// }
