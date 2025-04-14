import axios from "axios";
import config from "../config";

export interface PresignedUrlResponse {
  preSignedUrl: string;
  key: string;
}

export const getBusinessRegistrationPresignedUrl = async (filename: string): Promise<PresignedUrlResponse> => {
  const response = await axios.get(`${config.apiBaseUrl}/auth/owner/registration`, {
    params: { filename },
  });
  return response.data.result;
};

export const getBankCopyPresignedUrl = async (filename: string): Promise<PresignedUrlResponse> => {
  const response = await axios.get(`${config.apiBaseUrl}/auth/owner/bank-copy`, {
    params: { filename },
  });
  return response.data.result;
};

export const uploadToS3 = async (preSignedUrl: string, file: File): Promise<void> => {
    try {
      await axios.put(preSignedUrl, file, {
        headers: {
          "Content-Type": file.type
        },
      });
    } catch (error) {
      console.error("파일 업로드 실패:", error);
      throw new Error("파일 업로드 중 오류가 발생했습니다.");
    }
  };