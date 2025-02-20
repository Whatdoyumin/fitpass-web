import { useState } from "react";
import SvgIcCloseBtn from "../../../assets/svg/IcCloseBtn";

interface ModalProps {
  onClose: () => void;
  onSetLocation: (address: string, latitude: number, longitude: number) => void;
}

type Place = kakao.maps.services.PlacesSearchResultItem;

type Pagination = kakao.maps.services.Pagination;

function SetLocationModal({ onClose, onSetLocation }: ModalProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        setErrorMessage("검색 중 오류가 발생했습니다.");
      }
    });
  };

  const handleSearch = () => {
    searchPlaces(searchValue);
  };

  const handleSearchWithKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePlaceClick = (place: Place) => {
    const { address_name, x, y } = place;
    // localStorage.setItem("address_name", address_name);
    // localStorage.setItem("latitude", y);
    // localStorage.setItem("longitude", x);

    onSetLocation(address_name, y, x);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black-700 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white-100 w-[430px] h-[569px] flex flex-col rounded-[10px] overflow-y-scroll scrollbar-hide">
        <div className="flex items-center justify-between p-[30px] ">
          <h1 className="font-bold text-[22px] text-gray-600 ">주소 검색</h1>
          <SvgIcCloseBtn width="14px" height="14px" onClick={onClose} className="cursor-pointer" />
        </div>
        <div className="border-b border-gray-350" />

        <div className="flex flex-col">
          <div className="flex justify-evenly py-[20px] ">
            <input
              type="text"
              placeholder="주소를 검색하세요."
              className="w-[284px] h-[38px] border border-gray-400 pl-2"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchWithKeyboard}
            />
            <button
              type="button"
              className="w-[67px] h-[38px] bg-gray-400 text-white-100 rounded-[5px] "
              onClick={handleSearch}
            >
              검색
            </button>
          </div>

          <div className="w-full max-w-content h-auto p-3 pb-10 overflow-auto">
            {errorMessage ? (
              <div className="text-center text-gray-500">{errorMessage}</div>
            ) : (
              <ul className="flex flex-col">
                {places.map((place, index) => (
                  <li
                    key={index}
                    className="border-b-2 border-gray-200 cursor-pointer"
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
      </div>
    </div>
  );
}

export default SetLocationModal;
