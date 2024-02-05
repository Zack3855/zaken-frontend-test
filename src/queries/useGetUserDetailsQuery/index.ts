import { getUserDetailsService } from "@/services/usersServices";
import { useQuery } from "@tanstack/react-query";

export const useGetUserDetailsQuery = (userId: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["getUserDetails", userId],
    queryFn: () => getUserDetailsService(userId),
  });

  return {
    data,
    isPending,
    isError,
  };
};
