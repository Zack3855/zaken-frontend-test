import { TAxiosResponseError } from "@/generalTypes";
import { useAddDepartmentMutation } from "@/mutations/useAddDepartmentMutation";
import { useGetAllDepartmentsQuery } from "@/queries/useGetAllDepartments";
import CustomModal from "@/reusableComponents/customModal";
import { TDepartments } from "@/services/departmentServices/departmentServices.types";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function AddNewDepartment() {
  const [open, setOpen] = useState(false);
  const [t] = useTranslation();
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TDepartments>();

  const { data: departmentsData } = useGetAllDepartmentsQuery();

  const onSuccess = () => {
    toast.success("Department has been added");
    queryClient.invalidateQueries({ queryKey: ["getAllDepartments"] });
    reset();
    setOpen(false);
  };

  const onError = (error: TAxiosResponseError) => {
    toast.error(error.response?.data.message);
  };

  const { isPending, mutate } = useAddDepartmentMutation({
    onError,
    onSuccess,
  });

  const onSubmit = (values: TDepartments) => {
    mutate(values);
  };
  return (
    <Box>
      <Button
        onClick={() => setOpen(true)}
        sx={{ width: "200px", height: "100%" }}
        fullWidth
        variant="contained"
      >
        {t("addNewDepartment")}
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
            {t("addNewDepartment")}
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
            select
            color={errors.name ? "error" : "primary"}
            type="number"
            // required
            fullWidth
            id="parentDesignationId"
            label={t("parentDepartmentId")}
            autoFocus
            {...register("parentDepartmentId", {
              // required: "parentDesignationId is required!",
            })}
          >
            {departmentsData?.body.departments.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
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
