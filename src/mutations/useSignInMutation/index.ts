import { useMutation } from "@tanstack/react-query";
import { signInService } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { toast } from "react-toastify";
import { TAxiosResponseError } from "@/generalTypes";

interface IMutationFnArgs {
  email: string;
  password: string;
}

export const useSignInMutation = () => {
  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: ({ email, password }: IMutationFnArgs) =>
      signInService(email, password),
    onSuccess: ({
      data: {
        body: { tokens },
      },
    }) => {
      setAuthState({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);

      navigate("/choose-domain");
    },
    onError: (error: TAxiosResponseError) => {
      toast.error(error.response?.data.message);
    },
  });

  return {
    isPending,
    mutate,
  };
};
