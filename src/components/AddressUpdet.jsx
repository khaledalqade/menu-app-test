'use client';

import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import Image from "next/image";
import AutoResizeTextarea from "./AutoResizeTextarea";
import { motion } from "framer-motion";
import StyledDropdown from "./StyledDropdown";

const containerStyle = {
  width: "1069px",
  height: "597px",
};



// مركز الخريطة على الرياض
const center = {
  lat: 24.7136,
  lng: 46.6753,
};

// بيانات الفروع (تم حذف استخدامها من الكود المعدل)
const branches = [
  // بيانات الفروع تم إزالتها
];

// حساب المسافة بين نقطتين (تم حذف استخدامها من الكود المعدل)
const getDistance = (lat1, lng1, lat2, lng2) => {
  // تم حذف الكود هنا
};

const MapAdderessupdet = ({ onClose, addres,aaddres }) => {

  const [loading, setLoading] = useState(true);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);
  const searchBoxRef = useRef(null);



  




  

  
  useEffect(() => {
    console.log("addres", addres);
    // console.log("addres", aaddres);
    // يتم إزالة الكود المتعلق بالعثور على أقرب فرعaaddres
  }, [markerPosition, addres]);
  

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
          console.error("Error getting location", error);
          setError(
            "Unable to retrieve your location. Please check your browser settings."
          );
          // موقع افتراضي في حال فشل تحديد الموقع
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
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
    handleLoad();
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
  // building_no
  // : 
  // "dfhdhfg"
  // city
  // : 
  // "East Jamar"
  // department_no
  // : 
  // "sdgsd"
  // description
  // : 
  // "sdgdf"
  // floor
  // : 
  // "gffgh"
  // id
  // : 
  // 18
  // latitude
  // : 
  // "24.84015778"
  // longitude
  // : 
  // "46.36630952"
  // notes
  // : 
  // "dfhdfhdf"
  // phone
  // : 
  // "547457"
  // title
  // : 
  // "fgsdfg"
  // type
  // : 
  // "home" 
