import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

//import api from "../../utils/axiosInstance";
import Toast from "../../utils/Toast";

interface AdminDetails {
  name: string;
  email: string;
  role: string;
  suspended: string;
  id: string;
}

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

interface DeleteProps {
  adminData?: AdminDetails;
  refreshAdmins?: () => void;
}

const Edit_Admin: React.FC<DeleteProps> = ({ adminData }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    setOpen(false);
  };

  const [focusedFields, setFocusedFields] = useState({
    name: false,
    email: false,
    role: false,
  });

  const handleFocus = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: false }));
  };

  const submit = async () => {
    setLoading(true);

    try {
      //   const response = await api.delete(`/api/admin/delete/${adminData.id}`);

      //   if (response.data) {
      //     showToast(response.data.success, "success");

      //     setTimeout(() => {
      //       refreshAdmins();
      //     }, 2000);
      //   }
      showToast("Admin data updated", "success");
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
        disableElevation
        variant="contained"
        sx={{
          width: "165px",
          padding: "10px",
          borderRadius: "12px",
          backgroundColor: "#0167C4",
          textTransform: "capitalize",
        }}
        onClick={handleClickOpen}
      >
        Add Admin
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="add-admin-dialog-description"
      >
        <Toast
          open={toast.open}
          message={toast.message}
          severity={toast.severity}
          onClose={handleCloseToast}
        />
        <DialogTitle>
          <div className="flex flex-col gap-[8px]">
            <Typography fontWeight={500} fontSize={24} color="#1D1F2C">
              Add Admin
            </Typography>

            <Typography fontWeight={400} fontSize={16} color="#667085">
              An email will be sent to this user to join the platform and
              control the post from these admin panel.
            </Typography>
          </div>

          {/* <div className="flex justify-end">
            <Button
              sx={{
                color: "#FA9E9E",
                borderColor: "#FA9E9E",
                borderRadius: "8px",
                width: "10px",
                height: "40px",
              }}
              onClick={handleClose}
              variant="outlined"
            >
              <IoCloseOutline className="w-[1.5rem] h-[1.5rem] " />
            </Button>
          </div> */}
        </DialogTitle>

        <DialogContent>
          <div className="flex flex-col justify-center gap-[16px] ">
            <div>
              <Typography
                fontWeight={600}
                sx={{
                  color: focusedFields.name ? "#0167C4" : "#00294E",
                  fontFamily: "Open Sans, sans-serif",
                }}
                fontSize={14}
              >
                Name
              </Typography>
              <TextField
                onFocus={() => handleFocus("name")}
                onBlur={() => handleBlur("name")}
                focused={focusedFields.name}
                name="name"
                value={adminData?.name}
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
                fontWeight={600}
                sx={{
                  color: focusedFields.email ? "#0167C4" : "#00294E",
                  fontFamily: "Open Sans, sans-serif",
                }}
                fontSize={14}
              >
                Email
              </Typography>
              <TextField
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                focused={focusedFields.email}
                name="email"
                value={adminData?.email}
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
                fontWeight={600}
                sx={{
                  color: focusedFields.role ? "#0167C4" : "#00294E",
                  fontFamily: "Open Sans, sans-serif",
                }}
                fontSize={14}
              >
                Role
              </Typography>
              <TextField
                onFocus={() => handleFocus("role")}
                onBlur={() => handleBlur("role")}
                focused={focusedFields.role}
                name="role"
                value={adminData?.role}
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
              disabled={loading}
              disableElevation
              variant="contained"
              sx={{
                width: "165px",
                padding: "10px",
                borderRadius: "12px",
                backgroundColor: "#0167C4",
                textTransform: "capitalize",
              }}
              onClick={submit}
            >
              {loading ? "Adding..." : "Add Admin"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Edit_Admin;
