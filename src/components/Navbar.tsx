import { Typography } from "@mui/material";
import React from "react";

interface NavbarProps {
  children?: React.ReactNode;
  page?: string;
  component?: string;
}

const Navbar: React.FC<NavbarProps> = ({ children, page, component }) => {
  return (
    <div className="flex justify-between  h-[80px] items-center px-[33.5px]  bg-[#FFFFFF] border-b-[1.2px] border-[#F2F2F3]">
      <div className="">
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
