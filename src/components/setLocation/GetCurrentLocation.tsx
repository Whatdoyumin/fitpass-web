import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useNavigate } from "react-router-dom";
import usePatchLocation from "../../hooks/usePatchLocation";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { GuideLogin } from "../../pages/GuideLogin";
import { LoadingSpinner } from "../LoadingSpinner";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const GetCurrentLocation = () => {
  const navigate = useNavigate();
  const { location, error } = useGeoLocation(geolocationOptions);
  const { mutate, isPending } = usePatchLocation();
  const { isLogin } = useAuth();

  useEffect(() => {
    if (!isLogin) return;

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
            localStorage.setItem("latitude", `${location.latitude}`);
            localStorage.setItem("longitude", `${location.longitude}`);
          },
          onError: (error) => {
            console.log(error.message);
            alert("위치 설정에 실패했습니다. 다시 시도해주세요.");
            navigate("/");
          },
        }
      );
    }
  }, [isLogin, location, error, mutate, navigate]);

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (!isLogin) {
    return (
      <div className="h-[400px] flex items-center justify-center z-50">
        <GuideLogin />
      </div>
    );
  }

  return <></>;
};

export default GetCurrentLocation;
