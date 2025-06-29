import React, { useState } from "react";
import Pages from "../../container/Pages";
import Navbar from "../../components/Navbar";
import { Button, Divider, TextField, Tooltip, Typography } from "@mui/material";
import { IoMdArrowBack } from "react-icons/io";

import chat_gpt from "../../assets/chatgpt.png";

import { useNavigate } from "react-router-dom";
import Actions from "../../components/tools/Actions";

interface ToolDetails {
  name: string;
  short_desc: string;
  long_desc: string;
  category: string;
  logo: string;
  demo_link: string;
  id: string;
}

const View = () => {
  const [toolData, setToolData] = useState<ToolDetails>();

  const navigate = useNavigate();
  return (
    <Pages>
      <Navbar page="Tool Management" component="Chat gpt" />

      <div className="px-[33.5px]">
        <div className="flex justify-start mt-[1rem]">
          <Tooltip title="Go back">
            <Button
              sx={{
                color: "#808084",
                borderColor: "#808084",
                borderRadius: "8px",
                width: "10px",
                height: "30px",
              }}
              onClick={() => navigate(-1)}
              variant="outlined"
            >
              <IoMdArrowBack className="w-[1.5rem] h-[1.5rem] " />
            </Button>
          </Tooltip>
        </div>

        <div className="flex justify-center ">
          <div className="flex flex-col gap-[10px] w-[590px]">
            <img src={chat_gpt} className="w-[48px] h-[48px]" />

            <div className="flex justify-between">
              <Typography fontWeight={500} fontSize={24} color="#302F37">
                Chatgpt
              </Typography>

              <Actions toolDetails={toolData} />
            </div>
          </div>
        </div>

        <div className="flex justify-center my-[1rem]">
          <Divider sx={{ width: "620px" }} />
        </div>

        <div className="flex justify-center ">
          <div className="w-[590px]">
            <div className="flex flex-col justify-center gap-[16px] ">
              <div>
                <Typography
                  fontWeight={600}
                  sx={{
                    color: "#00294E",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Name
                </Typography>
                <TextField
                  disabled
                  name="name"
                  value={toolData?.name}
                  type="text"
                  size="small"
                  fullWidth
                  sx={{
                    backgroundColor: "#F9F9FB",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </div>

              <div>
                <Typography
                  fontWeight={600}
                  sx={{
                    color: "#00294E",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Short Decription
                </Typography>
                <TextField
                  disabled
                  name="short_desc"
                  value={toolData?.short_desc}
                  type="text"
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </div>

              <div>
                <Typography
                  fontWeight={600}
                  sx={{
                    color: "#00294E",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Long Description
                </Typography>
                <TextField
                  disabled
                  name="long_desc"
                  value={toolData?.long_desc}
                  type="text"
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </div>

              <div>
                <Typography
                  fontWeight={600}
                  sx={{ color: "#00294E", fontFamily: "Open Sans, sans-serif" }}
                  fontSize={14}
                >
                  Category
                </Typography>
                <TextField
                  disabled
                  name="category"
                  value={toolData?.category}
                  type="text"
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </div>

              <div>
                <Typography
                  fontWeight={600}
                  sx={{
                    color: "#00294E",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Demo URL
                </Typography>
                <TextField
                  disabled
                  name="demo_url"
                  value={toolData?.demo_link}
                  type="text"
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Pages>
  );
};

export default View;
