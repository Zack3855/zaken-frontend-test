import { TMutationParams } from "@/generalTypes";
import { addTeamMembersService } from "@/services/teamServices";
import { TAddTeamMembersArgs } from "@/services/teamServices/teamServices.types";
import { useMutation } from "@tanstack/react-query";

export const useAddTeamMembersMutation = ({
  onSuccess,
  onError,
}: TMutationParams) => {
  const { isPending, mutate } = useMutation({
    mutationFn: (team: TAddTeamMembersArgs) => addTeamMembersService(team),
    onSuccess,
    onError,
  });

  return {
    isPending,
    mutate,
  };
};
