import { getPermissions } from "@/services/permissions";
import { useQuery } from "@tanstack/react-query";

export const useGetPermissions = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["getPermissions"],
    queryFn: () => getPermissions(),
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isPending,
    isError,
  };
};
