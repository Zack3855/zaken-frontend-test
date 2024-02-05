import { getCurrentUserDomainsService } from "@/services/usersServices";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUserDomainsQuery = () => {
  const {
    data: { data } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getCurrentUserDomains"],
    queryFn: () => getCurrentUserDomainsService(),
    refetchOnWindowFocus: false,
  });
  return {
    data,
    isLoading,
    isError,
  };
};
