import React, { useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { useJobPostingStore } from "../../store/jobPostingStore";

import MultiCategoryInput from "./category/MultiCategoryInput";

// 지도의 초기 위치 (예: 시드니)
const defaultCenter = { lat: -33.8688, lng: 151.2093 };

// 미리 정의한 카테고리 목록 (MVP용)
const regionCategories = [
  "Sydney CBD",
  "Inner West",
  "Eastern Suburbs",
  "Northern Beaches",
  "Sutherland Shire",
];

// Extra region options (영어로 적절하게)
const extraRegionOptions = ["Any Region", "All Regions", "None"];

const subwayCategories = ["Town Hall", "Central", "Wynyard", "Circular Quay", "Martin Place"];

const schoolCategories = [
  "Sydney Grammar School",
  "North Sydney Boys High",
  "Pymble Ladies' College",
  "St. Andrew's Cathedral School",
];

export default function MyMapPage() {
  // LoadScript는 부모(예: MapLayout 또는 MainLayout)에서 호출된다고 가정
  return <MapWithAutocomplete />;
}

function MapWithAutocomplete() {
  const { formData, setFormData } = useJobPostingStore();
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [addressDetail, setAddressDetail] = useState("");

  // 임시 상태 (다중 선택 입력 전용)
  const [tempRegion, setTempRegion] = useState("");
  const [tempSubway, setTempSubway] = useState("");
  const [tempSchool, setTempSchool] = useState("");

  // usePlacesAutocomplete (주소 검색용)
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: "AU" } },
    debounce: 300,
  });

  // 주소 선택 시 (Google Places)
  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      // 주소 컴포넌트에서 도시 및 주 정보 추출
      let city = "";
      let state = "";
      const addressComponents = results[0].address_components;
      addressComponents.forEach((comp) => {
        if (comp.types.includes("locality")) {
          city = comp.long_name; // 예: "Burwood"
        }
        if (comp.types.includes("administrative_area_level_1")) {
          state = comp.short_name; // 예: "NSW"
        }
      });

      // 예: "Burwood NSW" (둘 중 하나만 있으면 그것만 표시)
      const locationString = [city, state].filter(Boolean).join(" ");

      // store에 업데이트
      setFormData({
        // 사용자가 검색/선택한 전체 주소
        workAddress: address,
        // 위/경도 좌표
        locationCoords: `${lat},${lng}`,
        // 새로 만든 필드: 간단 표기를 위한 location
        location: locationString,
      });

      // 지도 상태 업데이트
      setMapCenter({ lat, lng });
    } catch (error) {
      console.error("Error getting geocode:", error);
    }
  };

  // 주소 검색 입력 변경
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // 추가 주소 세부사항 입력 변경
  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const detail = e.target.value;
    setAddressDetail(detail);
    setFormData({ addressDetail: detail });
  };

  // 회사 정보 관련 핸들러
  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ companyName: e.target.value });
  };

  const handleCompanyLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ companyLogo: file });
    }
  };

  // Exposure Regions (다중 선택) 관련 핸들러
  const regionOptions = [...regionCategories, ...extraRegionOptions];
  const filteredRegionSuggestions = regionOptions.filter((region) =>
    region.toLowerCase().includes(tempRegion.toLowerCase())
  );

  const handleSelectRegion = (region: string) => {
    if (!formData.exposureRegions || !formData.exposureRegions.includes(region)) {
      setFormData({ exposureRegions: [...(formData.exposureRegions || []), region] });
    }
    setTempRegion("");
  };

  const handleRemoveRegion = (region: string) => {
    setFormData({
      exposureRegions: (formData.exposureRegions || []).filter((r: string) => r !== region),
    });
  };

  // Nearby Subways (다중 선택) 관련 핸들러
  const filteredSubwaySuggestions = subwayCategories.filter((station) =>
    station.toLowerCase().includes(tempSubway.toLowerCase())
  );

  const handleSelectSubway = (station: string) => {
    if (!formData.nearbySubways || !formData.nearbySubways.includes(station)) {
      setFormData({ nearbySubways: [...(formData.nearbySubways || []), station] });
    }
    setTempSubway("");
  };

  const handleRemoveSubway = (station: string) => {
    setFormData({
      nearbySubways: (formData.nearbySubways || []).filter((s: string) => s !== station),
    });
  };

  // Nearby Schools (다중 선택) 관련 핸들러
  const filteredSchoolSuggestions = schoolCategories.filter((school) =>
    school.toLowerCase().includes(tempSchool.toLowerCase())
  );

  const handleSelectSchool = (school: string) => {
    if (!formData.nearbySchools || !formData.nearbySchools.includes(school)) {
      setFormData({ nearbySchools: [...(formData.nearbySchools || []), school] });
    }
    setTempSchool("");
  };

  const handleRemoveSchool = (school: string) => {
    setFormData({
      nearbySchools: (formData.nearbySchools || []).filter((s: string) => s !== school),
    });
  };

  return (
    <div className='flex flex-col gap-6 p-4'>
      {/* 회사 정보 섹션 */}
      <div className='space-y-4'>
        <div className='bg-gray-100 p-4 rounded-lg'>
          <h2 className='text-xl font-bold text-blue-600'>Company Information</h2>
          <p className='text-gray-600 text-sm mt-1'>Who’s your ideal Part-time Mate?</p>
        </div>

        {/* 회사 이름 */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Company Name</label>
          <input
            type='text'
            value={formData.companyName || ""}
            onChange={handleCompanyNameChange}
            placeholder='Enter company name'
            className='w-full p-2 border border-gray-300 rounded-md'
          />
        </div>

        {/* 회사 로고 */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Company Logo</label>
          <input
            type='file'
            accept='image/*'
            onChange={handleCompanyLogoChange}
            className='w-full'
          />
          {formData.companyLogo && typeof formData.companyLogo !== "string" && (
            <p className='text-sm text-gray-600 mt-1'>Selected file: {formData.companyLogo.name}</p>
          )}
        </div>

        {/* 주소 및 지도 섹션 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-700'>Work Address</h3>
          {/* 주소 검색 인풋 */}
          <div className='w-full'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Search Address</label>
            <input
              type='text'
              value={formData.workAddress || value}
              onChange={handleInputChange}
              disabled={!ready}
              placeholder='Type an address...'
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {status === "OK" && (
              <ul className='mt-1 border border-gray-300 rounded-md bg-white shadow-md max-h-60 overflow-y-auto'>
                {data.map(({ place_id, description }) => (
                  <li
                    key={place_id}
                    onClick={() => handleSelect(description)}
                    className='p-2 cursor-pointer hover:bg-gray-100 border-b last:border-0'>
                    {description}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 추가 주소 세부사항 인풋 */}
          <div className='w-full'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Additional Address Details
            </label>
            <input
              type='text'
              value={formData.addressDetail || addressDetail}
              onChange={handleDetailChange}
              placeholder='Building, floor, suite number, etc.'
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* 지도 영역 */}
          <div className='w-full md:w-[600px] h-96'>
            <GoogleMap
              center={mapCenter}
              zoom={14}
              mapContainerClassName='w-full h-full rounded-md border'>
              <MarkerF position={mapCenter} />
            </GoogleMap>
          </div>
        </div>

        {/* Exposure Regions (다중 선택) */}
        <MultiCategoryInput
          label='Exposure Regions'
          tempValue={tempRegion}
          addedItems={formData.exposureRegions || []}
          placeholder='Enter a region'
          suggestions={filteredRegionSuggestions}
          onTempChange={(e) => setTempRegion(e.target.value)}
          onSelectSuggestion={handleSelectRegion}
          onRemoveItem={handleRemoveRegion}
        />

        {/* Nearby Subways (다중 선택) */}
        <MultiCategoryInput
          label='Nearby Subways'
          tempValue={tempSubway}
          addedItems={formData.nearbySubways || []}
          placeholder='Enter a subway station'
          suggestions={filteredSubwaySuggestions}
          onTempChange={(e) => setTempSubway(e.target.value)}
          onSelectSuggestion={handleSelectSubway}
          onRemoveItem={handleRemoveSubway}
        />

        {/* Nearby Schools (다중 선택) */}
        <MultiCategoryInput
          label='Nearby Schools'
          tempValue={tempSchool}
          addedItems={formData.nearbySchools || []}
          placeholder='Enter a school name'
          suggestions={filteredSchoolSuggestions}
          onTempChange={(e) => setTempSchool(e.target.value)}
          onSelectSuggestion={handleSelectSchool}
          onRemoveItem={handleRemoveSchool}
        />
      </div>
    </div>
  );
}
