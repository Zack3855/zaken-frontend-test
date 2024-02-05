import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Layout from "@/layout";
import SignInPage from "@/pages/sign-in";
import Profile from "@/pages/profile";
import UsersPage from "@/pages/users";
import ChooseDomain from "@/pages/chooseDomain";
import PermissionsPage from "@/pages/permissionsPage";
import TeamsPage from "@/pages/teams";
import DepartmentsPage from "@/pages/departmentsPage";
import DetailsPage from "@/pages/userDetailsPage";
import TeamDetails from "@/pages/teamDetails";

function RoutesWrapper() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Box>Home</Box>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/permissions/:userId" element={<PermissionsPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/team-details/:teamId" element={<TeamDetails />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/user-details/:userId" element={<DetailsPage />} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/choose-domain" element={<ChooseDomain />} />
      </Routes>
    </>
  );
}

export default RoutesWrapper;
