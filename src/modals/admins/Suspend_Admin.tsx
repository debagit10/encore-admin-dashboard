import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { IoCloseOutline } from "react-icons/io5";
import api from "../../utils/axiosInstance";
import Toast from "../../utils/Toast";

import { MdBlock } from "react-icons/md";
import { TbRestore } from "react-icons/tb";

interface AdminDetails {
  _id?: string;
  suspended: string;
}

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

interface DeleteProps {
  adminData: AdminDetails;
  refreshAdmins: () => void;
}

const Suspend_Admin: React.FC<DeleteProps> = ({ adminData, refreshAdmins }) => {
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
      const response = await api.put(
        `/api/admin/${adminData.suspended ? "reinstate" : "suspend"}/${
          adminData._id
        }`
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

  return (
    <div>
      <div onClick={handleClickOpen} className="flex gap-[8px] ">
        {adminData.suspended ? (
          <TbRestore className="w-[20px] h-[20px] pt-[2.5px]" />
        ) : (
          <MdBlock className="w-[20px] h-[20px] pt-[2.5px]" />
        )}

        <Typography
          fontWeight={400}
          fontSize={14}
          fontFamily="Open Sans, sans-serif"
          color="#00000A"
        >
          {adminData.suspended ? "Reinstate" : "Suspend"} Admin
        </Typography>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="suspend-dialog-description"
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
              {adminData.suspended ? (
                <TbRestore className="w-[131px] h-[106px]" />
              ) : (
                <MdBlock className="w-[131px] h-[106px]" />
              )}
            </div>

            <div className="flex flex-col gap-[1rem] justify-center text-center">
              <Typography fontWeight={400} fontSize={22} color="#00000A">
                Are you sure you want to{" "}
                {adminData.suspended ? "Reinstate" : "Suspend"} this Admin?
              </Typography>

              <Typography fontWeight={400} fontSize={14} color="#55555C">
                {adminData.suspended
                  ? "Reinstating this admin will restore access to all records previously associated with them."
                  : "Suspending this admin will make all records associated with them inaccessible until reinstated."}
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
              backgroundColor: adminData.suspended ? "#E7F3FE" : "#FBE9E9",
              borderColor: adminData.suspended ? "#0167C4" : "#D42620",
              color: adminData.suspended ? "#0167C4" : "#D42620",
              textTransform: "capitalize",
              fontFamily: "Open Sans, sans-serif",
            }}
          >
            {loading
              ? adminData.suspended
                ? "Reinstating..."
                : "Suspending..."
              : adminData.suspended
              ? "Reinstate Admin"
              : "Suspend Admin"}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Suspend_Admin;
