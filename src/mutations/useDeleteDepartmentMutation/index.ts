import { TMutationParams } from "@/generalTypes";
import { deleteDepartmentService } from "@/services/departmentServices";
import { useMutation } from "@tanstack/react-query";

export const useDeleteDepartmentMutation = ({
  onSuccess,
  onError,
}: TMutationParams) => {
  const { isPending, mutate } = useMutation({
    mutationFn: (departmentId: number) => deleteDepartmentService(departmentId),
    onSuccess,
    onError,
  });

  return {
    isPending,
    mutate,
  };
};
