import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa";
import LocationSearchPanel from "../components/LocationSearchPanel";
import RidePanel from "../components/RidePanel";

const Home = () => {
  const [pick, setPick] = useState("");
  const [drop, setDrop] = useState("");
  const [locationPanel, setLocationPanel] = useState(0);  //Controls visibility of the location panel 
  const [vehiclePanel, setVehiclePanel] = useState(1);  //Controls visibility of the ride panel 
  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* LOGO */}
      <div className="absolute top-4 right-4">
        <img
          src="https://www.citypng.com/public/uploads/preview/uber-text-word-logo-image-png-701751694707226btedlq6lg3.png"
          alt="Logo"
          className="w-16 h-16"
        />
      </div>

      {/* BACKGROUND CONTAINER */}
      <div
        className="h-full w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/your-background.jpg')" }}
      >
        {/* INPUT SECTION */}
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-11/12 md:w-2/3 lg:w-1/2 bg-white p-4 rounded-lg shadow-lg flex flex-col gap-3 cursor-pointer"
          onClick={() => setLocationPanel(1)}
        >
          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
            <FaMapMarkerAlt className="text-gray-500" />
            <input
              type="text"
              placeholder="Add a pick-up location"
              className="w-full bg-transparent outline-none"
              value={pick}
              onChange={(e) => setPick(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
            <FaLocationArrow className="text-gray-500" />
            <input
              type="text"
              placeholder="Enter your destination"
              className="w-full bg-transparent outline-none"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* SLIDING PANEL */}
      <div
        ref={panelRef}
        className={`absolute bottom-0 left-0 w-full h-2/3 bg-gray-200 shadow-xl rounded-t-2xl p-6 transition-transform duration-500 ease-in-out ${
          locationPanel ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        {/* CLOSE ICON */}
        <FaTimes
          className="absolute top-4 right-6 text-2xl text-gray-500 cursor-pointer"
          onClick={() => setLocationPanel(0)}
        />

        {/* PULLED-UP INPUT SECTION */}
        <div className="mt-8 w-[80%] mx-auto flex flex-col gap-3">
          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
            <FaMapMarkerAlt className="text-gray-500" />
            <input
              type="text"
              placeholder="Add a pick-up location"
              className="w-full bg-transparent outline-none"
            />
          </div>
          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
            <FaLocationArrow className="text-gray-500" />
            <input
              type="text"
              placeholder="Enter your destination"
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        {/* OTHER COMPONENTS */}
        <div className="mt-10 text-gray-500 text-center">
          <LocationSearchPanel vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} />
        </div>
        <div className="mt-10 text-gray-500 text-center">
          <RidePanel ref={vehiclePanelRef} isVisible={vehiclePanel} />
        </div>
      </div>
    </div>
  );
};

export default Home;