import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UseFormRegisterReturn } from "react-hook-form";

interface IPasswordTextField {
  label: string;
  color: "error" | "primary";
  error?: boolean;
  helperText?: string;
  // ! This needs to be fixed for reusability
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerProps?: UseFormRegisterReturn<any>;
}

function InputWithEyeToggle({
  label,
  registerProps,
  color,
  error,
  helperText,
}: IPasswordTextField) {
  const [visibility, setVisibility] = useState(false);

  return (
    <TextField
      fullWidth
      error={error}
      label={label}
      color={color}
      type={visibility ? "text" : "password"}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setVisibility((prev) => !prev)}
              edge="end"
            >
              {visibility ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...registerProps}
    />
  );
}

export default InputWithEyeToggle;
