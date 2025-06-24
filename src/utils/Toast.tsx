import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";

interface ToastProps {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  open,
  message,
  severity = "info",
  onClose,
}) => {
  const location = useLocation();

  const horizontalPosition = location.pathname === "/" ? "left" : "center";

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: horizontalPosition }}
      sx={{ width: "100%" }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
