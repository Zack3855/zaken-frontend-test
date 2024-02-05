import { TAxiosResponseError } from "@/generalTypes";
import { useAddTeamMutation } from "@/mutations/useAddTeamMutation";
import { useGetAllDepartmentsQuery } from "@/queries/useGetAllDepartments";
// import { useGetTeamlessUsersQuery } from "@/queries/useGetTeamlessUsersQuery";
import CustomModal from "@/reusableComponents/customModal";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import TeamLessMembersAutoComplete from "./TeamLessMembersAutoComplete";
import { useAddTeamMembersMutation } from "@/mutations/useAddTeamMembersMutation";
import { useGetTeamlessUsersQuery } from "@/queries/useGetTeamlessUsersQuery";
import { TTeamlessUsersReturn } from "@/services/usersServices/usersServices.types";

export interface IFormValues {
  name: string;
  teamLead: number;
  department: number;
  members: number;
}

function AddNewTeam() {
  const [open, setOpen] = useState(false);
  const [t] = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    watch,
  } = useForm<IFormValues>({
    defaultValues: {
      name: "",
      department: 0,
    },
  });

  const departmentId = watch("department");
  const { data: teamlessUsersData } = useGetTeamlessUsersQuery(departmentId);
  const [teamlessUsers, setTeamlessUsers] = useState<TTeamlessUsersReturn>(
    teamlessUsersData || []
  );

  const onSuccessMembers = () => {
    toast.success("Team Member has been added");
  };

  const onErrorMembers = (error: TAxiosResponseError) => {
    toast.error(error.response?.data.message);
  };
  const { mutate: mutateMembers } = useAddTeamMembersMutation({
    onSuccess: onSuccessMembers,
    onError: onErrorMembers,
  });
  const onSuccess = (id: number) => {
    toast.success("Team has been added");
    console.log(errors);
    if (!teamlessUsersData?.length) return;
    const dataMapped = {
      team: id,
      teamMembers: teamlessUsers.map((item) => item.user.id),
      department: departmentId,
    };
    mutateMembers(dataMapped);
    reset();
    setOpen(false);
  };

  const onError = (error: TAxiosResponseError) => {
    toast.error(error.response?.data.message);
  };

  const { data: departmentsData, isPending: departmentsIsPending } =
    useGetAllDepartmentsQuery();

  const { mutate } = useAddTeamMutation({ onError, onSuccess });

  const onSubmit = ({ members, ...values }: IFormValues) => {
    mutate(values);
    console.log(members);
  };

  return (
    <Box>
      <Button
        sx={{ width: "200px", height: "100%" }}
        onClick={() => setOpen(true)}
        fullWidth
        variant="contained"
      >
        {t("AddNewTeam")}
      </Button>
      <CustomModal open={open} setOpen={setOpen}>
        <Typography textAlign="center" fontWeight="500">
          {t("AddNewTeam")}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2.5}
        >
          <TextField
            color={errors.name ? "error" : "primary"}
            defaultValue={""}
            fullWidth
            id="name"
            label={t("name")}
            {...register("name", { required: "Name is required!" })}
          />
          {departmentsData && (
            <Controller
              name="department"
              defaultValue={0}
              control={control}
              rules={{ required: "Department is required" }}
              render={({ field }) => {
                const { onChange } = field;
                return (
                  <Autocomplete
                    fullWidth
                    onChange={(_, newValue) => {
                      onChange(newValue?.id);
                    }}
                    options={departmentsData.body.departments}
                    getOptionLabel={(option) => option.name}
                    loading={departmentsIsPending}
                    renderInput={(params) => (
                      <TextField {...params} label={t("department")} />
                    )}
                  />
                );
              }}
            />
          )}
          {departmentId && teamlessUsersData?.length ? (
            <TeamLessMembersAutoComplete
              options={teamlessUsersData}
              values={teamlessUsers}
              handleChange={setTeamlessUsers}
            />
          ) : departmentId ? (
            <Typography variant="h6" color="error">
              There are no teamless agents left
            </Typography>
          ) : null}
          <Button type="submit" variant="contained">
            {t("save")}
          </Button>
        </Box>
      </CustomModal>
    </Box>
  );
}

export default AddNewTeam;
