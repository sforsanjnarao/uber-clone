import React, { useState, forwardRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Toggle icons

const fakeTrips = [
  {
    id: 1,
    image: "https://img.icons8.com/ios-filled/100/taxi.png",
    destination: "Downtown Street",
    cost: "$12.50",
  },
  {
    id: 2,
    image: "https://img.icons8.com/ios-filled/100/car.png",
    destination: "Central Park",
    cost: "$18.75",
  },
  {
    id: 3,
    image: "https://img.icons8.com/ios-filled/100/motorcycle.png",
    destination: "City Mall",
    cost: "$9.00",
  },
];

const RidePanel = forwardRef(({isVisible},ref) => { //forwardRef only take 2 parameters
    const [isExpanded, setIsExpanded] = useState(1); // Start as expanded

  return (
    <div ref={ref} className={`relative bg-white p-4 rounded-2xl shadow-lg transition-transform duration-500
     ${isVisible ? 'translate-y-0 opacity-100':'translate-y-full opacity-0'}`}>
      {/* Close/Pull Toggle Icon */}
      <div
        className="absolute top-2 right-6 text-2xl text-gray-500 cursor-pointer"
        onClick={() => setIsExpanded(prev =>!prev)}
      >
        {isExpanded ? <FaChevronDown /> : <FaChevronUp />}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 text-center mb-3">
        Choose Your Ride 🚗💨
      </h3>

      {/* Scrollable Trip List */}
      {isExpanded && (
        <div className="max-h-60 overflow-y-scroll no-scrollbar">
        {fakeTrips.map((trip) => (
          <div
            key={trip.id}
            className="flex items-center justify-between p-3 border-b border-gray-200"
          >
            {/* Left Side: Vehicle Image + Destination */}
            <div className="flex items-center gap-4">
              <img src={trip.image} alt="vehicle" className="w-12 h-12" />
              <p className="text-gray-700 font-medium">{trip.destination}</p>
            </div>

            {/* Right Side: Cost */}
            <p className="text-gray-800 font-semibold">{trip.cost}</p>
          </div>
        ))}
      </div>
      )}
    </div>
  );
});

export default RidePanel;