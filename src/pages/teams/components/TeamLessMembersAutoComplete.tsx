import { Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction } from "react";
import { TTeamlessUsersReturn } from "@/services/usersServices/usersServices.types";

type TProps = {
  handleChange: Dispatch<SetStateAction<TTeamlessUsersReturn>>;
  values: TTeamlessUsersReturn;
  options: TTeamlessUsersReturn;
};

function TeamLessMembersAutoComplete({
  handleChange,
  options,
  values,
}: TProps) {
  const [t] = useTranslation();

  return (
    <Autocomplete
      fullWidth
      multiple
      value={values}
      isOptionEqualToValue={(option, value) => option.user.id === value.user.id}
      onChange={(_, newValue) => {
        handleChange(
          newValue.map((item) => ({
            user: { id: item.user.id, email: item.user.email },
          }))
        );
      }}
      options={options}
      getOptionLabel={(option) => option.user.email}
      renderInput={(params) => <TextField {...params} label={t("members")} />}
    />
  );
}

export default TeamLessMembersAutoComplete;
