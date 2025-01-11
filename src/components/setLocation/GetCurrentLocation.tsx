import { useGeoLocation } from "../../hooks/useGeoLocation";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const GetCurrentLocation = () => {
  const { location, error } = useGeoLocation(geolocationOptions);

  return <div>{(location.latitude, location.longitude)}</div>;
};

export default GetCurrentLocation;
