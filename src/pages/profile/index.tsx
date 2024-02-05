import { Box } from "@mui/material";
import ChangePassword from "./components/ChangePassword";
import { useGetCurrentUserQuery } from "@/queries/useGetCurrentUserQuery";
import NameContainer from "./components/NameContainer";
import AddNewDomain from "./components/AddNewDomain";
import { withPermissions } from "@/hocs/withPermissions";
import AddNewDesignations from "./components/AddNewDesignation";
import AddNewDepartment from "../departmentsPage/components/AddNewDepartment";

const WrappedAddNewDomain = withPermissions(AddNewDomain, ["edisst"]);

function Profile() {
  const { data } = useGetCurrentUserQuery();
  console.log(data);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <NameContainer title="id" text={data?.body.user.id || 0} />
      <NameContainer title="email" text={data?.body.user.email || ""} />
      <Box width={"40%"} display="flex" flexDirection="column" gap={2}>
        <ChangePassword />
        <AddNewDesignations />
        <AddNewDomain />
        <WrappedAddNewDomain />
        <AddNewDepartment />
      </Box>
    </Box>
  );
}

export default Profile;
