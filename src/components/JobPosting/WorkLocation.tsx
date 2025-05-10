import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
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

interface WorkLocationProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  placeId: string;
}

const WorkLocation: React.FC<WorkLocationProps> = ({ coordinates, placeId }) => {
  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={coordinates}
      zoom={15}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
      }}>
      <MarkerF position={coordinates} />
    </GoogleMap>
  );
};

export default WorkLocation;
