import React, { useState, useEffect } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { useJobPostingStore } from "../../store/jobPostingStore";
import { useCompanyStore } from "../../store/useCompanyStore";
import axios from "axios";

import MultiCategoryInput from "./category/MultiCategoryInput";

// 지도의 초기 위치 (예: 시드니)
const defaultCenter = { lat: -33.8688, lng: 151.2093 };

// Google Maps API 설정
const libraries = ["places"];

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

// Company 인터페이스 정의
interface Company {
  id: number;
  name: string;
  logoUrl?: string;
  description?: string;
}

export default function MyMapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries as any,
    language: "en",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapWithAutocomplete />;
}

function MapWithAutocomplete() {
  const { formData, setFormData } = useJobPostingStore();
  const {
    companies,
    loading: companiesLoading,
    error: companiesError,
    fetchCompanies,
  } = useCompanyStore();

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [addressDetail, setAddressDetail] = useState("");
  const [showCompanySelector, setShowCompanySelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
    requestOptions: {
      componentRestrictions: { country: "AU" },
      language: "en",
    },
    debounce: 300,
  });

  // 회사 목록 가져오기
  useEffect(() => {
    if (showCompanySelector) {
      fetchCompanies();
    }
  }, [showCompanySelector, fetchCompanies]);

  // 회사 검색 필터링
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  // 회사 선택 핸들러
  const handleCompanySelect = (company: any) => {
    setFormData({
      companyName: company.name,
      companyLogo: company.logoUrl || null,
      companyId: company.id.toString(),
    });
    setShowCompanySelector(false);
  };

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
          <p className='text-gray-600 text-sm mt-1'>Who's your ideal Part-time Mate?</p>
        </div>

        {/* 기존 회사 선택 버튼 */}
        <div className='mb-4'>
          <button
            onClick={() => setShowCompanySelector(!showCompanySelector)}
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
            {showCompanySelector ? "Register New Company" : "Select Existing Company"}
          </button>
        </div>

        {/* 회사 선택 모달 */}
        {showCompanySelector && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg w-full max-w-2xl'>
              <h3 className='text-lg font-semibold mb-4'>Select Company</h3>
              <input
                type='text'
                placeholder='Search by company name...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full p-2 border rounded-md mb-4'
              />
              <div className='max-h-96 overflow-y-auto'>
                {companiesLoading ? (
                  <div className='text-center py-4'>Loading...</div>
                ) : companiesError ? (
                  <div className='text-center py-4 text-red-600'>{companiesError}</div>
                ) : filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <div
                      key={company.id}
                      onClick={() => handleCompanySelect(company)}
                      className='flex items-center p-3 border-b hover:bg-gray-50 cursor-pointer'>
                      {company.logoUrl && (
                        <img
                          src={company.logoUrl}
                          alt={company.name}
                          className='w-12 h-12 object-contain mr-4'
                        />
                      )}
                      <div>
                        <h4 className='font-medium'>{company.name}</h4>
                        <p className='text-sm text-gray-600'>CEO: {company.ceoName}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center py-4'>No results found</div>
                )}
              </div>
              <div className='mt-4 flex justify-end'>
                <button
                  onClick={() => setShowCompanySelector(false)}
                  className='px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300'>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 회사 정보 입력 폼 (회사를 선택하지 않았을 때만 표시) */}
        {!formData.companyId && !showCompanySelector && (
          <>
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
                <p className='text-sm text-gray-600 mt-1'>
                  Selected file: {(formData.companyLogo as File).name}
                </p>
              )}
            </div>
          </>
        )}

        {/* 선택된 회사 정보 미리보기 */}
        {formData.companyId && (
          <div className='mt-4 p-4 border rounded-lg bg-gray-50'>
            <h3 className='text-lg font-semibold mb-2'>Selected Company Information</h3>
            <div className='flex items-center gap-4'>
              {formData.companyLogo && (
                <img
                  src={
                    typeof formData.companyLogo === "string"
                      ? formData.companyLogo
                      : URL.createObjectURL(formData.companyLogo as File)
                  }
                  alt={formData.companyName}
                  className='w-16 h-16 object-contain'
                />
              )}
              <div>
                <p className='font-medium'>{formData.companyName}</p>
                <p className='text-sm text-gray-600'>Company ID: {formData.companyId}</p>
              </div>
              <button
                onClick={() => {
                  setFormData({
                    companyName: "",
                    companyLogo: null,
                    companyId: undefined,
                  });
                }}
                className='ml-auto text-red-600 hover:text-red-800'>
                Cancel
              </button>
            </div>
          </div>
        )}

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
