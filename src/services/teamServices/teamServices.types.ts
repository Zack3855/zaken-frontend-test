import { TPaginationData } from "@/generalTypes";

export type TTeam = {
  id: number;
  name: string;
  teamLead: TTeamLead;
  department: {
    id: number;
    name: string;
  };
};

export type TTeamLead = {
  email: string;
  password: string;
};

export type TGetTeamsReturn = {
  body: {
    teams: TTeam[];
    pageInfo: TPaginationData;
  };
};

export type TAddTeamArgs = {
  name: string;
  teamLead: number;
  department: number;
};

export type TAddTeamMembersArgs = {
  team: number;
  teamMembers: number[];
  department: number;
};

export type TGetTeamsArgs = {
  page: number;
  pageSize: number;
  department: string;
  teamName: string;
};

export type TTeamDetailReturn = {
  data: {
    id: number;
    name: string;
    members: { user: { id: number; email: string; isDeactivated: false } }[];
    department: { id: number; name: string };
    teamLead: string;
  };
};
