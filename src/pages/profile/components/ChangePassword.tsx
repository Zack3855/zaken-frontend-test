import CustomModal from "@/reusableComponents/customModal";
import InputWithEyeToggle from "@/reusableComponents/inputWIthEyeToggler";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface IFormInputs {
  label: string;
  key: keyof IFormValues;
}

const formInputs: IFormInputs[] = [
  { label: "oldPass", key: "oldPassword" },
  { label: "newPass", key: "newPassword" },
  { label: "confirmPass", key: "confirmPassword" },
];

function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [t] = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormValues>({ mode: "onChange" });

  const onSubmit = ({ oldPassword, newPassword }: IFormValues) => {
    console.log(oldPassword, newPassword);
  };

  return (
    <Box>
      <Button onClick={() => setOpen(true)} fullWidth variant="contained">
        {t("changePassword")}
      </Button>
      <CustomModal open={open} setOpen={setOpen}>
        <Typography textAlign="center" fontWeight="500">
          {t("changePassword")}
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
          {formInputs.map((item) => (
            <InputWithEyeToggle
              key={item.key}
              label={t(item.label)}
              color={errors[item.key] ? "error" : "primary"}
              error={
                !!errors[item.key] && errors[item.key]?.type === "validate"
              }
              helperText={
                errors[item.key]?.type === "validate"
                  ? errors[item.key]?.message
                  : undefined
              }
              registerProps={register(item.key, {
                required: `${item.label} is required!`,
                validate:
                  item.key === "confirmPassword"
                    ? (val: string) => {
                        if (watch("newPassword") !== val)
                          return "Passwords should match";
                      }
                    : undefined,
              })}
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            sx={{ width: "50%", marginBottom: 4 }}
          >
            {t("save")}
          </Button>
        </Box>
      </CustomModal>
    </Box>
  );
}

export default ChangePassword;
