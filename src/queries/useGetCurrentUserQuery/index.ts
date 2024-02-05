import { getCurrentUserService } from "@/services/usersServices";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUserQuery = () => {
  const {
    data: { data } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: () => getCurrentUserService(),
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
