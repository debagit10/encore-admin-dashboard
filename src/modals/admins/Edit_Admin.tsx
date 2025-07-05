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

import { IoCloseOutline } from "react-icons/io5";
//import api from "../../utils/axiosInstance";
import Toast from "../../utils/Toast";
import edit from "../../icons/tool_actions/edit.png";
import api from "../../utils/axiosInstance";

interface AdminsState {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  suspended: string;
  _id: string;
}

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

interface DeleteProps {
  adminData: AdminsState;
  refreshAdmins: () => void;
}

const roles = ["support staff", "Admin 2", "Admin 3", "Admin 4", "Admin 5"];

const Edit_Admin: React.FC<DeleteProps> = ({ adminData, refreshAdmins }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [originalData, setOriginalData] = useState<AdminsState>({
    first_name: "",
    last_name: "",
    email: "",
    suspended: "",
    role: "",
    _id: "",
  });

  const [updatedData, setUpdatedData] = useState<AdminsState>({
    first_name: "",
    last_name: "",
    email: "",
    suspended: "",
    role: "",
    _id: "",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    setLoading(true);

    try {
      const response = await api.put(
        `/api/admin/update/${adminData._id}`,
        updatedData
      );

      if (response.data.success) {
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
    setOriginalData(adminData);
    setUpdatedData(adminData);
  }, []);

  const isDataChanged = () => {
    return (
      updatedData.first_name !== originalData.first_name ||
      updatedData.last_name !== originalData.last_name ||
      updatedData.role !== originalData.role ||
      updatedData.email !== originalData.email
    );
  };

  return (
    <div>
      <div onClick={handleClickOpen} className="flex gap-[8px] ">
        <img src={edit} className="w-[20px] h-[20px] pt-[2.5px]" />

        <Typography
          fontWeight={400}
          fontSize={14}
          fontFamily="Open Sans, sans-serif"
          color="#00000A"
        >
          Edit Admin
        </Typography>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="edit-dialog-description"
      >
        <Toast
          open={toast.open}
          message={toast.message}
          severity={toast.severity}
          onClose={handleCloseToast}
        />
        <DialogTitle>
          <div className="flex justify-between">
            <Typography fontWeight={500} fontSize={24} color="#1D1F2C">
              Edit Admin
            </Typography>
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
          </div>
        </DialogTitle>

        <DialogContent sx={{ width: "379px" }}>
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
                value={updatedData?.first_name}
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
                value={updatedData?.last_name}
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
                value={updatedData?.email}
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
                select
                onChange={handleChange}
                onFocus={() => handleFocus("role")}
                onBlur={() => handleBlur("role")}
                focused={focusedFields.role}
                name="role"
                value={updatedData?.role}
                type="text"
                size="small"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
            </div>

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
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Edit_Admin;
