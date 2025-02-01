export type TFitness = {
  id?: number,
  fitnessId?: number,
  fitnessName: string,
  fitnessAddress: string,
  distance: number,
  fee?: number,
  categoryName?: string,
  imageUrl?: string,
  status?: string, // 패스 상태
  activeTime?: string | null, // 패스 시간
};
