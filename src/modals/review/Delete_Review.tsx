import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { IoCloseOutline } from "react-icons/io5";
//import api from "../../utils/axiosInstance";
import Toast from "../../utils/Toast";
import delete_img from "../../assets/delete_img.png";
import delete_icon from "../../icons/tool_actions.tsx/delete.png";

interface ReviewDetails {
  id?: string;
}

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

interface DeleteProps {
  reviewData?: ReviewDetails;
  refreshTools?: () => void;
}

const Delete_Review: React.FC<DeleteProps> = () => {
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
      showToast("Review deleted", "success");
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
      <div onClick={handleClickOpen} className="flex gap-[12px] ">
        <img src={delete_icon} className="w-[20px] h-[20px] pt-[2.5px]" />

        <Typography
          fontWeight={400}
          fontSize={14}
          fontFamily="Open Sans, sans-serif"
          color="#00000A"
        >
          Delete Review
        </Typography>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="delete-dialog-description"
      >
        <Toast
          open={toast.open}
          message={toast.message}
          severity={toast.severity}
          onClose={handleCloseToast}
        />
        <DialogTitle>
          <div className="flex justify-end">
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
          <div className="flex flex-col gap-[2rem]">
            <div className="flex justify-center">
              <img src={delete_img} />
            </div>

            <div className="flex flex-col gap-[1rem] justify-center text-center">
              <Typography fontWeight={400} fontSize={22} color="#00000A">
                Are you sure you want to Delete this Review?
              </Typography>

              <Typography fontWeight={400} fontSize={14} color="#55555C">
                Deleting this Review means all records associated with this tool
                would no longer be accessible. Please note this action cannot be
                undone
              </Typography>
            </div>
          </div>
        </DialogContent>

        <div className="p-[20px]">
          <Button
            onClick={submit}
            fullWidth
            variant="outlined"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#FBE9E9",
              borderColor: "#D42620",
              textTransform: "capitalize",
              fontFamily: "Open Sans, sans-serif",
              color: "#D42620",
            }}
          >
            {loading ? "Deleting..." : "Delete Review"}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Delete_Review;
