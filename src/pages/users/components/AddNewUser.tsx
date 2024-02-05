import { TAxiosResponseError } from "@/generalTypes";
import { useSignUpMutation } from "@/mutations/useSignUpMutation";
import { useGetAllDepartmentsQuery } from "@/queries/useGetAllDepartments";
import { useGetAllRolesQuery } from "@/queries/useGetAllRollesQuery";
import { useGetDesignationsQuery } from "@/queries/useGetDesignationsQuery";
import CustomModal from "@/reusableComponents/customModal";
import InputWithEyeToggle from "@/reusableComponents/inputWIthEyeToggler";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface IFormValues {
  email: string;
  role: string;
  password: string;
  identifier: number;
  designationId: number;
  reportingToId: number;
  departmentId: number;
}

function AddNewUser() {
  const [open, setOpen] = useState(false);
  const [t] = useTranslation();
  const queryCLient = useQueryClient();
  const domainId = localStorage.getItem("domainId") || "";
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<IFormValues>();

  const onSuccess = () => {
    toast.success("User has been added");
    queryCLient.invalidateQueries({ queryKey: ["getAllUsers"] });
    setOpen(false);
    reset();
  };

  const { data: designationsData } = useGetDesignationsQuery();
  const { data: departmentsData } = useGetAllDepartmentsQuery();

  const onError = (error: TAxiosResponseError) => {
    toast.error(error.response?.data.message);
  };

  const { data: rolesData, isPending: rolesPending } = useGetAllRolesQuery(
    Number(domainId)
  );

  const { mutate } = useSignUpMutation({ onError, onSuccess });

  const onSubmit = (values: IFormValues) => {
    mutate(values);
  };

  return (
    <Box>
      <Button
        sx={{ width: "200px", height: "100%" }}
        onClick={() => setOpen(true)}
        fullWidth
        variant="contained"
      >
        {t("addNewUser")}
      </Button>
      <CustomModal open={open} setOpen={setOpen}>
        <Typography textAlign="center" fontWeight="500">
          {t("addNewUser")}
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
            color={errors.email ? "error" : "primary"}
            required
            fullWidth
            id="email"
            label={t("email")}
            autoFocus
            {...register("email", { required: "First email is required!" })}
          />
          <InputWithEyeToggle
            key="password"
            label={t("password")}
            color={errors.password ? "error" : "primary"}
            error={!!errors.password && errors.password?.type === "validate"}
            helperText={
              errors.password?.type === "validate"
                ? errors.password?.message
                : undefined
            }
            registerProps={register("password", {
              required: `Password is required!`,
            })}
          />
          {rolesData && (
            <Controller
              name="role"
              defaultValue=""
              control={control}
              render={({ field }) => {
                const { onChange } = field;
                return (
                  <Autocomplete
                    fullWidth
                    onChange={(_, newValue) => {
                      onChange(newValue?.name);
                    }}
                    options={rolesData.body.roles}
                    getOptionLabel={(option) => option.name}
                    loading={rolesPending}
                    renderInput={(params) => (
                      <TextField {...params} label={t("role")} />
                    )}
                  />
                );
              }}
            />
          )}
          {designationsData?.data && (
            <Controller
              name="designationId"
              defaultValue={0}
              control={control}
              render={({ field }) => {
                const { onChange } = field;
                return (
                  <Autocomplete
                    fullWidth
                    onChange={(_, newValue) => {
                      onChange(newValue?.id);
                    }}
                    options={designationsData.data.body.designations}
                    getOptionLabel={(option) => option.name}
                    loading={rolesPending}
                    renderInput={(params) => (
                      <TextField {...params} label={t("designation")} />
                    )}
                  />
                );
              }}
            />
          )}
          {departmentsData && (
            <Controller
              name="departmentId"
              defaultValue={0}
              control={control}
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
                    loading={rolesPending}
                    renderInput={(params) => (
                      <TextField {...params} label={t("department")} />
                    )}
                  />
                );
              }}
            />
          )}
          <Button type="submit" variant="contained">
            {t("save")}
          </Button>
        </Box>
      </CustomModal>
    </Box>
  );
}

export default AddNewUser;
