import { useEffect, useState } from "react";
import SearchHeader from "../components/SearchHeader";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchLocation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearchValue = searchParams.get("q");
  const [searchValue, setSearchValue] = useState<string>(initialSearchValue ?? "");
  const [places, setPlaces] = useState<kakao.maps.services.PlacesSearchResultItem[]>([]);
  const [pagination, setPagination] = useState<kakao.maps.services.Pagination | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialSearchValue) {
      searchPlaces(initialSearchValue);
    }
  }, [initialSearchValue]);

  const searchPlaces = (keyword: string) => {
    if (!window.kakao) return;
    const ps = new window.kakao.maps.services.Places();

    if (!keyword.trim()) {
      setPlaces([]);
      setErrorMessage("검색어를 입력하세요.");
      return;
    }

    ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);
        setPagination(pagination);
        setErrorMessage(null);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        setPlaces([]);
        setErrorMessage("검색 결과가 존재하지 않습니다.");
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        setPlaces([]);
        setErrorMessage("검색 결과 중 오류가 발생했습니다.");
      }
    });
  };

  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) return;

    navigate(`/search-location?q=${encodeURIComponent(keyword)}`);
    searchPlaces(keyword);
  };

  const handlePlaceClick = (place: kakao.maps.services.PlacesSearchResultItem) => {
    const { place_name, address_name, x, y } = place;
    navigate(
      `/location-detail?name=${encodeURIComponent(place_name)}&address=${encodeURIComponent(
        address_name
      )}&lat=${y}&lng=${x}`
    );
  };

  return (
    <div className="w-full h-auto min-h-full absolute z-20">
      <SearchHeader
        nav="/search-location?q"
        placeholder="지역을 검색해주세요."
        onSearch={handleSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <div className="w-full h-auto p-3 pb-28 min-h-screen">
        {errorMessage ? (
          <div className="text-center text-gray-500">{errorMessage}</div>
        ) : (
          <ul className="flex flex-col">
            {places.map((place, index) => (
              <li
                key={index}
                className="border-b-2 border-gray-200"
                onClick={() => handlePlaceClick(place)}
              >
                <div className="bg-white p-3">
                  <h5 className="text-lg font-bold mb-1">{place.place_name}</h5>
                  {place.road_address_name ? (
                    <div className="text-sm text-gray-600">
                      <p>{place.road_address_name}</p>
                      <p className="text-gray-400">{place.address_name}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">{place.address_name}</p>
                  )}
                  <p className="text-sm text-blue-500">{place.phone}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {pagination && !errorMessage && (
          <div className="w-full flex gap-3 justify-center items-center mt-4">
            {Array.from({ length: pagination.last }, (_, i) => i + 1).map((page) => (
              <a
                key={page}
                href="#"
                className={`${
                  page === pagination.current ? "text-blue-500 font-bold" : "text-gray-500"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  pagination.gotoPage(page);
                }}
              >
                {page}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchLocation;
