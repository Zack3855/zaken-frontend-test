import { axiosInstance } from "../axiosInstance";
import {
  TAddTeamArgs,
  TAddTeamMembersArgs,
  TGetTeamsArgs,
  TGetTeamsReturn,
  TTeamDetailReturn,
} from "./teamServices.types";

export const getAllTeamsService = ({
  page,
  pageSize,
  department,
  teamName,
}: TGetTeamsArgs) =>
  axiosInstance.get<TGetTeamsReturn>("teams", {
    params: {
      page,
      pageSize,
      department,
      teamName,
    },
  });

export const addTeamService = (args: TAddTeamArgs) =>
  axiosInstance.post("teams", args);

export const addTeamMembersService = (args: TAddTeamMembersArgs) =>
  axiosInstance.post("teams/team-members", args);

export const deleteTeamService = (teamId: number) =>
  axiosInstance.delete(`teams/${teamId}`);

export const teamDetailsService = (teamId: number) =>
  axiosInstance.get<TTeamDetailReturn>(`teams/${teamId}`);

export const removeUserFromTeamService = (teamId: number, memberId: number) =>
  axiosInstance.delete(`teams/${teamId}/${memberId}`);
