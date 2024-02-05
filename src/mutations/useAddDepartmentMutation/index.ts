import { TMutationParams } from "@/generalTypes";
import { addDepartmentService } from "@/services/departmentServices";
import { TDepartments } from "@/services/departmentServices/departmentServices.types";
import { useMutation } from "@tanstack/react-query";

export const useAddDepartmentMutation = ({
  onSuccess,
  onError,
}: TMutationParams) => {
  const { isPending, mutate } = useMutation({
    mutationFn: (department: TDepartments) => addDepartmentService(department),
    onSuccess,
    onError,
  });

  return {
    isPending,
    mutate,
  };
};
