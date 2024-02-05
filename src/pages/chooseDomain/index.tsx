import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/material/Container";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { Box, InputAdornment, TextField } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import AxiosWrapper from "@/AxiosWrapper";
import { useTranslation } from "react-i18next";
import { useGetCurrentUserDomainsQuery } from "@/queries/useGetCurrentUserDomains";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function ChooseDomain() {
  const { data } = useGetCurrentUserDomainsQuery();
  const queryClient = useQueryClient();

  const [searchText, setSearchText] = useState("");

  const saveToLocal = (value: number) => {
    localStorage.setItem("domainId", value.toString());
    queryClient.clear();
  };
  const navigate = useNavigate();
  const [t] = useTranslation();
  const {
    authState: { accessToken },
  } = useAuth();
  if (!accessToken) {
    return <Navigate to="/sign-in" replace />;
  }

  if (data?.body.domains.length === 1) {
    saveToLocal(data?.body.domains[0].id);
    return <Navigate to="/" />;
  }
  return (
    <AxiosWrapper>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          {t("chooseDomain")}
          <TextField
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            value={searchText}
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
          <Box display={"flex"} gap={3} marginTop={4}>
            {data?.body.domains
              .filter((filtered) => filtered.name.includes(searchText))
              .map((item) => {
                if (item.name.includes(searchText))
                  return (
                    <Box
                      onClick={() => {
                        saveToLocal(item.id);
                        navigate("/");
                      }}
                      width={"150px"}
                      height={"150px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      border={1}
                      borderRadius={4}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#EEF5FF",
                        },
                      }}
                    >
                      {item.name}
                    </Box>
                  );
              })}
          </Box>
        </Box>
      </Container>
    </AxiosWrapper>
  );
}
