import { Box, MenuItem, Select } from "@mui/material";
import SearchWithDebounce from "@/reusableComponents/SearchWithDebounce";
import TeamsList from "./components/TeamsList";
import AddNewTeam from "./components/AddNewTeam";
import { useGetAllDepartmentsQuery } from "@/queries/useGetAllDepartments";
import { useFilterParams } from "@/hooks/useFilterParams";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

function TeamsPage() {
  const { data } = useGetAllDepartmentsQuery();
  const [params] = useSearchParams();
  const department = params.get("teamDepartments") || "";
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
          <AddNewTeam />
          <SearchWithDebounce />
          <Select
            onChange={(e) => filterParams(e, "teamDepartments")}
            value={department}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={t("filterByDepartment")}
            color="secondary"
            sx={(theme) => ({
              width: "200px",
              "& .Mui-focused .MuiInputAdornment-root:first-child svg": {
                color: theme.palette.secondary.main,
              },
            })}
          >
            <MenuItem value="">All</MenuItem>
            {data?.body.departments &&
              data?.body.departments.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </Box>
      </Box>
      <TeamsList />
    </Box>
  );
}

export default TeamsPage;
