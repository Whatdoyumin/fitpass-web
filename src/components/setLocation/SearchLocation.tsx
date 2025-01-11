import {
  // useEffect,
  useState,
} from "react";
import SearchHeader from "../SearchHeader";

// interface placeType {
//   place_name: string;
//   road_address_name: string;
//   address_name: string;
//   phone: string;
//   place_url: string;
// }

// const { kakao } = window;

const SearchLocation = () => {
  const [searchValue, setSearchValue] = useState("");
  // const [places, setPlaces] = useState();
  // const [markers, setMarkers] = useState([]);
  // const [map, setMap] = useState();

  // const [keyword, setKeyword] = useState("");
  // const [selectedPlace, setSelectedPlace] = useState();

  // const markerImageSrc =
  //   "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
  // const imageSize = { width: 36, height: 37 };
  // const spriteSize = { width: 36, height: 691 };

  // useEffect(() => {
  //   if (!map) return;
  //   const ps = new kakao.maps.services.Places();

  //   ps.keywordSearch(searchValue, (data, status, _pagination) => {
  //     if (status === kakao.maps.services.Status.OK) {
  //       setPlaces(data);
  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해
  //       // LatLngBounds 객체에 좌표를 추가
  //       const bounds = new kakao.maps.LatLngBounds();
  //       const markers = [];

  //       for (let i = 0; i < data.length; i++) {
  //         markers.push({
  //           position: {
  //             lat: data[i].y,
  //             lng: data[i].x,
  //           },
  //           content: data[i].place_name,
  //         });
  //         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
  //       }
  //       setMarkers(markers);

  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정
  //       map.setBoundes(bounds);
  //     }
  //   });
  // }, [map, keyword]);

  const onSearch = () => {
    // setKeyword(searchValue);
  };

  return (
    <div className="w-full h-full bg-white-200 absolute z-20">
      <SearchHeader
        nav="/set-location?c"
        placeholder="지역을 검색해주세요."
        onSearch={onSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </div>
  );
};

export { SearchLocation };
