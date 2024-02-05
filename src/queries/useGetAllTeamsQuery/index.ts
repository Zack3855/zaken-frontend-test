import { getAllTeamsService } from "@/services/teamServices";
import { TGetTeamsArgs } from "@/services/teamServices/teamServices.types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTeamsQuery = ({
  page,
  pageSize,
  department,
  teamName,
}: TGetTeamsArgs) => {
  const {
    data: { data } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllTeams", page, department, teamName],
    queryFn: () => getAllTeamsService({ page, pageSize, department, teamName }),
  });
  return {
    data,
    isLoading,
    isError,
  };
};
