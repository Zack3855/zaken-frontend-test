import { InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function SearchWithDebounce() {
  const [params, setParams] = useSearchParams();
  const search = params.get("search") || "";
  const [state, setState] = useState(search);
  const [t] = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state === "") {
        params.delete("search");
        setParams(params);
      } else {
        setParams((params) => {
          params.set("search", state);
          params.delete("page");
          return params;
        });
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [state, params, setParams]);

  return (
    <TextField
      onChange={(e) => {
        setState(e.target.value);
      }}
      value={state}
      placeholder={t("search")}
      sx={(theme) => ({
        width: "200px",
        "& .Mui-focused .MuiInputAdornment-root:first-child svg": {
          color: theme.palette.secondary.main,
        },
      })}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlinedIcon />
          </InputAdornment>
        ),
      }}
      color={"secondary"}
    />
  );
}

export default SearchWithDebounce;
