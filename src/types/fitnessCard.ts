export type TFitness = {
  fitnessId?: number,
  fitnessName: string,
  address: string,
  distance: number,
  fee?: number,
  categoryName?: string,
  imageUrl?: string,
  status?: string, // 패스 상태
  activeTime?: string, // 패스 시간
};
