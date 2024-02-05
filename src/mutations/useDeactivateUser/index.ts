import { TMutationParams } from "@/generalTypes";
import { deactivateUserService } from "@/services/usersServices";
import { useMutation } from "@tanstack/react-query";

export const useDeactivateUserMutation = ({
  onSuccess,
  onError,
}: TMutationParams) => {
  const { isPending, mutate } = useMutation({
    mutationFn: (userId: number) => deactivateUserService(userId),
    onSuccess,
    onError,
  });

  return {
    isPending,
    mutate,
  };
};
