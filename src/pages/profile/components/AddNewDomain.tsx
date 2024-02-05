import { TAxiosResponseError } from "@/generalTypes";
import { useAddDomainMutation } from "@/mutations/useAddDomainMutation";
import CustomModal from "@/reusableComponents/customModal";
import { TNewDomainArgs } from "@/services/domainServices/domain.types";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function AddNewDomain() {
  const [open, setOpen] = useState(false);
  const [t] = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TNewDomainArgs>();

  const onSuccess = () => {
    toast.success("Domain has been added");
    reset();
  };

  const onError = (error: TAxiosResponseError) => {
    toast.error(error.response?.data.message);
  };

  const { isPending, mutate } = useAddDomainMutation({ onError, onSuccess });

  const onSubmit = (values: TNewDomainArgs) => {
    mutate(values);
  };
  return (
    <Box>
      <Button onClick={() => setOpen(true)} fullWidth variant="contained">
        {t("addNewDomain")}
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
            {t("addNewDomain")}
          </Typography>

          <TextField
            color={errors.name ? "error" : "primary"}
            required
            fullWidth
            id="name"
            label={t("name")}
            autoFocus
            {...register("name", { required: "First name is required!" })}
          />
          <TextField
            color={errors.url ? "error" : "primary"}
            required
            fullWidth
            id="url"
            label={t("url")}
            autoFocus
            {...register("url", { required: "host is required!" })}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ width: "50%", marginBottom: 4 }}
          >
            {t("save")}
          </Button>
          {isPending && <CircularProgress />}
        </Box>
      </CustomModal>
    </Box>
  );
}
