import { axiosInstance } from "../../axios-instance";

interface Profile {
  id: number;
  pictureUrl: string;
  name: string;
  planType: string | null;
  coinQuantity: number;
}

export const getProfile = async (): Promise<Profile> => {
  try {
    const response = await axiosInstance.get("/auth/profile");
    return response.data.result;
  } catch (error) {
    console.error("프로필 조회 오류:", error);
    throw error;
  }
};

export const updateProfile = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post("/auth/profile", formData, {
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
    const response = await axiosInstance.delete("/auth/profile");
    return response.data;
  } catch (error) {
    console.error("프로필 사진 삭제 오류:", error);
    throw error;
  }
};
