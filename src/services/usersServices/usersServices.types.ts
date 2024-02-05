import { TPaginationData } from "@/generalTypes";
import { TDesignations } from "../designationServices/designationServices.types";
import { TDomain } from "../domainServices/domain.types";
import { TRole } from "../rolesServices/rolesServices.types";

type TSinglePermision = {
  id: number;
  option: string;
  permission: {
    id: number;
    name: string;
    groupName: string;
  };
};

export type TUserDomain = {
  department: string | null;
  domain: {
    id: number;
    name: string;
    host: string;
    port: number;
    protocol: string;
  };
  id: number;
  priority: 1;
  role: {
    id: number;
    name: string;
    default: boolean;
    permissions: TSinglePermision[];
  };
};

export type TUser = {
  email: string;
  id: number;
  domains: TUserDomain[];
  designation: TDesignations;
  role: TRole;
  isDeactivated: boolean;
  deactivatedAt: string | null;
};

export type TUserInfo = {
  body: {
    users: TUser[];
    pageInfo: TPaginationData;
  };
};
export type TUserReturnInfo = {
  body: { user: TUser };
};

export type TGetCurrentUserDomainsReturn = {
  body: {
    domains: TDomain[];
  };
};

export type TUserDetailsReturn = {
  body: {
    userInfo: {
      id: number;
      email: string;
      password: string;
      designation: { name: string };
      role: string;
      userDomains: TUserDomain[];
    };
  };
};

type TTeamlessUser = {
  user: {
    id: number;
    email: string;
  };
};

export type TGetUserArgs = {
  page: number;
  pageSize: number;
  email: string;
  role: string;
};

export type TTeamlessUsersReturn = TTeamlessUser[];
