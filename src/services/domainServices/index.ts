import { axiosInstance } from "../axiosInstance";
import { TNewDomainArgs } from "./domain.types";

export const addNewDomainService = (args: TNewDomainArgs) =>
  axiosInstance.post("/domains", { ...args });

export const deleteDomainService = (domainId: string | null) =>
  axiosInstance.delete(`/domains/${domainId}`);

export const getUsersInDomainService = (domainId: number) =>
  axiosInstance.get(`/domains/${domainId}/users`);
