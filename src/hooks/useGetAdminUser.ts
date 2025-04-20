import { useQuery } from "@tanstack/react-query";
import { getAdminUsers } from "../apis/adminUser/adminUser";
import { AxiosError } from "axios";

export interface TAdminUserData {
    id: number;
    name: string;
    registerType: string;
    loginId: string;
    phoneNumber: string;
    createdAt: string;
    lastLoginAt: string;
  };

export interface AdminUsersResponse {
    content: { membersInfo: TAdminUserData[]; totalElements: number | undefined; totalPages: number };
  };

  export const useGetAdminUsers = (
    page: number = 0,
    size: number = 10,
    searchType: string="",
    keyword: string=""
  ) => {
    return useQuery<AdminUsersResponse, AxiosError>({
      queryKey: ["adminUsers", page, size, searchType, keyword],
      queryFn: () => getAdminUsers(page, size, searchType, keyword),
    });
  };
  