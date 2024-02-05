import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignInMutation } from "../../mutations/useSignInMutation";
import { LinearProgress } from "@mui/material";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

interface IFormFields {
  email: string;
  password: string;
}

export default function SignInPage() {
  const [t] = useTranslation();
  const { register, handleSubmit } = useForm<IFormFields>();
  const { isPending, mutate } = useSignInMutation();

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return <Navigate to="/choose-domain" />;
  }

  const onSubmit: SubmitHandler<IFormFields> = ({ email, password }) => {
    mutate({ email: email.trim(), password: password.trim() });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("signIn")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label={t("emailAddress")}
            {...register("email", { required: "Email is required" })}
          />
          <TextField
            margin="normal"
            fullWidth
            label={t("password")}
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={t("rememberMe")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isPending}
          >
            {t("signIn")}
          </Button>
          {isPending && <LinearProgress sx={{ marginTop: 2 }} />}
        </Box>
      </Box>
    </Container>
  );
}
