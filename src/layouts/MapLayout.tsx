import { Outlet } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";

const MapLayout = () => {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}
      libraries={["places"]}>
      <Outlet />
    </LoadScript>
  );
};

export default MapLayout;
