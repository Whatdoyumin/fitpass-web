import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Location } from "../assets/svg";
import usePatchLocation from "../hooks/usePatchLocation";

function LocationDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const address = searchParams.get("address") || "";
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lng = parseFloat(searchParams.get("lng") || "0");

  useEffect(() => {
    const mapContainer = document.getElementById("map") as HTMLElement;
    if (mapContainer && window.kakao) {
      const map = new window.kakao.maps.Map(mapContainer, {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      });

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(lat, lng),
        map: map,
      });

      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${name}</div>`,
      });

      infoWindow.open(map, marker);
    }
  }, [lat, lng, name]);

  const { mutate } = usePatchLocation();
  const handleSetLocation = () => {
    mutate(
      {
        latitude: lat,
        longitude: lng,
      },
      {
        onSuccess: () => {
          navigate("/");
          localStorage.setItem("latitude", `${lat}`);
          localStorage.setItem("longitude", `${lng}`);
          localStorage.setItem("address_name", address);
        },
        onError: (error) => {
          console.log(error.message);
          alert("위치 설정에 실패했습니다. 다시 시도해주세요.");
          navigate("/search-location");
        },
      }
    );
  };

  return (
    <div className="w-full h-screen flex flex-col gap-3">
      <div id="map" className="w-full h-80"></div>
      <div className="w-full flex justify-between px-2 py-2 border-b border-gray-250">
        <div className="flex gap-3">
          <Location width={"20px"} />
          <div className="flex flex-col">
            <h1 className="text-18px font-bold">{name}</h1>
            <p className="text-gray-500">{address}</p>
          </div>
        </div>
        <button className="pr-4" onClick={handleSetLocation}>
          설정
        </button>
      </div>
    </div>
  );
}

export default LocationDetail;
