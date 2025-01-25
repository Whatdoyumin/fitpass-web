import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useNavigate } from "react-router-dom";
import usePatchLocation from "../../hooks/usePatchLocation";
import { useEffect } from "react";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const GetCurrentLocation = () => {
  const navigate = useNavigate();
  const { location, error } = useGeoLocation(geolocationOptions);
  const { mutate } = usePatchLocation();

  useEffect(() => {
    if (error) {
      alert("위치 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.");
      return;
    }

    if (location?.latitude && location.longitude) {
      mutate(
        {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        {
          onSuccess: () => {
            navigate("/");
          },
          onError: (error) => {
            console.log(error.message);
            alert("위치 설정에 실패했습니다. 다시 시도해주세요.");
            navigate("/");
          },
        }
      );
    }
  }, [location, error, mutate, navigate]);

  return <></>;
};

export default GetCurrentLocation;
