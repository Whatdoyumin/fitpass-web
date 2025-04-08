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

export const uploadToS3 = async (preSignedUrl: string, file: File) => {
    const res = await fetch(preSignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
  
    if (!res.ok) {
      const text = await res.text();
      console.error("Fetch 업로드 실패", res.status, text);
      throw new Error("업로드 실패");
    }
  
    console.log("✅ Fetch 업로드 성공");
  };
  