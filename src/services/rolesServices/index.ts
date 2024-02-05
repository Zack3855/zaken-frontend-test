import { axiosInstance } from "../axiosInstance";
import { TReturnedRoles } from "./rolesServices.types";

export const getAllRolesService = (domainId: number) =>
  axiosInstance.get<TReturnedRoles>("/roles", {
    params: {
      domainId,
    },
  });
