import { TAxiosResponseError } from "@/generalTypes";
import { useChangeUserDomainMutation } from "@/mutations/useChangeUserDomainMutation";
import { useGetAllRolesQuery } from "@/queries/useGetAllRollesQuery";
import { useGetCurrentUserDomainsQuery } from "@/queries/useGetCurrentUserDomains";
import CustomModal from "@/reusableComponents/customModal";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type TFields = {
  destinationDomainId: number;
  role: string;
};
function ChangeUserDomain({ userId }: { userId: number }) {
  const [open, setOpen] = useState(false);
  const { handleSubmit, reset, control, watch } = useForm<TFields>();
  const destinationDomainId = watch("destinationDomainId");
  const { data: rolesData, isPending: rolesPending } =
    useGetAllRolesQuery(destinationDomainId);

  const { data: domainsData } = useGetCurrentUserDomainsQuery();
  const domainId = localStorage.getItem("domainId");
  const [t] = useTranslation();
  const queryClient = useQueryClient();
  const onSuccess = () => {
    toast.success("Users domain has been changed");
    queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    setOpen(false);
    reset();
  };

  const onError = (error: TAxiosResponseError) => {
    toast.error(error.response?.data.message);
  };

  const { mutate, isPending: addUserPending } = useChangeUserDomainMutation({
    onSuccess,
    onError,
  });

  const onSubmit = (values: TFields) => {
    mutate({ ...values, userId });
    reset();
  };
  return (
    <Box>
      <Button
        sx={{ width: "200px", height: "100%" }}
        onClick={() => setOpen(true)}
        fullWidth
        variant="contained"
      >
        {t("ChangeUserDomain")}
      </Button>
      <CustomModal open={open} setOpen={setOpen}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2.5}
        >
          <Typography textAlign="center" fontWeight="500">
            {t("ChangeUserDomain")}
          </Typography>

          {domainsData && (
            <Controller
              name="destinationDomainId"
              control={control}
              render={({ field }) => {
                const { onChange } = field;
                return (
                  <Autocomplete
                    fullWidth
                    onChange={(_, newValue) => {
                      onChange(newValue?.id);
                    }}
                    options={domainsData.body.domains.filter(
                      (item) => item.id !== Number(domainId)
                    )}
                    getOptionLabel={(option) => option.name}
                    loading={rolesPending}
                    renderInput={(params) => (
                      <TextField {...params} label={t("destinationDomainId")} />
                    )}
                  />
                );
              }}
            />
          )}
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
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "50%", marginBottom: 4 }}
          >
            {t("save")}
          </Button>
          {addUserPending && <CircularProgress />}
        </Box>
      </CustomModal>
    </Box>
  );
}

export default ChangeUserDomain;
