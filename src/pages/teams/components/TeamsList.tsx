import {
  Paper,
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { useGetAllTeamsQuery } from "@/queries/useGetAllTeamsQuery";
import { Link, useSearchParams } from "react-router-dom";
import { useDeleteTeamMutation } from "@/mutations/useDeleteTeamMutation";
import { toast } from "react-toastify";
import { forwardRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TransitionProps } from "@mui/material/transitions";
import { usePagination } from "@/hooks/usePagination";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TeamList() {
  const [confirmModalOpener, setConfirmModalOpener] = useState(false);
  const [teamId, setTeamId] = useState(0);
  const queryClient = useQueryClient();
  const [page, changePage] = usePagination();
  const [params] = useSearchParams();
  const department = params.get("department") || "";
  const teamName = params.get("search") || "";

  const onSuccess = () => {
    toast.success("Team Deleted");
    setConfirmModalOpener(false);
    queryClient.invalidateQueries({ queryKey: ["getAllTeams"] });
  };

  const onError = () => {
    toast.error("Error");
  };

  const { mutate: deleteTeam } = useDeleteTeamMutation({
    onSuccess,
    onError,
  });

  const handleDelete = () => {
    deleteTeam(teamId);
  };

  const { data, isLoading } = useGetAllTeamsQuery({
    page,
    pageSize: 14,
    department,
    teamName,
  });

  return (
    <Box display="flex" flexDirection="column" gap={2.5}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Team Lead
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Department
              </TableCell>

              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Details
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Delete Team
              </TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <Box
              sx={{
                padding: 3,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <TableBody>
              {data?.body?.teams.length
                ? data?.body.teams.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell align="right">{item.name}</TableCell>
                      <TableCell align="right">Team Lead</TableCell>
                      <TableCell align="right">
                        {item.department?.name}
                      </TableCell>
                      <TableCell align="right">
                        <Link to={`/team-details/${item.id}`}>
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
                            setTeamId(item.id);
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
          )}
        </Table>
      </TableContainer>
      <Box width={"100%"} display={"flex"} justifyContent={"flex-end"}>
        <Pagination
          count={data?.body.pageInfo?.totalPages}
          page={page}
          onChange={changePage}
        />
      </Box>
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
            {"Are you sure you want to delete this Team ?"}
          </DialogTitle>

          <DialogActions>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="secondary"
            >
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

export default TeamList;
