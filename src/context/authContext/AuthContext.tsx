import { useState, ReactNode, createContext } from "react";

export type TUserAuth = {
  accessToken: string | null;
  refreshToken: string | null;
};

type TContextValues = {
  authState: TUserAuth;
  setAuthState: React.Dispatch<React.SetStateAction<TUserAuth>>;
};

export const AuthContext = createContext<TContextValues>({
  authState: {
    accessToken: "",
    refreshToken: "",
  },
  setAuthState: () => {},
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<TUserAuth>(() => ({
    accessToken:
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken"),
    refreshToken:
      localStorage.getItem("refreshToken") ||
      sessionStorage.getItem("refreshToken"),
  }));

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}
