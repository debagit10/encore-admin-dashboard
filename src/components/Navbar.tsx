import { Typography } from "@mui/material";
import React from "react";

interface NavbarProps {
  children?: React.ReactNode;
  page?: string;
  component?: string;
  edit?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ children, page, edit, component }) => {
  return (
    <div className="flex justify-between  h-[80px] items-center px-[33.5px]  bg-[#FFFFFF] border-b-[1.2px] border-[#F2F2F3]">
      <div>
        <Typography fontWeight={500} fontSize={18}>
          {page && (
            <>
              <span style={{ color: component ? "#777777" : "black" }}>
                {page}
              </span>
            </>
          )}
          {component && (
            <>
              <span style={{ color: edit ? "#777777" : "black" }}>
                {" • "} {component}
              </span>
            </>
          )}
          {edit && " • Edit Tool"}
        </Typography>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Navbar;
