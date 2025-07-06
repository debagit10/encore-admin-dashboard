import { useState } from "react";
import api from "../../utils/axiosInstance";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Toast from "../../utils/Toast";
import { IoCloseOutline } from "react-icons/io5";

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

interface ImportToolProps {
  refreshTools: () => void;
}

const ImportTools: React.FC<ImportToolProps> = ({ refreshTools }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    setLoading(false);
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
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!file) {
      showToast("Please select file", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/api/import-tools", formData);

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
        variant="outlined"
        sx={{
          width: "165px",
          padding: "5px",
          borderRadius: "12px",
          borderColor: "#0167C4",
          textTransform: "capitalize",
          color: "#0167C4",
        }}
        onClick={handleClickOpen}
      >
        Import Tools
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <div className="flex justify-between">
            <Typography variant="h6" className="text-center text-[#1A1A1A]">
              Upload Excel File
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
            Import AI tools by uploading your spreadsheet here.
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ paddingY: "64px", paddingX: "25px" }}>
          <div className="mt-[1rem]">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500 mb-[1rem]
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
            />

            <Button
              disabled={loading}
              onClick={handleUpload}
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: "9999px",
                height: "48px",
                width: "100%",
                background: "radial-gradient(circle, #2B91EE, #0167C4)",
              }}
            >
              {loading ? "Uploading..." : "Upload Excel"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImportTools;
