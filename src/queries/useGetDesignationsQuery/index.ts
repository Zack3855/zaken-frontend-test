import { getDesignationsService } from "@/services/designationServices";
import { useQuery } from "@tanstack/react-query";

export const useGetDesignationsQuery = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getDesignations"],
    queryFn: () => getDesignationsService(),
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
