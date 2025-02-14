// WorkLocation.tsx
import { useState } from "react";
import { GoogleMapWrapper } from "../map/GoogleMapWrapper";
import { AddressAutocomplete } from "./AddressAutocomplete";

interface WorkLocationProps {
  formData: {
    workAddress?: string;
    addressDetail?: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function WorkLocation({ formData, setFormData }: WorkLocationProps) {
  const [coordinates, setCoordinates] = useState({ lat: -33.8688, lng: 151.2093 });
  const [address, setAddress] = useState(formData.workAddress || "");
  const [addressDetail, setAddressDetail] = useState(formData.addressDetail || "");
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  const handleAddressSelect = (selectedAddress: string, coords: { lat: number; lng: number }) => {
    setAddress(selectedAddress);
    setCoordinates(coords);

    // 지도 중심 이동
    if (mapRef) {
      mapRef.panTo(coords);
    }

    setFormData((prev: any) => ({
      ...prev,
      workAddress: selectedAddress,
      coordinates: coords,
    }));
  };

  return (
    <div>
      {/* 주소 입력 및 자동완성 */}
      <label className='text-gray-800 text-sm mb-2 block'>Work Address *</label>
      <AddressAutocomplete initialValue={address} onSelect={handleAddressSelect} />

      {/* 상세 주소 입력 */}
      <div className='mt-4'>
        <label className='text-gray-800 text-sm mb-2 block'>
          Additional Address Details (Optional)
        </label>
        <input
          type='text'
          value={addressDetail}
          onChange={(e) => {
            setAddressDetail(e.target.value);
            setFormData((prev: any) => ({
              ...prev,
              addressDetail: e.target.value,
            }));
          }}
          placeholder='Building name, floor, suite number, etc.'
          className='w-full p-2 border border-gray-300 rounded-md'
        />
      </div>

      {/* 지도 표시 */}
      <div className='mt-4'>
        <label className='text-gray-800 text-sm mb-2 block'>Selected Location on Map</label>
        <GoogleMapWrapper coordinates={coordinates} onLoad={(map) => setMapRef(map)} />
      </div>
    </div>
  );
}
