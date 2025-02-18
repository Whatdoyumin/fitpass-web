import { useQuery } from "@tanstack/react-query";
import { getAdminPayHistory } from "../apis/adminPayHistory/adminPayHistory";
import { TAdminPayHistory } from "../types/adminPayHistory";

function useGetAdminPayHistory({ memberName, type, size = 10, page = 0 }: TAdminPayHistory) {
  return useQuery({
    queryKey: ["adminPayHistory", memberName, type, page],
    queryFn: () => getAdminPayHistory({ memberName, type, size, page }),
  });
}

export { useGetAdminPayHistory };
