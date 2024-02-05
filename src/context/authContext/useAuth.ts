import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const { authState, setAuthState } = useContext(AuthContext);

  return {
    authState,
    setAuthState,
  };
}
