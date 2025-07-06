import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import api from "../../utils/axiosInstance";
import Toast from "../../utils/Toast";
import GeneratePassword from "../../utils/RandomPassword";

interface AdminDetails {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

interface Add_Admin {
  refreshAdmins: () => void;
}

const roles = [
  { name: "Support Staff", id: 0 },
  { name: "Category Manager", id: 1 },
  { name: "Tool Curator", id: 2 },
];

const Add_Admin: React.FC<Add_Admin> = ({ refreshAdmins }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");

  const [adminData, setAdminData] = useState<AdminDetails>({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAdminData({ first_name: "", last_name: "", email: "", role: "" });
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
    first_name: false,
    last_name: false,
    email: false,
    role: false,
  });

  const handleFocus = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: false }));
  };

  const isFormDataComplete = () => {
    return Object.values(adminData).every((value) =>
      typeof value === "string"
        ? value.trim() !== ""
        : value !== null && value !== undefined
    );
  };

  const submit = async () => {
    setLoading(true);
    const formReady = isFormDataComplete();

    if (!formReady) {
      setLoading(false);
      showToast("Please input all fields", "warning");
      return;
    }

    try {
      const response = await api.post(`/api/admin/create`, {
        ...adminData,
        password,
      });

      if (response.data) {
        showToast(response.data.message, "success");

        setTimeout(() => {
          refreshAdmins();
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

  useEffect(() => {
    setPassword(GeneratePassword());
  }, []);

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
                  color: focusedFields.first_name ? "#0167C4" : "#00294E",
                  fontFamily: "Open Sans, sans-serif",
                }}
                fontSize={14}
              >
                First Name
              </Typography>
              <TextField
                onChange={handleChange}
                onFocus={() => handleFocus("first_name")}
                onBlur={() => handleBlur("first_name")}
                focused={focusedFields.first_name}
                name="first_name"
                value={adminData?.first_name}
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
                  color: focusedFields.last_name ? "#0167C4" : "#00294E",
                  fontFamily: "Open Sans, sans-serif",
                }}
                fontSize={14}
              >
                Last Name
              </Typography>
              <TextField
                onChange={handleChange}
                onFocus={() => handleFocus("last_name")}
                onBlur={() => handleBlur("last_name")}
                focused={focusedFields.last_name}
                name="last_name"
                value={adminData?.last_name}
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
                onChange={handleChange}
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
                fontWeight={500}
                sx={{ color: "#55555C", fontFamily: "Open Sans, sans-serif" }}
                fontSize={14}
              >
                Role
              </Typography>
              <TextField
                select
                name="role"
                value={adminData.role}
                onChange={handleChange}
                size="small"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              >
                {roles?.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            {isFormDataComplete() && (
              <div>
                <Typography
                  fontWeight={600}
                  sx={{
                    color: "#00294E",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Password
                </Typography>
                <TextField
                  disabled
                  name="password"
                  value={password}
                  type="text"
                  size="small"
                  fullWidth
                  sx={{
                    width: "373px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </div>
            )}

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

export default Add_Admin;
