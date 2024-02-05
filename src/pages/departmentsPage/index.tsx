import SearchWithDebounce from "@/reusableComponents/SearchWithDebounce";
import { Box } from "@mui/material";
import AddNewDepartment from "./components/AddNewDepartment";
import DepartmentsListing from "./components/DepartmentsListing";

function DepartmentsPage() {
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
          <AddNewDepartment />
          <SearchWithDebounce />
        </Box>
      </Box>
      <DepartmentsListing />
    </Box>
  );
}

export default DepartmentsPage;
