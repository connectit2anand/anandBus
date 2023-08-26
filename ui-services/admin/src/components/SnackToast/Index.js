import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";

const SnackToast = ({ open, onClose, severity, message }) => {
  return (

        <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
          
          <Alert 
            elevation={6}
            variant="filled"
            onClose={onClose}
            severity={severity}
          >
            {message}
          </Alert>
        </Snackbar>
    
  );
};

export default SnackToast;
