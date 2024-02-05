import { TMutationParams } from "@/generalTypes";
import { deleteDomainService } from "@/services/domainServices";
import { useMutation } from "@tanstack/react-query";

export const useDeleteDomainMutation = ({
  onSuccess,
  onError,
}: TMutationParams) => {
  const domainId = localStorage.getItem("domainId") || "";
  const { isPending, mutate } = useMutation({
    mutationFn: () => deleteDomainService(domainId),
    onSuccess,
    onError,
  });

  return {
    isPending,
    mutate,
  };
};
