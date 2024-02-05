import { getAllDepartmentsService } from "@/services/departmentServices";
import { useQuery } from "@tanstack/react-query";

export const useGetAllDepartmentsQuery = () => {
  const {
    data: { data } = {},
    isPending,
    isError,
  } = useQuery({
    queryKey: ["getAllDepartments"],
    queryFn: () => getAllDepartmentsService(),
  });

  return {
    data,
    isPending,
    isError,
  };
};
