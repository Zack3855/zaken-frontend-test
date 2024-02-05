import { axiosInstance } from "../axiosInstance";

import {
  TRefreshTokenServiceReturn,
  TSignInServiceReturn,
  TSignUpArguments,
} from "./authServices.types";

export const signInService = (email: string, password: string) =>
  axiosInstance.post<TSignInServiceReturn>("/auth/signin", { email, password });

export const signUpService = (args: TSignUpArguments) =>
  axiosInstance.post("auth/signup", {
    ...args,
    identifier: Math.floor(Math.random() * 1000),
    reportingToId: 1,
  });

export const signOutService = () => axiosInstance.get("/auth/signout");

export const refreshTokenService = () => {
  const token =
    localStorage.getItem("refreshToken") ||
    sessionStorage.getItem("refreshToken");

  return axiosInstance.put<TRefreshTokenServiceReturn>("auth/refresh-token", {
    token,
  });
};
