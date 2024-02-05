import { TMutationParams } from "@/generalTypes";
import { addNewDomainService } from "@/services/domainServices";
import { TNewDomainArgs } from "@/services/domainServices/domain.types";
import { useMutation } from "@tanstack/react-query";

export const useAddDomainMutation = ({
  onSuccess,
  onError,
}: TMutationParams) => {
  const { isPending, mutate } = useMutation({
    mutationFn: (user: TNewDomainArgs) => addNewDomainService(user),
    onSuccess,
    onError,
  });

  return {
    isPending,
    mutate,
  };
};
