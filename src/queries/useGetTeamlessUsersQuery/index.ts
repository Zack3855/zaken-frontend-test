import { getTeamlessUsersService } from "@/services/usersServices";
import { useQuery } from "@tanstack/react-query";
export const useGetTeamlessUsersQuery = (departmentId: number) => {
  const {
    data: { data } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getTeamlessUsers", departmentId],
    queryFn: () => getTeamlessUsersService(departmentId),
    refetchOnWindowFocus: false,
    enabled: !!departmentId,
  });
  return {
    data,
    isLoading,
    isError,
  };
};
