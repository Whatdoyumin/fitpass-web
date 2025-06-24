import { axiosInstance } from "../../axios-instance";

interface Profile {
  id: number;
  pictureUrl: string;
  name: string;
  coinQuantity: number;
}

export const getProfile = async (): Promise<Profile | null> => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const response = await axiosInstance.get("/auth/member/profile");
    return response.data.result;
  } catch {
    return null;
  }
};

export const updateProfile = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post("/auth/member/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.pictureUrl; // 이미지 URL을 반환
  } catch (error) {
    console.error("프로필 사진 변경 오류:", error);
    throw error;
  }
};

// 프로필 삭제 API
export const deleteProfile = async () => {
  try {
    const response = await axiosInstance.delete("/auth/member/profile");
    return response.data;
  } catch (error) {
    console.error("프로필 사진 삭제 오류:", error);
    throw error;
  }
};
