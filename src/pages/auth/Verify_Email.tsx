import { Typography, Button, Divider } from "@mui/material";
import Auth from "../../container/Auth";
import Toast from "../../utils/Toast";
import { useEffect, useState } from "react";
import OtpInput from "../../utils/OtpInput";
//import { useNavigate } from "react-router-dom";

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
}

const Verify_Email = () => {
  //const navigate = useNavigate();

  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [timeLeft, setTimeLeft] = useState(300); // 3 minutes and 28 seconds = 208 seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // Clean up
  }, [timeLeft]);

  // Format seconds to mm:ss
  const formatTime = (seconds: any) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
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
    if (!otp) {
      setLoading(false);
      showToast("Please input all fields", "warning");
      return;
    }
    try {
      console.log(otp);
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
                sx={{ fontFamily: "Open Sans, sans-serif" }}
                fontSize={36}
              >
                Verify your Email Address
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={16}
                sx={{ color: "#808084", fontFamily: "Open Sans, sans-serif" }}
              >
                Check your mail for an OTP sent to verify
              </Typography>
            </div>

            <Divider />

            <div className="flex flex-col gap-[18px]">
              <div className="flex flex-col gap-[24px]">
                <Typography
                  fontWeight={400}
                  fontSize={16}
                  sx={{ color: "#808084", fontFamily: "Open Sans, sans-serif" }}
                >
                  Enter in OTP sent to your mail
                </Typography>
                <OtpInput onChange={(otp) => setOtp(otp)} />
              </div>

              <div className="bg-[#F0EEFF] py-[8px] px-[12px] rounded-[12px] w-[150px]">
                <Typography
                  fontWeight={400}
                  sx={{ color: "#1D2739", fontFamily: "Open Sans, sans-serif" }}
                  fontSize={12}
                  color="#755AE2"
                >
                  OTP Expires in{" "}
                  <span className="text-[#0167C4]">{formatTime(timeLeft)}</span>
                </Typography>
              </div>
            </div>
          </div>

          <Button
            disabled={otp.length !== 5 || loading}
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
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </div>
    </Auth>
  );
};

export default Verify_Email;
