import React, { useEffect, useState } from "react";
import Toast from "../../utils/Toast";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";

import edit from "../../icons/tool_actions/edit.png";
import api from "../../utils/axiosInstance";

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
  _id: string;
}

const Edit_Profile = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const [password, setPasswordData] = useState<string>("");

  const [userData, setUserData] = useState<UserDetails>({
    first_name: "",
    last_name: "",
    email: "",
    _id: "",
  });

  const [updatedData, setUpdatedData] = useState<UserDetails>({
    first_name: "",
    last_name: "",
    email: "",
    _id: "",
  });

  const [focusedFields, setFocusedFields] = useState({
    first_name: false,
    last_name: false,
    email: false,
    password: false,
  });

  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    severity: "info",
  });

  const handleFocus = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showToast = (message: string, severity: ToastState["severity"]) => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
    setLoading(false);
  };

  const submit = async () => {
    setLoading(true);

    const changedFields: Partial<typeof updatedData> = {};
    Object.keys(updatedData).forEach((key) => {
      const typedKey = key as keyof typeof updatedData;
      if (updatedData[typedKey] !== userData[typedKey]) {
        changedFields[typedKey] = updatedData[typedKey];
      }
    });

    try {
      const response = await api.put(`/api/edit-profile/${userData._id}`, {
        ...changedFields,
        password,
      });

      if (response.data.success) {
        showToast(response.data.message, "success");

        localStorage.setItem("adminData", JSON.stringify(response.data.data));

        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        showToast(error.response.data.error, "error");
      } else {
        showToast("An unexpected error occurred", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const adminString = localStorage.getItem("adminData");
    if (adminString) {
      try {
        const adminData = JSON.parse(adminString);
        console.log("Parsed adminData:", adminData);
        setUserData(adminData);
        setUpdatedData(adminData);
      } catch (err) {
        console.error("Error parsing adminData", err);
      }
    }
  }, []);

  const isDataChanged = () => {
    return (
      userData.first_name !== updatedData.first_name ||
      userData.last_name !== updatedData.last_name ||
      userData.email !== updatedData.email
    );
  };

  return (
    <div>
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleCloseToast}
      />

      <Tooltip title="Edit">
        <div onClick={handleClickOpen} className="cursor-pointer ">
          <img src={edit} className="w-[17px] h-[17px] pt-[2.5px]" />
        </div>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <div className="flex justify-between">
            <Typography
              fontWeight={500}
              sx={{ color: "#1D1F2C", fontFamily: "Open Sans, sans-serif" }}
              fontSize={24}
            >
              Edit Profile
            </Typography>

            <Button sx={{ color: "black" }} onClick={handleClose}>
              <IoCloseOutline className="w-[1.5rem] h-[1.5rem] " />
            </Button>
          </div>
        </DialogTitle>

        <DialogContent sx={{ paddingY: "64px", paddingX: "25px" }}>
          <Box>
            <div className="flex flex-col gap-[15px]">
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
                  value={updatedData?.first_name}
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
                  value={updatedData?.last_name}
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
                  value={updatedData?.email}
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

              {isDataChanged() && (
                <div>
                  <Typography
                    fontWeight={600}
                    sx={{
                      color: focusedFields.password ? "#0167C4" : "#00294E",
                      fontFamily: "Open Sans, sans-serif",
                    }}
                    fontSize={14}
                  >
                    Password
                  </Typography>
                  <TextField
                    placeholder="Enter current password to validate changes"
                    onChange={(e) => setPasswordData(e.target.value)}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                    focused={focusedFields.password}
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
                disabled={loading || !isDataChanged()}
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
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Edit_Profile;
