import React, { useEffect, useState } from "react";
import Pages from "../../container/Pages";
import Navbar from "../../components/Navbar";
import { Button, Divider, TextField, Tooltip, Typography } from "@mui/material";
import { IoMdArrowBack } from "react-icons/io";

import chat_gpt from "../../assets/chatgpt.png";

import { useNavigate, useParams } from "react-router-dom";
import { formatDayAndTime } from "../../utils/DayAndTime";
import Rating from "../../utils/Rating";
import Delete_Review from "../../modals/review/Delete_Review";
import api from "../../utils/axiosInstance";

interface ReviewDetails {
  _id: string;
  message: string;
  createdAt: string;
  rating: 4;
  toolId: ToolDetails;
}

interface ToolDetails {
  name: string;
  demo_url: string;
  image: string;
  category_id: Category;
}

interface Category {
  name: string;
  _id: string;
}

const View = () => {
  const [reviewData, setReviewData] = useState<ReviewDetails>();
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const getReview = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/review/details/${id}`);
      if (response.data) {
        setReviewData(response.data.data);
        return;
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <Pages>
      <Navbar page="Tool Management" component="Chat gpt" />

      <div className="px-[33.5px] h-[85vh]">
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

              <Delete_Review _id={reviewData?._id} refreshReviews={getReview} />
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
                  value={reviewData?.toolId.name}
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
                  Comment to be reviewed
                </Typography>
                <TextField
                  disabled
                  name="long_desc"
                  value={reviewData?.message}
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
                  value={reviewData?.toolId.category_id.name}
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
                  name="demo_url"
                  value={formatDayAndTime(reviewData?.createdAt)}
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
                <Rating value={reviewData?.rating} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Pages>
  );
};

export default View;
