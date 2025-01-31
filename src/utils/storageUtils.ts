import { HomeCardData } from "../type/HomeCardData";

export const handleSaveToLocalStorage = (data: HomeCardData) => {
  const watched = JSON.parse(localStorage.getItem("watched") || "[]");

  const currentFacility = {
    fitnessId: data.fitnessId,
    name: data.name,
    distance: data.distance,
    imageUrl: data.imageUrl,
  };
  
  if (!watched.some((item: HomeCardData) => item.fitnessId === data.fitnessId)) {
    watched.unshift(currentFacility);  // 가장 앞쪽에 요소 추가
  }

  // 최근 본 운동 시설은 최대 7개까지
  if (watched.length > 7) {
    watched.pop();  // 마지막 요소 제거
  }

  localStorage.setItem('watched', JSON.stringify(watched));
}