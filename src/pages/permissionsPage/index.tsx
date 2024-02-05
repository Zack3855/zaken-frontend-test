// import { useGetPermissions } from "@/queries/useGetPermissionsQuery";
import { Box, Switch, Typography } from "@mui/material";
// import { useParams } from "react-router-dom";

const permissionsData = [
  {
    name: "permission1",
    value: true,
  },
  {
    name: "permission2",
    value: false,
  },
  { name: "permission3", value: false },
];

function PermissionsPage() {
  // const { data } = useGetPermissions();
  // const { userId } = useParams();
  // console.log(userId);
  // console.log(data);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {permissionsData.map((item) => (
        <Box
          key={item.name}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          <Typography variant="subtitle2">{item.name}</Typography>
          <Switch checked={item.value} />
        </Box>
      ))}
    </Box>
  );
}

export default PermissionsPage;
