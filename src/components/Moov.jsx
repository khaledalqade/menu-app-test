'use client';


import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
//vuesax/bulk/close-circle
import { Add, Heart, Star } from 'iconsax-react';
import { CloseCircle } from 'iconsax-react';
import { Clock , Location } from 'iconsax-react';
// clock location
import Image from 'next/image';
import axios from 'axios';




const containerStyle = {
  width: '1069px',
  height: '597px',
};

// مركز الخريطة على الرياض
const center = {
  lat: 24.7136,
  lng: 46.6753,
};

// حساب المسافة بين نقطتين
const getDistance = (lat1, lng1, lat2, lng2) => {
  const toRad = (value) => value * (Math.PI / 180);
  const R = 6371; // نصف قطر الأرض بالكيلومترات
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // المسافة بالكيلومترات
};

// بيانات الفروع
const initialBranches = [
  { id: 31, title: "Murphy, Emard and Lockman", lat_lng: "24.774265,46.738586" },
  { id: 30, title: "Greenholt Ltd", lat_lng: "21.485811,39.192505" },
  { id: 29, title: "Ankunding and Sons", lat_lng: "26.4207,50.0888" },
  { id: 27, title: "Gibson Inc", lat_lng: "24.4686,39.6142" },
  { id: 28, title: "Hickle-Waters", lat_lng: "18.2208,42.5053" },
  { id: 25, title: "Maggio-Wilkinson", lat_lng: "25.3833,49.5865" },
];






