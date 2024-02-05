import { TMurateArgs } from "@/mutations/useAddUserToDomainMutation";
import { axiosInstance } from "../axiosInstance";
import {
  TGetCurrentUserDomainsReturn,
  TUserReturnInfo,
  TUserDetailsReturn,
  TTeamlessUsersReturn,
  TGetUserArgs,
  TUserInfo,
} from "./usersServices.types";

export const getCurrentUserService = () =>
  axiosInstance.get<TUserReturnInfo>("users/me");

export const getAllUsersService = ({
  page,
  pageSize,
  email,
  role,
}: TGetUserArgs) => {
  const domainId = localStorage.getItem("domainId");
  return axiosInstance.get<TUserInfo>(`domains/${domainId}/users`, {
    params: { page, pageSize, email, ...(role ? { role } : {}) },
  });
};

export const getCurrentUserDomainsService = () =>
  axiosInstance.get<TGetCurrentUserDomainsReturn>("/users/me/domains");

export const getUserDetailsService = async (userId: string) =>
  await axiosInstance.get<TUserDetailsReturn>(`/users/${userId}`);

export const getTeamlessUsersService = (departmentId: number) =>
  axiosInstance.get<TTeamlessUsersReturn>(`users/teamless/${departmentId}`);

export const deactivateUserService = (userId: number) =>
  axiosInstance.put(`/users/${userId}/deactivate`);

export const addUserToDomainService = ({
  userId,
  role,
  destinationDomainId,
}: TMurateArgs) =>
  axiosInstance.put(`users/add-user-to-domain/${userId}`, {
    role,
    destinationDomainId,
  });

export const changeUserDomainService = ({
  userId,
  role,
  destinationDomainId,
}: TMurateArgs) =>
  axiosInstance.put(`users/change-user-domain/${userId}`, {
    role,
    destinationDomainId,
  });
