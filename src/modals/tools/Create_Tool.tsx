import React, { useState } from "react";
import Toast from "../../utils/Toast";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
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

interface ToolDetails {
  name: string;
  description: string;
  category: string;
  demo_url: string;
  image: string;
}

const categories = [
  "Education",
  "Video Editing",
  "Image Generation",
  "Writing",
  "A.I Chatbot & Assistant",
  "Content Creation",
];

const Create_Tool = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [toolDetails, setToolDetails] = useState<ToolDetails>({
    name: "",
    description: "",
    category: "",
    demo_url: "",
    image: "",
  });

  const [focusedFields, setFocusedFields] = useState({
    name: false,
    description: false,
    demo_url: false,
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
    setToolDetails((prev) => ({ ...prev, [name]: value }));
  };

  const isFormDataComplete = () => {
    return Object.values({ ...toolDetails }).every(
      (value) => value.trim() !== ""
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setToolDetails({
      name: "",
      description: "",
      category: "",
      demo_url: "",
      image: "",
    });

    setLoading(false);
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
      const response = await api.post("/api/tool/add", toolDetails);

      if (response.data.success) {
        showToast(response.data.message, "success");
        handleClose();
        setLoading(false);
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
        Create New Tool
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
              Let's Create Your New A.I Tool
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
            Give us basic details about the A.I Tool you intend to send out.
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
                  Name
                </Typography>
                <TextField
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  focused={focusedFields.name}
                  name="name"
                  value={toolDetails.name}
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
                  value={toolDetails.description}
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
                  sx={{ color: "#55555C", fontFamily: "Open Sans, sans-serif" }}
                  fontSize={14}
                >
                  Category
                </Typography>
                <TextField
                  select
                  name="category"
                  value={toolDetails.category}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                >
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div>
                <Typography
                  fontWeight={500}
                  sx={{
                    color: focusedFields.demo_url ? "#0167C4" : "#55555C",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Demo URL
                </Typography>
                <TextField
                  onFocus={() => handleFocus("demo_url")}
                  onBlur={() => handleBlur("demo_url")}
                  focused={focusedFields.demo_url}
                  name="demo_url"
                  value={toolDetails.demo_url}
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
                    color: focusedFields.demo_url ? "#0167C4" : "#55555C",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Upload Image
                </Typography>
                <TextField
                  name="image"
                  value={toolDetails.image}
                  onChange={handleChange}
                  type="file"
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
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Create_Tool;
