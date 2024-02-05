import { TAxiosResponseError } from "@/generalTypes";
import { addTeamService } from "@/services/teamServices";
import { TAddTeamArgs } from "@/services/teamServices/teamServices.types";
import { useMutation } from "@tanstack/react-query";

export const useAddTeamMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: (id: number) => void;
  onError: (error: TAxiosResponseError) => void;
}) => {
  const { isPending, mutate } = useMutation({
    mutationFn: (team: TAddTeamArgs) => addTeamService(team),
    onSuccess: ({
      data: {
        data: { id },
      },
    }) => onSuccess(id),
    onError,
  });

  return {
    isPending,
    mutate,
  };
};
