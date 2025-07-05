import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { IoCloseOutline } from "react-icons/io5";
//import api from "../utils/axiosInstance";
import Toast from "../../utils/Toast";
import api from "../../utils/axiosInstance";

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

interface PasswordData {
  curPassword: string;
  newPassword: string;
}

const ChangePassword = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState<PasswordData>({
    curPassword: "",
    newPassword: "",
  });

  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    severity: "info",
  });

  const showToast = (message: string, severity: ToastState["severity"]) => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPasswordData({
      curPassword: "",
      newPassword: "",
    });
  };

  const stored = localStorage.getItem("adminData");
  const originalAdminData = stored ? JSON.parse(stored) : null;

  const submit = async () => {
    try {
      setLoading(true);
      const response = await api.put(
        `api/admin/change-password/${originalAdminData?._id}`,
        passwordData
      );

      if (response.data.success) {
        showToast(response.data.message, "success");

        setTimeout(() => {
          setOpen(false);
        }, 2000);
      }
    } catch (error: any) {
      if (error.response.data.error) {
        console.log(error);
        setLoading(false);
        showToast(error.response.data.error, "error");
        return;
      }
    }
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        disableElevation
        sx={{
          width: "373px",
          paddingX: "10px",
          paddingY: "10px",
          borderRadius: "12px",
          backgroundColor: "#1358A3",
          textTransform: "capitalize",
          fontFamily: "Open Sans, sans-serif",
        }}
      >
        <Typography
          fontWeight={600}
          fontSize={14}
          fontFamily="Open Sans, sans-serif"
        >
          Change password
        </Typography>
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Toast
          open={toast.open}
          message={toast.message}
          severity={toast.severity}
          onClose={handleCloseToast}
        />
        <DialogTitle>
          <div className="flex justify-between items-center">
            <Typography
              fontWeight={600}
              sx={{ color: "#081421", fontFamily: "Open Sans, sans-serif" }}
              fontSize={24}
            >
              Change password
            </Typography>
            <Button sx={{ color: "black" }} onClick={handleClose}>
              <IoCloseOutline className="w-[1.5rem] h-[1.5rem] " />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent sx={{ width: "550px" }}>
          <Box sx={{ width: "100%" }}>
            <div className="flex flex-col gap-[15px]">
              <div>
                <Typography
                  fontWeight={400}
                  sx={{
                    color: "#1D2739",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Current password
                </Typography>
                <TextField
                  name="curPassword"
                  value={passwordData.curPassword}
                  onChange={handleChange}
                  type="text"
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </div>

              <div>
                <Typography
                  fontWeight={400}
                  sx={{
                    color: "#1D2739",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  New password
                </Typography>
                <TextField
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  type="text"
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </div>

              <Button
                onClick={submit}
                disabled={loading}
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#1358A3",
                  textTransform: "capitalize",
                  fontFamily: "Open Sans, sans-serif",
                }}
              >
                {loading ? "Changing..." : "Submit"}
              </Button>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangePassword;
