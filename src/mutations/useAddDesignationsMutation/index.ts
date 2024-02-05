import { TMutationParams } from "@/generalTypes";
import { addDesignationService } from "@/services/designationServices";
import { TDesignations } from "@/services/designationServices/designationServices.types";
import { useMutation } from "@tanstack/react-query";

export const useAddNewDesignationsMutation = ({
  onSuccess,
  onError,
}: TMutationParams) => {
  const { isPending, mutate } = useMutation({
    mutationFn: (user: TDesignations) => addDesignationService(user),
    onSuccess,
    onError,
  });

  return {
    isPending,
    mutate,
  };
};
