import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type TCustomModalProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function CustomModal({ children, open, setOpen }: TCustomModalProps) {
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus
      >
        <Box
          borderRadius={2}
          minWidth="350px"
          width="40%"
          display="flex"
          flexDirection="column"
          gap={2}
          alignItems="center"
          position="absolute"
          padding={2.5}
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
          }}
        >
          <CloseIcon
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              left: "10px",
              top: "10px",
              fontSize: "25px",
              cursor: "pointer",
            }}
          />
          <Box
            marginTop={5}
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            {children}
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default CustomModal;
