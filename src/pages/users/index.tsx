import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import SearchWithDebounce from "@/reusableComponents/SearchWithDebounce";
import UsersList from "./components/UsersList";
import AddNewUser from "./components/AddNewUser";
import { useGetAllRolesQuery } from "@/queries/useGetAllRollesQuery";
import { useTranslation } from "react-i18next";
import { useFilterParams } from "@/hooks/useFilterParams";

function UsersPage() {
  const [params] = useSearchParams();
  const role = params.get("userRole") || "";
  const domainId = localStorage.getItem("domainId") || "";
  const { data: rolesData } = useGetAllRolesQuery(Number(domainId));
  const [t] = useTranslation();

  const filterParams = useFilterParams();

  return (
    <Box sx={{ paddingBottom: 3 }}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-end"}
        alignItems={"flex-end"}
        gap={3}
        marginBottom={3}
      >
        <Box display={"flex"} gap={3} flexWrap={"wrap"}>
          <AddNewUser />
          <SearchWithDebounce />
          <FormControl sx={{ width: "200px" }}>
            <InputLabel id="demo-simple-select-label" color="secondary">
              {t("filterByRole")}
            </InputLabel>
            <Select
              onChange={(e) => filterParams(e, "userRole")}
              value={role}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={t("filterByRole")}
              color="secondary"
            >
              <MenuItem value="">All</MenuItem>
              {rolesData &&
                rolesData.body.roles.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <UsersList />
    </Box>
  );
}

export default UsersPage;
