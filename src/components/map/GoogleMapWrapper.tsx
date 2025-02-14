// GoogleMapWrapper.tsx
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface GoogleMapWrapperProps {
  coordinates: { lat: number; lng: number };
  onLoad: (map: google.maps.Map) => void;
  zoom?: number;
}

const mapContainerStyle = { width: "100%", height: "300px" };

export const GoogleMapWrapper: React.FC<GoogleMapWrapperProps> = ({
  coordinates,
  onLoad,
  zoom = 15,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <p>Loading map...</p>;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={coordinates}
      zoom={zoom}
      onLoad={onLoad}>
      <Marker key={`${coordinates.lat}-${coordinates.lng}`} position={coordinates} />
    </GoogleMap>
  );
};