//   building_no
// : 
// "dgdsfgdzf"
// city
// : 
// "East Pierre"
// department_no
// : 
// "xgjxgfj"
// description
// : 
// "xgjxghj"
// floor
// : 
// "fgzfgjzfgjx"
// id
// : 
// 20
// latitude
// : 
// "24.68967939"
// longitude
// : 
// "46.68105721"
// name
// : 
// "مستخدم رقم 13فيعق"
// notes
// : 
// "xfgjxfgj"
// phone
// : 
// "2345677654"
// title
// : 
// "dfjjdt"
// type
// : 
// "home"
  const [texts, setTexts] = useState({
    Address_name: addres.title,
    Your_Name: addres.name,
    Your_Phone: addres.phone,
    building_no:addres.building_no,
    floor: addres.floor,
    department_no: addres.department_no,
    description: addres.description,
    note: addres.notes,
  });

  // دالة لمعالجة التغيير في الحقول
  const handleChange = (e) => {
    const { id, value } = e.target;
    setTexts((prevTexts) => ({
      ...prevTexts,
      [id]: value,
    }));
  };

  // دالة لحفظ البيانات
  const handleSavee = () => {
    // console.log("Saved Data:", texts);
    // تفريغ الحقول
    setTexts({
      Address_name: "",
      Your_Name: "",
      Your_Phone: "",
      building_no: "",
      floor: "",
      department_no: "",
      description: "",
      note: "",
    });
  };

  //fremar motion
  const [isRotated, setIsRotated] = useState(false);

  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };

  const resetRotation = () => {
    setIsRotated(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [selectedValue1, setSelectedValue1] = useState("");
  const [selectedId1, setSelectedId1] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [selectedId2, setSelectedId2] = useState(addres.city_id);
  const [selectedValue3, setSelectedValue3] = useState(addres.type);
  const [selectedId3, setSelectedId3] = useState("");

  const handleOptionChange1 = (value, id) => {
    setSelectedValue1(value);
    setSelectedId1(id);
  };

  const handleOptionChange2 = (value, id) => {
    setSelectedValue2(value);
    setSelectedId2(id);
  };

  const handleOptionChange3 = (value, id) => {
    setSelectedValue3(value);
    setSelectedId3(id);
  };

  // const handleButtonClick = () => {
  //   console.log("Dropdown 1 - Selected value:", selectedValue1);
  //   console.log("Dropdown 1 - Selected ID:", selectedId1);
  //   console.log("Dropdown 2 - Selected value:", selectedValue2);
  //   console.log("Dropdown 2 - Selected ID:", selectedId2);
  //   console.log("Dropdown 3 - Selected value:", selectedValue3);
  //   console.log("Dropdown 3 - Selected ID:", selectedId3);
  // };

  const staticOptions = [
    { id: 1, name: "Option 1", arabic_name: "الخيار 1" },
    { id: 2, name: "Option 2", arabic_name: "الخيار 2" },
    { id: 3, name: "Option 3", arabic_name: "الخيار 3" },
  ];

  const addressOptions = [
    { id: 1, name: "home", arabic_name: "المنزل" },
    { id: 2, name: "office", arabic_name: "العمل" },
    { id: 3, name: "other", arabic_name: "أخرى" },
  ];

  // 1 show  2 apdet

  const handleSaveAddress = async () => {
    // تجميع البيانات من الحالة
    const dataToSend = {
      city_id: selectedId2, // تأكد من أنها قيمة صحيحة
      id: localStorage.getItem('userId'),
      // id: addres.id,
      // user_id: 12,
      // user_id: localStorage.getItem('userId') || null,
      // localStorage.getItem('token') || null,
      type: selectedValue3, // تأكد من أنها قيمة صحيحة
      name: texts.Address_name,
      phone_number: texts.Your_Phone,
      description: texts.description,
      title: texts.Address_name, // يمكنك تعديل هذا إذا كان يتطلب قيمة مختلفة
      latitude: markerPosition.lat, // تأكد من أنها قيمة صحيحة
      longitude: markerPosition.lng, // تأكد من أنها قيمة صحيحة
      building_no: texts.building_no,
      floor: texts.floor,
      department_no: texts.department_no,
      notes: texts.note,
    };

    try {
      if (typeof window !== 'undefined') {
        // إرسال الطلب إلى الـ API
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://do-env.xyz/api/v1/address/update",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // إضافة التوكن إلى الهيدر
          },
        }
      );

      // console.log("Response:", response.data);
      // const storedCa = JSON.parse(localStorage.getItem('Branch')) || {};
      // console.log('Nearest Branch:', storedCa);

      // "Authorization":"Bearer ",
      // localStorage.getItem('token') || null,

      // localStorage.removeItem('Branch');
      localStorage.setItem("Branch", JSON.stringify(response.data));
      const storedCar = JSON.parse(localStorage.getItem("Branch")) || {};
      // console.log("address3:", storedCar);
      onClose();
      // localStorage.setItem('Branch', JSON.stringify(response.data));

      setTexts({
        Address_name: "",
        Your_Name: "",
        Your_Phone: "",
        building_no: "",
        floor: "",
        department_no: "",
        description: "",
        note: "",
      });
      setMarkerPosition(center); // إعادة تعيين الموقع إلى المركز
    }} catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);

        if (error.response.data.errors) {
          console.error("Validation errors:", error.response.data.errors);
          setError(
            "Validation error: " + JSON.stringify(error.response.data.errors)
          );
        } else {
          setError("Failed to save address. Please check the entered details.");
        }
      } else if (error.request) {
        console.error("Error request:", error.request);
        setError("No response from server. Please try again later.");
      } else {
        console.error("Error message:", error.message);
        setError("Error: " + error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div
        className="relative rounded-3xl flex items-center justify-center bg-white"
        style={{ width: "1069px", height: "597px", overflow: "hidden" }}
      >
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

        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
          libraries={["places"]}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            options={{ mapTypeControl: false }}
            onLoad={handleMapLoad}
            onClick={handleMapClick}
          >
            {/* علامة الموقع الخاصة بالمستخدم */}
            <Marker position={markerPosition} />

            {!loading && (
              <button
                onClick={handleLocateClick}
                className="absolute bottom-2 left-2 z-30"
              >
                <Image src="/myLoc.svg" alt="close" width={46} height={46} />
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
        <div className="absolute top-[6px] right-[6px] bg-white p-[10px] rounded-[20px] z-30 w-[300px] h-[585px]">
          <div className="w-full overflow-y-auto overflow-x-hidden">
            <div className="h-10 w-full bg-white justify-between items-center inline-flex mb-2">
              <div className="flex-col justify-center items-start gap-1 inline-flex">
                <div className="text-black text-[16px] font-semibold leading-tight">
                  Add new address
                </div>
              </div>
              <div className="w-10 h-10 justify-center items-center flex">
                <div
                  onClick={onClose}
                  className="p-[3px] cursor-pointer rounded-[100px] justify-start items-start gap-2.5 inline-flex"
                >
                  <div className="w-[33.33px] h-[33.33px] flex justify-center items-center bg-[#FAFAFA] rounded-full">
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={12}
                      height={12}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* قائمة الفروع تم إزالتها */}
          </div>
          <form className="w-full h-[458px] overflow-y-auto overflow-x-hidden">
            <StyledDropdown
              apiUrl="https://do-env.xyz/api/v1/city"
              optionKey="name"
              addres={addres}
              displayKey="name"
              onOptionChange={handleOptionChange2}
            defaultOptionText={addres.city_name}// تغيير النص الافتراضي هنا
            />
            <StyledDropdown
              staticOptions={addressOptions}
              optionKey={addres.type}
              displayKey="name"
              onOptionChange={handleOptionChange3}
              defaultOptionText={addres.type}// تغيير النص الافتراضي هنا
            />
            <AutoResizeTextarea
              id="Address_name"
              placeholder=" "
              label="Address Name"
              value={texts.Address_name}
              onChange={handleChange}
            />
            
            <AutoResizeTextarea
              id="Your_Name"
              placeholder=" "
              label="Your Name"
              value={texts.Your_Name}
              onChange={handleChange}
            />
            <AutoResizeTextarea
              id="Your_Phone"
              placeholder=" "
              label="Your_Phone"
              value={texts.Your_Phone}
              onChange={handleChange}
            />
            <AutoResizeTextarea
              id="building_no"
              placeholder=" "
              label="building No"
              value={texts.building_no}
              onChange={handleChange}
            />
            <AutoResizeTextarea
              id="floor"
              placeholder=" "
              label="floor"
              value={texts.floor}
              onChange={handleChange}
            />
            <AutoResizeTextarea
              id="department_no"
              placeholder=" "
              label="department No"
              value={texts.department_no}
              onChange={handleChange}
            />
            <AutoResizeTextarea
              id="description"
              placeholder=" "
              label="Description"
              value={texts.description}
              onChange={handleChange}
            />
      
            <AutoResizeTextarea
              id="note"
              placeholder=" "
              label="Note"
              value={texts.note}
              onChange={handleChange}
            />
          </form>
          <div className="flex justify-between">
            <button
              onClick={handleSaveAddress}
              type="button"
              className="bg-[#90f8ff54] text-[#227B82] text-[16px] font-semibold rounded-md shadow-sm w-[136px] h-[43px]"
            >
              Add an address
            </button>
            <button
              type="button"
              className="bg-[#227B82] text-white  rounded-md shadow-sm w-[136px] h-[43px]"
            >
              Confirm address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapAdderessupdet;
