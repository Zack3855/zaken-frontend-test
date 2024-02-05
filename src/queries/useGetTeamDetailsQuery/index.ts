import { teamDetailsService } from "@/services/teamServices";
import { useQuery } from "@tanstack/react-query";

export const useGetTeamDetailsQuery = (teamID: string) => {
  const {
    data: { data } = {},
    isPending,
    isError,
  } = useQuery({
    queryKey: ["getTeamDetails", teamID],
    queryFn: () => teamDetailsService(Number(teamID)),
  });

  return {
    data,
    isPending,
    isError,
  };
};
