import { useAuth } from "@/context/authContext";
import { TAxiosResponseError } from "@/generalTypes";
import { signOutService } from "@/services/authServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useSignOutMutation = (
  onError: (error: TAxiosResponseError) => void
) => {
  const { setAuthState } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: () => signOutService(),

    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("domainId");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      setAuthState({ accessToken: "", refreshToken: "" });
      queryClient.clear();
      navigate("/sign-in");
    },
    onError,
  });

  return {
    mutate,
    error,
  };
};
