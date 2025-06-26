import { Typography } from "@mui/material";
import React from "react";

interface NavbarProps {
  children?: React.ReactNode;
  page?: string;
  component?: string;
}

const Navbar: React.FC<NavbarProps> = ({ children, page, component }) => {
  return (
    <div className="flex justify-between items-center px-[33.5px] py-[13px] bg-[#FFFFFF] border-b-[1.2px] border-[#F2F2F3]">
      <div>
        <Typography fontWeight={500} fontSize={18}>
          <span className="text-[#777777]">Overview</span> • {page}{" "}
          {component && `• ${component}`}
        </Typography>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Navbar;
