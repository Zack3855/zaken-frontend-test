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
  Pagination,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { useGetAllUsersQuery } from "@/queries/useGetAllUsersQuery";
import { usePagination } from "@/hooks/usePagination";
import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { TAxiosResponseError } from "@/generalTypes";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDeactivateUserMutation } from "@/mutations/useDeactivateUser";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function UsersList() {
  const [page, changePage] = usePagination();
  const [confirmModalOpener, setConfirmModalOpener] = useState(false);
  const [userToDeactive, setUserToDeactive] = useState(0);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("search") || "";
  const role = searchParams.get("userRole") || "";
  const { data } = useGetAllUsersQuery({ page, pageSize: 14, email, role });
  const handleClick = (id: number) => {
    setConfirmModalOpener(true);
    setUserToDeactive(id);
  };

  const queryClient = useQueryClient();
  const onSuccess = () => {
    toast.success("User has been deactived");
    queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    setConfirmModalOpener(false);
  };
  const onError = (error: TAxiosResponseError) => {
    toast.error(error.response?.data.message);
  };
  const { mutate } = useDeactivateUserMutation({ onSuccess, onError });

  const handleDeactive = () => {
    mutate(userToDeactive);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2.5}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Role
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Permissions
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Details
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Deactivate
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data?.body?.users?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell align="right">{item.email}</TableCell>
                  <TableCell align="right">{item.role.name}.</TableCell>
                  <TableCell align="right">
                    <Link to={`/permissions/${item.id}`}>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ width: "120px" }}
                      >
                        Permissions
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/user-details/${item.id}`}>
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
                      onClick={() => handleClick(item.id)}
                      disabled={item.isDeactivated}
                    >
                      Deactivate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
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
            {"Are you sure you want to dactivate this user?"}
          </DialogTitle>

          <DialogActions>
            <Button
              onClick={handleDeactive}
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

export default UsersList;
