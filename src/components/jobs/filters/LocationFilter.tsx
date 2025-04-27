import { useState, useEffect } from "react";
import { locations } from "../../../Mockdata/locations";
import { FaCheck } from "react-icons/fa";

interface LocationFilterProps {
  selectedLocations: string[];
  setSelectedLocations: (locations: string[]) => void;
  searchQuery: string;
  searchActive: boolean;
  canAddMoreFilters: boolean;
}

export default function LocationFilter({
  selectedLocations,
  setSelectedLocations,
  searchQuery,
  searchActive,
  canAddMoreFilters,
}: LocationFilterProps) {
  const [activeRegion, setActiveRegion] = useState<string>(locations[0]?.id || "sydney");
  const [activeSubRegion, setActiveSubRegion] = useState<string | null>(
    locations.find((region) => region.id === activeRegion)?.subcategories[0]?.id || null
  );

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

  // URL에서 선택된 지역이 있는지 확인하고 해당 지역의 "All" 항목을 선택
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const locationParam = urlParams.get("location");

    if (locationParam) {
      const formattedLocation = locationParam
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // 해당 지역 찾기
      const region = locations.find(
        (region) => region.name.toLowerCase() === formattedLocation.toLowerCase()
      );

      if (region) {
        setActiveRegion(region.id);
        // 중분류 "All" 항목 선택
        setActiveSubRegion("all");

        // 해당 지역의 "All" 항목 선택
        const allLocationName = `${region.name} - All`;
        if (!selectedLocations.includes(allLocationName)) {
          setSelectedLocations([allLocationName]);
        }
      }
    }
  }, []);

  const handleSelectLocation = (location: string) => {
    // 이미 선택된 지역인 경우 제거
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter((l) => l !== location));
      return;
    }

    // 필터 제한에 도달한 경우 추가하지 않음
    if (!canAddMoreFilters) {
      return;
    }

    // 새로운 지역 추가
    setSelectedLocations([...selectedLocations, location]);
  };

  // 검색어를 기반으로 필터링된 지역 목록을 생성
  // 모든 지역에서 검색
  const filteredAreas = locations.flatMap((region) =>
    region.subcategories.flatMap((sub) =>
      sub.areas.filter(
        (area) =>
          area.toLowerCase().includes(searchQuery.toLowerCase()) ||
          area.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    )
  );

  // 검색 결과가 있을 때 해당 지역을 활성화
  useEffect(() => {
    if (searchActive && searchQuery && filteredAreas.length > 0) {
      // 검색 결과가 있는 첫 번째 지역을 찾음
      for (const region of locations) {
        for (const sub of region.subcategories) {
          if (
            sub.areas.some(
              (area) =>
                area.toLowerCase().includes(searchQuery.toLowerCase()) ||
                area.toLowerCase().startsWith(searchQuery.toLowerCase())
            )
          ) {
            setActiveRegion(region.id);
            setActiveSubRegion(sub.id);
            return;
          }
        }
      }
    }
  }, [searchActive, searchQuery, filteredAreas]);

  return (
    <div className='border border-gray-200 rounded-md p-4 bg-white'>
      {searchActive && searchQuery ? (
        // 검색어가 있고 검색이 활성화되었을 때는 필터링된 지역명만 표시
        <div className='max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
          {filteredAreas.length > 0 ? (
            filteredAreas.map((area) => {
              const isSelected = selectedLocations.includes(area);
              return (
                <div
                  key={area}
                  className={`cursor-pointer flex justify-between items-center p-2 transition 
                    ${isSelected ? "text-orange-500 font-semibold" : "text-gray-700"} 
                    hover:bg-gray-100
                    ${!isSelected && !canAddMoreFilters ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => handleSelectLocation(area)}>
                  <span>{area}</span>
                  {isSelected && <FaCheck className='text-orange-500 ml-1' />}
                </div>
              );
            })
          ) : (
            <div className='text-gray-500 text-center py-4'>검색 결과가 없습니다.</div>
          )}
        </div>
      ) : (
        // 검색어가 없거나 검색이 활성화되지 않았을 때는 기존 레이아웃 표시
        <div className='grid grid-cols-3 gap-4'>
          {/* Left Panel: Regions */}
          <div className='border-r pr-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
            {locations.map((region) => (
              <div
                key={region.id}
                className={`cursor-pointer p-2 transition ${
                  activeRegion === region.id
                    ? "bg-orange-50 text-orange-600 font-semibold"
                    : "text-gray-700 hover:text-orange-500"
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

          {/* Middle Panel: Subregions */}
          <div className='border-r pr-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
            {activeRegion && (
              <>
                {/* All 항목 추가 */}
                <div
                  className={`cursor-pointer p-2 transition ${
                    activeSubRegion === "all"
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                  onClick={() => {
                    setActiveSubRegion("all");
                    const region = locations.find((r) => r.id === activeRegion);
                    if (region) {
                      const allLocationName = `${region.name} - All`;
                      if (!selectedLocations.includes(allLocationName)) {
                        setSelectedLocations([allLocationName]);
                      }
                    }
                  }}>
                  All
                </div>
                {/* 기존 서브카테고리 */}
                {locations
                  .find((region) => region.id === activeRegion)
                  ?.subcategories.map((sub) => (
                    <div
                      key={sub.id}
                      className={`cursor-pointer p-2 transition ${
                        activeSubRegion === sub.id
                          ? "bg-orange-50 text-orange-600 font-semibold"
                          : "text-gray-700 hover:text-orange-500"
                      }`}
                      onClick={() => setActiveSubRegion(sub.id)}>
                      {sub.name}
                    </div>
                  ))}
              </>
            )}
          </div>

          {/* Right Panel: Areas */}
          <div className='max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
            {activeSubRegion === "all"
              ? // All이 선택된 경우 해당 지역의 모든 지역 표시
                activeRegion &&
                locations
                  .find((region) => region.id === activeRegion)
                  ?.subcategories.flatMap((sub) =>
                    sub.areas.map((area) => {
                      const isSelected = selectedLocations.includes(area);
                      return (
                        <div
                          key={area}
                          className={`cursor-pointer flex justify-between items-center p-2 transition 
                            ${isSelected ? "text-orange-500 font-semibold" : "text-gray-700"} 
                            hover:text-orange-500
                            ${!isSelected && !canAddMoreFilters ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={() => handleSelectLocation(area)}>
                          <span>{area}</span>
                          {isSelected && <FaCheck className='text-orange-500 ml-1' />}
                        </div>
                      );
                    })
                  )
              : // 특정 서브카테고리가 선택된 경우
                activeSubRegion &&
                locations
                  .find((region) => region.id === activeRegion)
                  ?.subcategories.find((sub) => sub.id === activeSubRegion)
                  ?.areas.map((area) => {
                    const isSelected = selectedLocations.includes(area);
                    return (
                      <div
                        key={area}
                        className={`cursor-pointer flex justify-between items-center p-2 transition 
                          ${isSelected ? "text-orange-500 font-semibold" : "text-gray-700"} 
                          hover:text-orange-500
                          ${!isSelected && !canAddMoreFilters ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => handleSelectLocation(area)}>
                        <span>{area}</span>
                        {isSelected && <FaCheck className='text-orange-500 ml-1' />}
                      </div>
                    );
                  })}
          </div>
        </div>
      )}
    </div>
  );
}
