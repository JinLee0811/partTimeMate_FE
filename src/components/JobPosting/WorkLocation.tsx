import React, { useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { useJobPostingStore } from "../../store/jobPostingStore";

// 지도의 초기 위치 (예: 시드니)
const defaultCenter = { lat: -33.8688, lng: 151.2093 };

export default function MyMapPage() {
  // LoadScript는 부모(예: MapLayout 또는 MainLayout)에서 이미 호출되었다고 가정
  return <MapWithAutocomplete />;
}

function MapWithAutocomplete() {
  const { formData, setFormData } = useJobPostingStore(); // global state
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [addressDetail, setAddressDetail] = useState("");

  // 회사 정보 로컬 스테이트 대신, 직접 store에 setFormData를 호출할 수도 있음
  // 여기서는 편의상 아래처럼 "추가/입력" 임시 값만 로컬에서 관리
  const [tempSubway, setTempSubway] = useState("");
  const [tempSchool, setTempSchool] = useState("");

  // usePlacesAutocomplete 설정
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

  // 주소 자동완성에서 주소 선택 시
  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      // 지도 상태 업데이트
      setMapCenter({ lat, lng });

      // store에 업데이트
      setFormData({
        workAddress: address,
        locationCoords: `${lat},${lng}`,
      });
    } catch (error) {
      console.error("Error getting geocode:", error);
    }
  };

  // 주소 검색 인풋 onChange 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // 추가 주소 인풋 onChange 핸들러
  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const detail = e.target.value;
    setAddressDetail(detail);

    setFormData({
      addressDetail: detail,
    });
  };

  // ---------------------------------------------------
  //  회사 정보 관련 핸들러
  // ---------------------------------------------------

  // 회사 이름
  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ companyName: e.target.value });
  };

  // 회사 로고(파일 업로드)
  const handleCompanyLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // store에 파일 객체 저장
      setFormData({ companyLogo: file });
    }
  };

  // 공고 노출 지역
  const handleExposureRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ exposureRegion: e.target.value });
  };

  // 주변 지하철 추가
  const handleAddSubway = () => {
    const trimmed = tempSubway.trim();
    if (!trimmed) return;

    setFormData({
      nearbySubways: [...(formData.nearbySubways || []), trimmed],
    });
    setTempSubway("");
  };

  // 주변 학교 추가
  const handleAddSchool = () => {
    const trimmed = tempSchool.trim();
    if (!trimmed) return;

    setFormData({
      nearbySchools: [...(formData.nearbySchools || []), trimmed],
    });
    setTempSchool("");
  };

  // ---------------------------------------------------
  //  렌더
  // ---------------------------------------------------
  return (
    <div className='flex flex-col gap-6 p-4'>
      <div className='space-y-4'>
        {/* ✅ 상단 섹션 제목 및 설명 */}
        <div className='bg-gray-100 p-4 rounded-lg'>
          <h2 className='text-xl font-bold text-blue-600'>Company Infomation</h2>
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
          {/* 간단히 파일 이름만 표시 (선택했다면) */}
          {formData.companyLogo && typeof formData.companyLogo !== "string" && (
            <p className='text-sm text-gray-600 mt-1'>Selected file: {formData.companyLogo.name}</p>
          )}
        </div>

        {/* 공고 노출 지역 */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Exposure Region</label>
          <input
            type='text'
            value={formData.exposureRegion || ""}
            onChange={handleExposureRegionChange}
            placeholder='e.g., Seoul, Busan...'
            className='w-full p-2 border border-gray-300 rounded-md'
          />
        </div>

        {/* 주변 지하철 */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Nearby Subways</label>
          <div className='flex gap-2'>
            <input
              type='text'
              value={tempSubway}
              onChange={(e) => setTempSubway(e.target.value)}
              placeholder='Enter a subway station'
              className='p-2 border border-gray-300 rounded-md flex-1'
            />
            <button
              onClick={handleAddSubway}
              className='px-4 py-2 bg-blue-500 text-white rounded-md'>
              Add
            </button>
          </div>
          {/* 현재까지 추가된 지하철 목록 표시 */}
          {formData.nearbySubways && formData.nearbySubways.length > 0 && (
            <ul className='mt-2 space-y-1'>
              {formData.nearbySubways.map((station: string, idx: number) => (
                <li key={idx} className='text-sm text-gray-700'>
                  - {station}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 주변 학교 */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Nearby Schools</label>
          <div className='flex gap-2'>
            <input
              type='text'
              value={tempSchool}
              onChange={(e) => setTempSchool(e.target.value)}
              placeholder='Enter a school name'
              className='p-2 border border-gray-300 rounded-md flex-1'
            />
            <button
              onClick={handleAddSchool}
              className='px-4 py-2 bg-blue-500 text-white rounded-md'>
              Add
            </button>
          </div>
          {/* 현재까지 추가된 학교 목록 표시 */}
          {formData.nearbySchools && formData.nearbySchools.length > 0 && (
            <ul className='mt-2 space-y-1'>
              {formData.nearbySchools.map((school: string, idx: number) => (
                <li key={idx} className='text-sm text-gray-700'>
                  - {school}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ===================== 주소/지도 섹션 ===================== */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-gray-700'>Work Address</h3>
        {/* 주소 검색 인풋 */}
        <div className='w-full'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Search Address</label>
          <input
            type='text'
            value={value}
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

        {/* 추가 주소 입력 인풋 */}
        <div className='w-full'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Additional Address Details
          </label>
          <input
            type='text'
            value={addressDetail}
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
    </div>
  );
}
