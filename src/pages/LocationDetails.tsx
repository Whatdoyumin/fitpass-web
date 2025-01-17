import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Location } from "../assets/svg";

declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

function LocationDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const address = searchParams.get("address") || "";
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lng = parseFloat(searchParams.get("lng") || "0");

  useEffect(() => {
    if (window.kakao && lat && lng) {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(lat, lng),
      });

      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${name}</div>`,
      });
      infoWindow.open(map, marker);
    }
  }, [lat, lng, name]);

  const handleSetLocation = () => {
    localStorage.setItem("lat", String(lat));
    localStorage.setItem("lng", String(lng));

    navigate("/");
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
