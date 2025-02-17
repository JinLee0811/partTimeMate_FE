// GoogleMapWrapper.tsx
import React from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

interface GoogleMapWrapperProps {
  coordinates: { lat: number; lng: number };
  onLoad?: (map: google.maps.Map) => void;
  zoom?: number;
  isLoaded: boolean; // 부모에서 받아옴
}

const mapContainerStyle = { width: "100%", height: "300px" };

export const GoogleMapWrapper: React.FC<GoogleMapWrapperProps> = ({
  coordinates,
  onLoad,
  zoom = 15,
  isLoaded,
}) => {
  // 1) 여기서는 useJsApiLoader를 쓰지 않음

  if (!isLoaded) {
    return <p>Loading map...</p>;
  }

  // 2) Marker -> MarkerF 로 변경 (deprecation 경고 제거)
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={coordinates}
      zoom={zoom}
      onLoad={onLoad}>
      <MarkerF key={`${coordinates.lat}-${coordinates.lng}`} position={coordinates} />
    </GoogleMap>
  );
};
