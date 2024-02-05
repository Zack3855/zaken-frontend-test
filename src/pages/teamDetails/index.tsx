import { useGetTeamDetailsQuery } from "@/queries/useGetTeamDetailsQuery";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import NameContainer from "../profile/components/NameContainer";
import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useRemoveUserFromTeam } from "@/mutations/useRemoveMembersFromTeam";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TeamDetails() {
  const { teamId } = useParams();
  const [confirmModalOpener, setConfirmModalOpener] = useState(false);
  const [memberId, setMemberId] = useState(0);
  const { data } = useGetTeamDetailsQuery(teamId || "");
  const queryClient = useQueryClient();

  const onSuccess = () => {
    toast.success("Team Deleted");
    setConfirmModalOpener(false);
    queryClient.invalidateQueries({ queryKey: ["getTeamDetails"] });
  };

  const onError = () => {
    toast.error("Error");
  };
  const { mutate } = useRemoveUserFromTeam({ onSuccess, onError });
  if (!data?.data) {
    return <Box>Details unavailable</Box>;
  }
  const { members } = data.data;

  const deleteTeam = () => {
    mutate({ teamId: Number(data.data.id), memberId });
  };
  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <NameContainer title={"ID"} text={data.data.id} />
      <NameContainer title={"Name"} text={data.data.name} />
      <NameContainer title={"Department"} text={data.data.department.name} />
      <NameContainer title={"Team Lead"} text={data.data.teamLead || "None"} />
      <Divider />
      <Typography width={"25%"} fontWeight={700}>
        {"Members"}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Details
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Delete Team
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {members.length
              ? members.map((item) => (
                  <TableRow key={item.user.id}>
                    <TableCell>{item.user.id}</TableCell>
                    <TableCell align="right">{item.user.email}</TableCell>

                    <TableCell align="right">
                      <Link to={`/user-details/${item.user.id}`}>
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ width: "120px" }}
                        >
                          Details
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => {
                          setMemberId(item.user.id);
                          setConfirmModalOpener(true);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={confirmModalOpener}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setConfirmModalOpener(false)}
        aria-describedby="alert-dialog-slide-description"
        sx={{ padding: "30px" }}
      >
        <Box padding={3}>
          <DialogTitle>
            {`Are you sure you want to remove this user from this Team: "${data.data.name}" ?`}
          </DialogTitle>

          <DialogActions>
            <Button onClick={deleteTeam} variant="contained" color="secondary">
              Yes
            </Button>
            <Button
              onClick={() => {
                setConfirmModalOpener(false);
              }}
              variant="contained"
            >
              No
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}

export default TeamDetails;
