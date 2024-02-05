import { TMutationParams } from "@/generalTypes";
import { deleteTeamService } from "@/services/teamServices";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTeamMutation = ({
  onSuccess,
  onError,
}: TMutationParams) => {
  const { isPending, mutate } = useMutation({
    mutationFn: (teamId: number) => deleteTeamService(teamId),
    onSuccess,
    onError,
  });

  return {
    isPending,
    mutate,
  };
};
