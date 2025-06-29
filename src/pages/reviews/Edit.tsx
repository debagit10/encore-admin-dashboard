import React, { useState } from "react";
import Pages from "../../container/Pages";
import Navbar from "../../components/Navbar";
import {
  Button,
  Divider,
  Rating,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { IoMdArrowBack } from "react-icons/io";

import chat_gpt from "../../assets/chatgpt.png";

import { useNavigate } from "react-router-dom";

interface ReviewDetails {
  id: string;
  user_id: string;
  logo: string;
  name: string;
  comment: string;
  date: string;
  category: string;
  rating: 4;
  status: boolean;
}

const Edit = () => {
  const [reviewData, setReviewData] = useState<ReviewDetails>();
  const [loading, setLoading] = useState<boolean>(false);

  const [focusedFields, setFocusedFields] = useState({
    comment: false,
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
                    color: "#00294E",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  User ID
                </Typography>
                <TextField
                  disabled
                  name="user_id"
                  value={reviewData?.user_id}
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
                    color: focusedFields.comment ? "#0167C4" : "#00294E",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                  fontSize={14}
                >
                  Comment to be reviewed
                </Typography>
                <TextField
                  onFocus={() => handleFocus("comment")}
                  onBlur={() => handleBlur("comment")}
                  focused={focusedFields.comment}
                  name="short_desc"
                  value={reviewData?.comment}
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
                  Category
                </Typography>
                <TextField
                  disabled
                  name="long_desc"
                  value={reviewData?.category}
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
                  Review Submission Date
                </Typography>
                <TextField
                  disabled
                  name="date"
                  value={reviewData?.date}
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
                  Rating
                </Typography>
                <Rating value={4} />
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
