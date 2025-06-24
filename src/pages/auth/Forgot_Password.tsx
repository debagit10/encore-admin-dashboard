import { Typography, TextField, Button } from "@mui/material";
import Auth from "../../container/Auth";
import Toast from "../../utils/Toast";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

const Forgot_Password = () => {
  //const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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

  const submit = async () => {
    setLoading(true);
    if (!email) {
      setLoading(false);
      showToast("Please input all fields", "warning");
      return;
    }
    try {
      console.log(email);
    } catch (error) {
      console.error("Login error:", error);
      showToast("An error occurred while logging in.", "error");
      return;
    }
  };

  return (
    <Auth>
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleCloseToast}
      />

      <div className="flex justify-center items-center h-[90vh]">
        <div className="bg-[white] w-[602px] h-[484px] flex gap-[64px] flex-col p-[40px]">
          <div className="flex flex-col gap-[40px]">
            <div className="flex flex-col gap-[12px]">
              <Typography
                fontWeight={500}
                fontSize={24}
                sx={{ color: "#475367", fontFamily: "Open Sans, sans-serif" }}
              >
                Forgot Password?
              </Typography>
              <Typography
                fontWeight={500}
                sx={{ fontFamily: "Open Sans, sans-serif" }}
                fontSize={36}
              >
                Don't Worry, We got you
              </Typography>
            </div>

            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[12px]">
                <Typography
                  fontWeight={400}
                  fontSize={14}
                  sx={{
                    color: isEmailFocused ? "#0167C4" : "black",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                >
                  Email address
                </Typography>

                <TextField
                  placeholder="Enter email address"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  type="text"
                  size="small"
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  sx={{
                    width: "444px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <Button
            disabled={loading}
            onClick={submit}
            variant="contained"
            disableElevation
            sx={{
              padding: "16px",
              width: "444px",
              borderRadius: "12px",
              backgroundColor: "black",
              textTransform: "capitalize",
              fontFamily: "Open Sans, sans-serif",
            }}
          >
            {loading ? "Submitting..." : "Continue"}
          </Button>
        </div>
      </div>
    </Auth>
  );
};

export default Forgot_Password;
