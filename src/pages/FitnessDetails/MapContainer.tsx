import { useEffect } from "react";

declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

interface MapProps {
  data : {
    fitnessLatitude: number,
    fitnessLongitude: number,
  }
}

function MapContainer({ data }: MapProps) {
  const lat = data?.fitnessLatitude;
  const lng = data?.fitnessLongitude;

  useEffect(() => {
    const container = document.getElementById('map');
    
    if(container) {
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);
  
      const markerPosition = new window.kakao.maps.LatLng(lat, lng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map
      });
    }
  }, [lat, lng])
  return(
    <div id="map" className="w-[300px] h-[169px] "></div>
  );
}

export default MapContainer;