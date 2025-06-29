import React, { useState } from "react";

import { Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { CiMenuKebab } from "react-icons/ci";

import edit_icon from "../../icons/tool_actions.tsx/edit.png";

import { useNavigate } from "react-router-dom";
import Delete_Review from "../../modals/review/Delete_Review";

// interface ToolDetails {
//   name: string;
//   short_desc: string;
//   long_desc: string;
//   category: string;
//   logo: string;
//   demo_link: string;
//   id: string;
// }

// interface ActionsProps {
//   toolDetails?: ToolDetails;
//   refreshTools?: () => void;
// }

const Actions = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <CiMenuKebab />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { borderRadius: 2, width: "170px" } }}
        sx={{ paddingX: ".5rem" }}
      >
        <div className="flex flex-col px-[12px] ">
          <MenuItem onClick={() => navigate(`/review/edit/123`)}>
            <div className="flex gap-[12px] ">
              <img src={edit_icon} className="w-[20px] h-[20px] pt-[2.5px]" />

              <Typography
                fontWeight={400}
                fontSize={14}
                fontFamily="Open Sans, sans-serif"
                color="#00000A"
              >
                Edit Comment
              </Typography>
            </div>
          </MenuItem>

          <Divider />

          <MenuItem>
            <Delete_Review />
          </MenuItem>
        </div>
      </Menu>
    </>
  );
};

export default Actions;
