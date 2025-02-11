import { useState, useEffect } from "react";
import { locations } from "../../../data/locations";
import { FaCheck } from "react-icons/fa";

interface LocationFilterProps {
  selectedLocations: string[];
  setSelectedLocations: (locations: string[]) => void;
}

export default function LocationFilter({
  selectedLocations,
  setSelectedLocations,
}: LocationFilterProps) {
  const [activeRegion, setActiveRegion] = useState<string>(locations[0]?.id || "sydney");
  const [activeSubRegion, setActiveSubRegion] = useState<string | null>(
    locations.find((region) => region.id === activeRegion)?.subcategories[0]?.id || null
  );

  // ✅ 기본 선택값 적용 (첫 번째 대분류 및 소분류 자동 선택)
  useEffect(() => {
    if (!activeRegion) {
      setActiveRegion(locations[0]?.id || "sydney");
    }
    if (!activeSubRegion) {
      setActiveSubRegion(
        locations.find((region) => region.id === activeRegion)?.subcategories[0]?.id || null
      );
    }
  }, [activeRegion, activeSubRegion]);

  const handleSelectLocation = (location: string) => {
    setSelectedLocations(
      selectedLocations.includes(location)
        ? selectedLocations.filter((l) => l !== location)
        : [...selectedLocations, location]
    );
  };

  return (
    <div className='border rounded-md p-4 bg-white'>
      <div className='grid grid-cols-3 gap-4'>
        {/* 🏙️ 대분류 (시/구) */}
        <div className='border-r pr-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
          {locations.map((region) => (
            <div
              key={region.id}
              className={`cursor-pointer p-2 transition ${
                activeRegion === region.id
                  ? "text-red-500 font-bold bg-gray-100 rounded"
                  : "text-gray-800"
              }`}
              onClick={() => {
                setActiveRegion(region.id);
                setActiveSubRegion(
                  locations.find((r) => r.id === region.id)?.subcategories[0]?.id || null
                );
              }}>
              {region.name}
            </div>
          ))}
        </div>

        {/* 🏘️ 중분류 (군/면) */}
        <div className='border-r pr-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
          {activeRegion &&
            locations
              .find((region) => region.id === activeRegion)
              ?.subcategories.map((sub) => (
                <div
                  key={sub.id}
                  className={`cursor-pointer p-2 transition ${
                    activeSubRegion === sub.id
                      ? "text-red-500 font-bold bg-gray-100 rounded"
                      : "text-gray-800"
                  }`}
                  onClick={() => setActiveSubRegion(sub.id)}>
                  {sub.name}
                </div>
              ))}
        </div>

        {/* 📍 소분류 (동/지역) */}
        <div className='max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
          {activeSubRegion &&
            locations
              .find((region) => region.id === activeRegion)
              ?.subcategories.find((sub) => sub.id === activeSubRegion)
              ?.areas.map((area) => (
                <div
                  key={area}
                  className={`cursor-pointer flex justify-between items-center p-2 transition ${
                    selectedLocations.includes(area) ? "text-blue-600 font-bold" : "text-gray-800"
                  }`}
                  onClick={() => handleSelectLocation(area)}>
                  {area}
                  {selectedLocations.includes(area) && <FaCheck className='text-blue-600' />}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
