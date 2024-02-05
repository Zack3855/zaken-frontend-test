import { TMutationParams } from "@/generalTypes";
import { removeUserFromTeamService } from "@/services/teamServices";
import { useMutation } from "@tanstack/react-query";

export const useRemoveUserFromTeam = ({
  onSuccess,
  onError,
}: TMutationParams) => {
  const { isPending, mutate } = useMutation({
    mutationFn: ({ teamId, memberId }: { teamId: number; memberId: number }) =>
      removeUserFromTeamService(teamId, memberId),
    onSuccess,
    onError,
  });

  return {
    isPending,
    mutate,
  };
};
