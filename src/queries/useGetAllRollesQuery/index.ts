import { getAllRolesService } from "@/services/rolesServices";
import { useQuery } from "@tanstack/react-query";

export const useGetAllRolesQuery = (domainId: number) => {
  const {
    data: { data } = {},
    isPending,
    isError,
  } = useQuery({
    queryKey: ["getAllRoles", domainId],
    queryFn: () => getAllRolesService(domainId),
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isPending,
    isError,
  };
};
