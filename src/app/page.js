import Hearo from "@/components/Hearo";
import Header from "@/components/Header";
import App from "@/components/Faltar";
import HeaderTest from "@/components/HeaderTest";
// import MapComponent from "@/components/Moov";
// import AddLocation from "@/components/AddAddress";
// import MapAdderess from "@/components/Map";
// import ImageUpload from "@/components/ImageUpload";

// import Htest from "@/components/Htest";



export default function Home() {
  return (
    <main className="w-[100%] px-[4%]">
      <Header />
      {/* <Htest /> */}
      {/* <MapAdderess /> */}
      {/* <MapComponent /> */}    
      {/* <ImageUpload /> */}
      <HeaderTest />
      <Hearo />
      {/* <div className="w-full h-full bg-orange-500">fghxdfgjsfgtj</div> */}
      <App/>
    </main>
  );
}


