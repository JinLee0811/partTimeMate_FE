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
  const { setFormData } = useJobPostingStore(); // global state에서 setFormData 사용
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [addressDetail, setAddressDetail] = useState("");

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

  // 주소 검색 자동완성에서 주소 선택 시, global state도 업데이트
  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      // 지도 상태 업데이트
      setMapCenter({ lat, lng });

      // ✅ setFormData에 '객체'를 직접 전달
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

    // ✅ setFormData에 '객체'를 직접 전달
    setFormData({
      addressDetail: detail,
    });
  };

  return (
    <div className='flex flex-col gap-6 p-4'>
      {/* 상단 인풋 영역 */}
      <div className='space-y-4'>
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
  );
}
