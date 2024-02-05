// import { useGetCurrentUserDomainsQuery } from "@/queries/useGetCurrentUserDomains";
import { useGetUserDetailsQuery } from "@/queries/useGetUserDetailsQuery";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import NameContainer from "../profile/components/NameContainer";
import AddUserToDomain from "./components/AddUserToDomain";
import ChangeUserDomain from "./components/ChangeUserDomain";

function DetailsPage() {
  // const { data: userDomainData } = useGetCurrentUserDomainsQuery();
  const { userId } = useParams();
  const { data: userDetailsData } = useGetUserDetailsQuery(userId || "");

  if (!userDetailsData?.data.body) {
    return <Box>Details Couldn't found</Box>;
  }

  const {
    id,
    email,
    designation,
    userDomains, // eslint-disable-next-line no-unsafe-optional-chaining
  } = userDetailsData?.data?.body?.userInfo;
  return (
    <Box>
      <NameContainer title={"ID"} text={id} />
      <NameContainer title={"EMAIL"} text={email} />
      <NameContainer title={"Designation"} text={designation?.name} />
      {userDomains?.length &&
        userDomains?.map((item) => (
          <NameContainer
            key={item.id}
            title={`domain-${item.id}`}
            text={item.id}
          />
        ))}
      {userId}
      <AddUserToDomain userId={Number(userId)} />
      <ChangeUserDomain userId={Number(userId)} />
    </Box>
  );
}

export default DetailsPage;
