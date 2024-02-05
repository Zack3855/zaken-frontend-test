import { TMutationParams } from "@/generalTypes";
import { changeUserDomainService } from "@/services/usersServices";
import { useMutation } from "@tanstack/react-query";

export type TMurateArgs = {
  role: string;
  destinationDomainId: number;
  userId: number;
};

export const useChangeUserDomainMutation = ({
  onSuccess,
  onError,
}: TMutationParams) => {
  const { isPending, mutate } = useMutation({
    mutationFn: ({ role, destinationDomainId, userId }: TMurateArgs) =>
      changeUserDomainService({
        role,
        destinationDomainId: Number(destinationDomainId),
        userId,
      }),
    onSuccess,
    onError,
  });

  return {
    isPending,
    mutate,
  };
};