const MapComponent = ({ onClose }) => {
  const [loading, setLoading] = useState(true);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [map, setMap] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [error, setError] = useState(null);
  const [nearestBranch, setNearestBranch] = useState(null);
  const searchBoxRef = useRef(null);
  const [branches, setBranches] = useState(initialBranches);


  const handleBranchSelect = (lat_lng) => {
    const [lat, lng] = lat_lng.split(',').map(Number);
    const branchPosition = { lat, lng };
  
    if (map) {
      map.panTo(branchPosition);
      map.setZoom(16); // أو القيمة المناسبة لتكبير الخريطة
    }
  };
  
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get('https://do-env.xyz/api/v1/branch?filter[account]=22');
        setBranches(response.data.result.data);
        const defaultBranch = response.data.result.data.find(branch => branch.default === 1);
        setSelectedBranch(response.data.result.data.find(branch => branch.default === 1).lat_lng);
        handleBranchSelect(response.data.result.data.find(branch => branch.default === 1).lat_lng);
       
      } catch (err) {
        setError('Unable to fetch branches.');
      } finally {
        setLoading(false);
        ;
      }
    };

    fetchBranches();
  }, []);

  useEffect(() => {
    const findNearestBranch = () => {
      const closestBranch = branches.reduce((closest, branch) => {
        const [lat, lng] = branch.lat_lng.split(',').map(Number);
        const distance = getDistance(markerPosition.lat, markerPosition.lng, lat, lng);
        return distance < closest.distance ? { branch, distance } : closest;
      }, { branch: null, distance: Infinity });
      setNearestBranch(closestBranch.branch);
    };

    findNearestBranch();
  }, [markerPosition, branches]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleMapClick = (event) => {
    const { latLng } = event;
    const newPosition = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    };
    setMarkerPosition(newPosition);
  };

  const handleLocateClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(newPosition);
          if (map) {
            map.panTo(newPosition);
            map.setZoom(16);
          }
        },
        (error) => {
          console.error('Error getting location', error);
          setError('Unable to retrieve your location. Please check your browser settings.');
          const defaultPosition = { lat: 24.774265, lng: 46.738586 }; // الرياض كموقع افتراضي
          setMarkerPosition(defaultPosition);
          if (map) {
            map.panTo(defaultPosition);
            map.setZoom(16);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
    handleLoad();
  };

  

  const printSelectedBranch = () => {
    if (nearestBranch) {
      // تحديث selectedBranch لتحديد الـ radio input
      // setSelectedBranch(nearestBranch.lat_lng);
      
      // يمكنك الآن إضافة أي عمليات إضافية تحتاجها هنا، مثل طباعة أو ما شابه
      const storedCa = JSON.parse(localStorage.getItem('Branch')) || {};
      // console.log('Nearest Branch:', storedCa);
      
      // console.log('Nearest Branch:', nearestBranch);
      // localStorage.removeItem('Branch');
      localStorage.setItem('Branch', JSON.stringify(nearestBranch));
      const storedCar = JSON.parse(localStorage.getItem('Branch')) || {};
      console.log('Nearest Branch:', storedCar);
      onClose();
    } else {
      console.log('No branch selected.');
    }
  };
  
  

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) return;

    const place = places[0];
    const newPosition = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    setMarkerPosition(newPosition);
    map.panTo(newPosition);
    map.setZoom(16);
  };




  // اقرب فرع



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="relative rounded-3xl flex items-center justify-center bg-white" style={{ width: '1069px', height: '597px', overflow: 'hidden' }}>
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-80 z-20">
            <div className="w-16 h-16 bg-gray-500 animate-pulse"></div>
          </div>
        )}

        {error && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-4 py-2 rounded z-20">
            {error}
          </div>
        )}

    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY} libraries={['places']}>
      <GoogleMap
        mapContainerStyle={{ ...containerStyle, borderRadius: '24px', overflow: 'hidden' }} // إضافة الحواف الدائرية هنا
        center={center}
        zoom={10}
        options={{ mapTypeControl: false }}
        onLoad={handleMapLoad}
        onClick={handleMapClick}
        className="rounded-3xl"
      >
          {/* علامة الموقع الخاصة بالمستخدم */}
          <Marker position={markerPosition} />

          {/* عرض العلامات الثابتة للفروع */}
          {branches.map((branch) => {
            const [lat, lng] = branch.lat_lng.split(',').map(Number);
            return <Marker key={branch.id} position={{ lat, lng }} title={branch.title} />;
          })}

          {!loading && (
            <button
              onClick={handleLocateClick}
              className="absolute bottom-2 left-2 z-30"
            >
             
              
              <Image src='/myLoc.svg' alt="close" width={46} height={46} />
            </button>
      )}

          {/* حقل البحث مع الاقتراحات */}
          <StandaloneSearchBox
            onLoad={(ref) => (searchBoxRef.current = ref)}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Search"
              className="absolute top-2 left-20 bg-white p-2 rounded-full shadow z-[80px] w-[635px]"
            />
          </StandaloneSearchBox>
        </GoogleMap>
      </LoadScript>

      {/* قائمة الخيارات العائمة مع أزرار الراديو */}
      <div className='absolute top-[6px] right-[6px] bg-white p-[10px] rounded-[20px] z-30 w-[300px] h-[585px]'>
      <div className="w-full h-[508px]  flex-col">
      <div className="h-10 w-full bg-white justify-between items-center inline-flex mb-2">
  <div className="flex-col justify-center items-start gap-1 inline-flex">
    <div className="text-black text-[16px] font-semibold leading-tight">Select th branch</div>
    <div className="text-neutral-400 text-xs font-medium  leading-[14.44px]">Description</div>
  </div>
  <div className="w-10 h-10 justify-center items-center flex">
    <div  onClick={onClose} className="p-[3px] cursor-pointer rounded-[100px] justify-start items-start gap-2.5 inline-flex">
      <div className="w-[33.33px] h-[33.33px] flex justify-center items-center bg-[#FAFAFA] rounded-full">
        
        <Image src='/close.svg' alt="close" width={12} height={12} />

       
      </div>
    </div>
  </div>
