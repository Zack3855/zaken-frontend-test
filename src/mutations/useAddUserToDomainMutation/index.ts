import { TMutationParams } from "@/generalTypes";
import { addUserToDomainService } from "@/services/usersServices";
import { useMutation } from "@tanstack/react-query";

export type TMurateArgs = {
  role: string;
  destinationDomainId: number;
  userId: number;
};

export const useAddUserToDomainMutation = ({
  onSuccess,
  onError,
}: TMutationParams) => {
  const { isPending, mutate } = useMutation({
    mutationFn: ({ role, destinationDomainId, userId }: TMurateArgs) =>
      addUserToDomainService({ role, destinationDomainId, userId }),
    onSuccess,
    onError,
  });

  return {
    isPending,
    mutate,
  };
};
