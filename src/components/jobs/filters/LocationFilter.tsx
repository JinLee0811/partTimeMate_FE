import React, { useState } from "react";

const states = ["Sydney", "Melbourne", "Brisbane", "Adelaide", "Perth"];
const cityMap: { [key: string]: string[] } = {
  Sydney: ["CBD", "Parramatta", "Chatswood", "Blacktown"],
  Melbourne: ["CBD", "Docklands", "Fitzroy", "Richmond"],
  Brisbane: ["CBD", "South Brisbane", "Fortitude Valley"],
  Adelaide: ["CBD", "North Adelaide"],
  Perth: ["CBD", "Fremantle"],
};

const LocationFilter: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>("Sydney");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  return (
    <div className='flex'>
      {/* 주/도 선택 */}
      <div className='w-1/3 border-r p-2'>
        {states.map((state) => (
          <div
            key={state}
            className={`p-2 cursor-pointer ${selectedState === state ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedState(state)}>
            {state}
          </div>
        ))}
      </div>

      {/* 도시 선택 */}
      <div className='w-2/3 p-2'>
        {cityMap[selectedState].map((city) => (
          <div
            key={city}
            className={`p-2 cursor-pointer ${selectedCities.includes(city) ? "bg-blue-200" : ""}`}
            onClick={() => toggleCity(city)}>
            {city}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationFilter;
