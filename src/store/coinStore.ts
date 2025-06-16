import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ICoin } from "../types/payment";

type CoinStoreType = {
  coinInfo: ICoin[];
  setCoinInfo: (data: ICoin[]) => void;
};

export const useCoinStore = create<CoinStoreType>()(
  persist(
    (set) => ({
      coinInfo: [],
      setCoinInfo: (data) => set({ coinInfo: data }),
    }),
    {
      name: "coin-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
