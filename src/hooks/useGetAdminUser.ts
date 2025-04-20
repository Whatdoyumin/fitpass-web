import { useQuery } from "@tanstack/react-query";
import { getAdminUsers } from "../apis/adminUser/adminUser";
import { getAdminOwnerUsers } from "../apis/adminUser/adminOwnerUser";
import { getAdminFitnessUsers } from "../apis/adminUser/adminFitnessUser";
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

export interface TOwnerUserData {
    id: number;
    name: string;
    corporation: string;
    loginId: string;
    phoneNumber: string;
    createdAt: string;
    status: string;
  };

export interface OwnerUsersResponse {
    content: { ownersInfo: TOwnerUserData[]; totalElements: number | undefined; totalPages: number };
  };

export const useGetOwnerUsers = (
    page: number = 0,
    size: number = 10,
    searchType: string="",
    keyword: string=""
  ) => {
    return useQuery<OwnerUsersResponse, AxiosError>({
      queryKey: ["ownerUsers", page, size, searchType, keyword],
      queryFn: () => getAdminOwnerUsers(page, size, searchType, keyword),
    });
  };

export interface TFitnessUserData {
    id: number;
    name: string;
    corporation: string;
    loginId: string;
    phoneNumber: string;
    createdAt: string;
  };

export interface FitnessUsersResponse {
    content: { ownersApprovals: TFitnessUserData[]; totalElements: number | undefined; totalPages: number };
    };

export const useGetAdminFitnessUsers = (
    page: number = 0,
    size: number = 10,
    searchType: string="",
    keyword: string=""
    ) => {
    return useQuery<FitnessUsersResponse, AxiosError>({
      queryKey: ["fitnessUsers", page, size, searchType, keyword],
      queryFn: () => getAdminFitnessUsers(page, size, searchType, keyword),
    });
  };
