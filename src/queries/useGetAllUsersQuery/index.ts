import { getAllUsersService } from "@/services/usersServices";
import { TGetUserArgs } from "@/services/usersServices/usersServices.types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsersQuery = ({
  page,
  pageSize,
  email,
  role,
}: TGetUserArgs) => {
  const {
    data: { data } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllUsers", page, email, role],
    queryFn: () => getAllUsersService({ page, pageSize, email, role }),
    refetchOnWindowFocus: false,
  });
  return {
    data,
    isLoading,
    isError,
  };
};
