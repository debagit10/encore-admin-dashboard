import React, { useEffect, useState } from "react";
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

interface CategoryDetails {
  _id: string;
  name: string;
}

interface CreateToolProps {
  refreshTools: () => void;
}

const Create_Tool: React.FC<CreateToolProps> = ({ refreshTools }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [toolDetails, setToolDetails] = useState<ToolDetails>({
    name: "",
    description: "",
    category: "",
    demo_url: "",
    image: "",
  });

  const [categories, setCategories] = useState<CategoryDetails[]>();

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

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await api.post("/api/upload-image", formData);

      if (response.data.success) {
        setToolDetails((prev) => ({ ...prev, image: response.data.imageUrl }));
      } else {
        console.error("Upload failed");
      }
    } catch (err) {
      console.error("Error uploading file", err);
    }
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

        setTimeout(() => {
          refreshTools();
          handleClose();
          setLoading(false);
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

  const getCategories = async () => {
    try {
      const response = await api.get("/api/category/all");
      if (response.data.success) {
        setCategories(response.data.data);
        return;
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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
                  {categories?.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
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
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleFileChange}
                  style={{
                    padding: "10px 0",
                    border: "1px solid #c4c4c4",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                />
              </div>

              <Button
                disabled={!isFormDataComplete() || loading}
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
