import React, { useState } from "react";
import Toast from "../../utils/Toast";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";
import api from "../../utils/axiosInstance";

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

interface CategoryDetails {
  name: string;
  description: string;
}

interface PostCreate {
  refreshCategories: () => void;
}

const Create: React.FC<PostCreate> = ({ refreshCategories }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState<CategoryDetails>({
    name: "",
    description: "",
  });

  const [focusedFields, setFocusedFields] = useState({
    name: false,
    description: false,
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
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormDataComplete = () => {
    return Object.values({ ...categoryData }).every(
      (value) => value.trim() !== ""
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCategoryData({
      name: "",
      description: "",
    });
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
    const formReady = isFormDataComplete();

    if (!formReady) {
      setLoading(false);
      showToast("Please input all fields", "warning");
      return;
    }

    try {
      const response = await api.post("/api/category/add", categoryData);

      if (response.data.success) {
        showToast(response.data.message, "success");

        setTimeout(() => {
          handleClose();
          refreshCategories();
        }, 2000);
      }
    } catch (error: any) {
      if (error.response.data.error) {
        setLoading(false);
        showToast(error.response.data.error, "error");
        return;
      }
    }
  };

  return (
    <div>
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleCloseToast}
      />

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
        Create New Category
      </Button>

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
              Let's Create a New Category
            </Typography>

            <Button sx={{ color: "black" }} onClick={handleClose}>
              <IoCloseOutline className="w-[1.5rem] h-[1.5rem] " />
            </Button>
          </div>

          <Typography
            fontWeight={400}
            sx={{ color: "#667085", fontFamily: "Open Sans, sans-serif" }}
            fontSize={16}
          >
            Give us basic details about the Category.
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ paddingY: "64px", paddingX: "25px" }}>
          <Box>
            <div className="flex flex-col gap-[15px]">
              <div>
                <Typography
                  fontWeight={500}
                  sx={{
                    color: focusedFields.name ? "#0167C4" : "#55555C",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Name of Category
                </Typography>
                <TextField
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  focused={focusedFields.name}
                  name="name"
                  value={categoryData.name}
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
                  fontWeight={500}
                  sx={{
                    color: focusedFields.description ? "#0167C4" : "#55555C",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Decription
                </Typography>
                <TextField
                  onFocus={() => handleFocus("description")}
                  onBlur={() => handleBlur("description")}
                  focused={focusedFields.description}
                  name="description"
                  value={categoryData.description}
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
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Create;
