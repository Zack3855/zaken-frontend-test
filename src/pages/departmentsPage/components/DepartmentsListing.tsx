import { TAxiosResponseError } from "@/generalTypes";
import { useDeleteDepartmentMutation } from "@/mutations/useDeleteDepartmentMutation";
import { useGetAllDepartmentsQuery } from "@/queries/useGetAllDepartments";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DepartmentsListing() {
  const { data } = useGetAllDepartmentsQuery();
  const [confirmModalOpener, setConfirmModalOpener] = useState(false);
  const [departmentToDelete, setDetapertmentToDelete] = useState(0);
  const queryClient = useQueryClient();
  const onSuccess = () => {
    toast.success("Department has been added");
    queryClient.invalidateQueries({ queryKey: ["getAllDepartments"] });
    setConfirmModalOpener(false);
  };
  const onError = (error: TAxiosResponseError) => {
    toast.error(error.response?.data.message);
  };
  const { mutate } = useDeleteDepartmentMutation({ onSuccess, onError });

  const deleteDepartment = (id: number) => {
    setDetapertmentToDelete(id);
    setConfirmModalOpener(true);
  };

  const handleDelete = () => {
    mutate(departmentToDelete);
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
                Parent
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.body.departments &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data?.body.departments.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell align="right">{item.name}.</TableCell>

                  <TableCell align="right">
                    {item.parentDepartment?.name || "Parrent"}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => deleteDepartment(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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

export default DepartmentsListing;