</div>
        <div className="flex flex-col space-y-2 w-full h-[460px] rounded-xl  overflow-y-auto scrollbar-hide">
  {branches.map((branch, index) => (
    <React.Fragment key={branch.id}>
        <label
    className={`flex flex-col items-start space-x-2 p-2 rounded-xl cursor-pointer transition-colors ${
      selectedBranch === branch.lat_lng
        ? 'bg-[#227b82] text-white'
        : 'bg-white hover:bg-slate-100 '
    }`} 
    onClick={() => {
      setSelectedBranch(branch.lat_lng);
      handleBranchSelect(branch.lat_lng); // تأكد من استدعاء هذه الدالة
    }}
  >
        <div className='flex items-center justify-between w-full'>
        <span className={`text-black text-[16px] font-semibold leading-[22px] ${
          selectedBranch === branch.lat_lng
            ? 'text-white '
            : 'text-black' // لون أزرق فاتح عند الهوفر
        }`}>{branch.title}</span>
        <input
          type="radio"
          name="branch"
          value={branch.lat_lng}
          checked={selectedBranch === branch.lat_lng}
          onChange={() => {
            setSelectedBranch(branch.lat_lng);
            handleBranchSelect(branch.lat_lng);
          }}
          className={`mr-2 rounded-full ${
            selectedBranch === branch.lat_lng ? 'opacity-100' : 'opacity-0'
          } transition-opacity`} // التحكم في الشفافية
          style={{
            width: '10px', // يمكن تعديل الحجم حسب الحاجة
            height: '10px',
          }}
          
        />
        </div>
        <div className='flex items-center gap-1 mt-2'>
      <Clock className={`w-[14px] h-[14px] md:w-[16px] md:h-[16px] ${
          selectedBranch === branch.lat_lng
            ? 'text-white'
            : 'text-[#797676]' // لون أزرق فاتح عند الهوفر
        }`} />
          
        <label className='text-[#34C759] text-[14px] font-normal leading-[22px]'>Open until 1:00</label>
          </div>  
          <div className='flex items-start my-1'>
          <Location  className={`w-[30px] h-[30px] pb-3 ${
          selectedBranch === branch.lat_lng
            ? 'text-white'
            : 'text-[#797676]' // لون أزرق فاتح عند الهوفر
        }`} />
          
        <label className={` text-[14px] font-normal leading-[21px] ${
          selectedBranch === branch.lat_lng
            ? 'text-white'
            : 'text-[#797676]' // لون أزرق فاتح عند الهوفر
        }`}>King Fahd Road, Al Aqiq District, Riyadh 13515, Saudi Arabia</label>
          </div> 
      </label>
      {index < branches.length - 1 && (
        <hr className="my-2 border-[#F4F0EF]" /> // الخط الفاصل بين العناصر
      )}
    </React.Fragment>
  ))}
</div>
      </div>
      <button
                onClick={printSelectedBranch}
                className="mt-2 bg-[#227B82] w-full h-[43px] text-white px-4 py-2 rounded text-[16px] font-semibold leading-[19.25px]"
              >
                Confirm
              </button>
      </div>
      {/* المربع السفلي لعرض الفرع الأقرب وزر الطباعة */}
      <div className="absolute bottom-2 left-44 bg-white px-3 py-2 rounded-2xl shadow z-30 w-[408px] h-[150px]"
       onClick={() => {
        if (nearestBranch) {
          // تعيين الفرع الأقرب كنشط في الـ radio input
            handleBranchSelect(nearestBranch.lat_lng);
            setSelectedBranch(nearestBranch.lat_lng);
        }
      }}
    >
        <h3 className="mb-2 text-[16px] font-semibold leading-[22px]">Nearest Branch</h3>
        <div>
          {nearestBranch ? (
            <>
              <p className="mb-2 text-[16px] font-semibold leading-[22px]">{nearestBranch.title}</p>
              <div className="h-7 flex-col justify-start items-start gap-1 inline-flex">
  <div className="self-stretch justify-between items-center inline-flex">
    <div className="justify-start items-center gap-1.5 flex">
      <div className="text-[#34c759] text-sm font-normal font-['K2D'] leading-snug">Open until 1:00</div>
    </div>
  </div>
  <div className="justify-start items-start gap-1.5 inline-flex">
    <div className="text-[#0c0505] text-sm font-normal font-['K2D'] leading-[21px]">King Fahd Road, Al Aqiq District, Riyadh 13515, Saudi Arabia</div>
  </div>
</div>
            </>
          ) : (
            <p>No nearest branch found.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default MapComponent;
//close.svg