import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const LocationSearchPanel = (props) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Dummy locations
  const locations = [
    "Central Park, NYC",
    "Times Square, NYC",
    "Empire State Building",
    "Brooklyn Bridge",
    "Statue of Liberty",
  ];
  // Location selection callback
  const handleLocationSelect = (index) => {
    setSelectedLocation(index)
  };
  const handleVehiclePanel=()=>{
    props.setVehiclePanel(true)
  }
  // Render the location search panel

  return (
    
    <div className="mt-4 w-[75%] mx-auto"> {/* 70% width & centered */}
      {/* Heading */}
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Select Location</h2>

      {/* Location List */}
      <div className="flex flex-col gap-2">
        {locations.map((location, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-3 px-4 rounded-lg cursor-pointer transition  ${
              selectedLocation === index ? "bg-gray-200" : "bg-gray-100"
            } hover:bg-gray-200`}
            onClick={()=>{
                handleLocationSelect(index)
                handleVehiclePanel()
  
            }}
          >
            <FaMapMarkerAlt className="text-gray-500" />
            <span className="text-gray-700">{location}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSearchPanel;