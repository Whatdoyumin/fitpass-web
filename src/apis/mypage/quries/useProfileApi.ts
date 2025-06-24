import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getProfile, updateProfile, deleteProfile } from "../axios/profileApi";

interface Profile {
  id: number;
  pictureUrl: string;
  name: string;
  coinQuantity: number;
}

export const useGetProfile = () => {
  return useQuery<Profile | null>({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });
};

export const useUpdateProfile = () => {
  return useMutation<string, AxiosError, File>({
    mutationFn: updateProfile,
    onError: (error: AxiosError) => {
      console.error("프로필 사진 변경 오류:", error);
    },
  });
};

// 프로필 삭제 훅
export const useDeleteProfile = () => {
  return useMutation({
    mutationFn: deleteProfile,
    onError: (error: AxiosError) => {
      console.error("프로필 사진 삭제 오류:", error);
    },
  });
};
