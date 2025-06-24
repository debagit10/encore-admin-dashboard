import React, { useRef, useState } from "react";
import { Box, TextField } from "@mui/material";

interface OtpInputProps {
  onChange?: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ onChange }) => {
  const length = 5;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number): void => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    onChange?.(updatedOtp.join(""));

    if (value && index < length - 1) {
      (inputsRef.current[index + 1] as HTMLInputElement | null)?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      (inputsRef.current[index - 1] as HTMLInputElement | null)?.focus();
    }
  };

  return (
    <Box display="flex" gap={2}>
      {otp.map((value, index) => (
        <TextField
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          type="password"
          key={index}
          value={value}
          inputRef={(el) => (inputsRef.current[index] = el)}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          inputProps={{
            maxLength: 1,
            inputMode: "numeric",
            style: {
              textAlign: "center",
              fontSize: "20px",
              width: "50px",
              padding: "12px",
            },
          }}
        />
      ))}
    </Box>
  );
};

export default OtpInput;
