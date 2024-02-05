import { TMutationParams } from "@/generalTypes";
import { signUpService } from "@/services/authServices";
import { TSignUpArguments } from "@/services/authServices/authServices.types";
import { useMutation } from "@tanstack/react-query";

export const useSignUpMutation = ({ onSuccess, onError }: TMutationParams) => {
  const { isPending, mutate } = useMutation({
    mutationFn: (user: TSignUpArguments) => signUpService(user),
    onSuccess,
    onError,
  });

  return {
    isPending,
    mutate,
  };
};
