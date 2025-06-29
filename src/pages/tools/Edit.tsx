import React, { useState } from "react";
import Pages from "../../container/Pages";
import Navbar from "../../components/Navbar";
import { Button, Divider, TextField, Tooltip, Typography } from "@mui/material";
import { IoMdArrowBack } from "react-icons/io";

import chat_gpt from "../../assets/chatgpt.png";

import { useNavigate } from "react-router-dom";

interface ToolDetails {
  name: string;
  short_desc: string;
  long_desc: string;
  category: string;
  logo: string;
  demo_link: string;
  id: string;
}

const Edit = () => {
  const [toolData, setToolData] = useState<ToolDetails>();
  const [loading, setLoading] = useState<boolean>(false);

  const [focusedFields, setFocusedFields] = useState({
    name: false,
    short_desc: false,
    long_desc: false,
    demo_url: false,
    category: false,
  });

  const handleFocus = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: false }));
  };

  const navigate = useNavigate();

  const submit = async () => {
    try {
    } catch (error) {}
  };

  return (
    <Pages>
      <Navbar page="Tool Management" component="Chat gpt" edit />

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

            <Typography fontWeight={500} fontSize={24} color="#302F37">
              Chatgpt
            </Typography>
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
                    color: focusedFields.name ? "#0167C4" : "#00294E",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Name
                </Typography>
                <TextField
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  focused={focusedFields.name}
                  name="name"
                  value={toolData?.name}
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
                    color: focusedFields.short_desc ? "#0167C4" : "#00294E",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Short Decription
                </Typography>
                <TextField
                  onFocus={() => handleFocus("short_desc")}
                  onBlur={() => handleBlur("short_desc")}
                  focused={focusedFields.short_desc}
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
                    color: focusedFields.long_desc ? "#0167C4" : "#00294E",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Long Description
                </Typography>
                <TextField
                  onFocus={() => handleFocus("long_desc")}
                  onBlur={() => handleBlur("long_desc")}
                  focused={focusedFields.long_desc}
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
                  sx={{
                    color: focusedFields.category ? "#0167C4" : "#00294E",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Category
                </Typography>
                <TextField
                  onFocus={() => handleFocus("category")}
                  onBlur={() => handleBlur("category")}
                  focused={focusedFields.category}
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
                    color: focusedFields.demo_url ? "#0167C4" : "#00294E",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Demo URL
                </Typography>
                <TextField
                  onFocus={() => handleFocus("demo_url")}
                  onBlur={() => handleBlur("demo_url")}
                  focused={focusedFields.demo_url}
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

              <Button
                disabled={loading}
                disableElevation
                variant="contained"
                sx={{
                  width: "165px",
                  padding: "10px",
                  borderRadius: "12px",
                  backgroundColor: "#0167C4",
                  textTransform: "capitalize",
                }}
                onClick={submit}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Pages>
  );
};

export default Edit;
