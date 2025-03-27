import React, { useState, useRef, useEffect, use } from "react";
import { gsap } from "gsap";
import { FaTimes } from "react-icons/fa"; // Close icon
import { FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa"; // Icons for input
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pick, setPick]=useState(null)
  const [drop, setDrop]=useState(null)
  const [isPanelOpen, setIsPanelOpen] = useState(0);
  const panelRef = useRef(null);

  useEffect(() => {
    if (isPanelOpen) {
      gsap.to(panelRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
    } else {
      gsap.to(panelRef.current, { y: "100%", opacity: 0, duration: 0.5, ease: "power2.in" });
    }
  }, [isPanelOpen]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* LOGO */}
      <div className="absolute top-4 right-4">
        <img src="https://www.citypng.com/public/uploads/preview/uber-text-word-logo-image-png-701751694707226btedlq6lg3.png" alt="Logo" className="w-16 h-16" />
      </div>

      {/* BACKGROUND CONTAINER */}
      <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/your-background.jpg')" }}>
        {/* INPUT SECTION */}
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-11/12 md:w-2/3 lg:w-1/2 bg-white p-4 rounded-lg shadow-lg flex flex-col gap-3 cursor-pointer"
          onClick={() => setIsPanelOpen(1)}
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
        className="absolute bottom-0 left-0 w-full h-2/3 bg-white shadow-xl rounded-t-2xl p-6 transform translate-y-full opacity-0"
      >
        {/* CLOSE ICON */}
        <FaTimes className="absolute top-4 right-6 text-2xl text-gray-500 cursor-pointer" onClick={() => setIsPanelOpen(0)} />

        {/* PULLED-UP INPUT SECTION */}
        <div className="mt-8 flex flex-col gap-3">
          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
            <FaMapMarkerAlt className="text-gray-500" />
            <input type="text" 
            placeholder="Add a pick-up location" 
            className="w-full bg-transparent outline-none" 
            />
          </div>
          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
            <FaLocationArrow className="text-gray-500" />
            <input type="text" placeholder="Enter your destination" className="w-full bg-transparent outline-none" />
          </div>
        </div>

        {/* OTHER COMPONENTS CAN GO HERE */}
        <div className="mt-6 text-gray-500 text-center">
          <LocationSearchPanel/>
        </div>
      </div>
    </div>
  );
};

export default Home;