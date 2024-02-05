import { TAxiosResponseError } from "@/generalTypes";
import { useAddNewDesignationsMutation } from "@/mutations/useAddDesignationsMutation";
import CustomModal from "@/reusableComponents/customModal";
import { TDesignations } from "@/services/designationServices/designationServices.types";
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

export default function AddNewDesignations() {
  const [open, setOpen] = useState(false);
  const [t] = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TDesignations>();

  const onSuccess = () => {
    toast.success("Domain has been added");
    reset();
  };

  const onError = (error: TAxiosResponseError) => {
    toast.error(error.response?.data.message);
  };

  const { isPending, mutate } = useAddNewDesignationsMutation({
    onError,
    onSuccess,
  });

  const onSubmit = (values: TDesignations) => {
    mutate(values);
  };
  return (
    <Box>
      <Button onClick={() => setOpen(true)} fullWidth variant="contained">
        {t("addNewDesignation")}
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
            {t("addNewDesignation")}
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
            color={errors.name ? "error" : "primary"}
            type="number"
            // required
            fullWidth
            id="parentDesignationId"
            label={t("parentDesignationId")}
            autoFocus
            {...register("parentDesignationId", {
              // required: "parentDesignationId is required!",
            })}
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
