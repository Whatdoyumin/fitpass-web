import { useEffect } from "react";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useNavigate } from "react-router-dom";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const GetCurrentLocation = () => {
  const navigate = useNavigate();
  const { location, error } = useGeoLocation(geolocationOptions);

  useEffect(() => {
    if (location?.latitude && location.longitude) {
      localStorage.setItem("lat", String(location?.latitude));
      localStorage.setItem("lng", String(location?.longitude));
      navigate("/");
    } else if (error) {
      alert("위치 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.");
    }
  });

  return <></>;
};

export default GetCurrentLocation;
