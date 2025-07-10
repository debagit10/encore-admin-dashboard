import { useEffect, useState } from "react";
import Pages from "../../container/Pages";
import Navbar from "../../components/Navbar";
import {
  Button,
  Divider,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { formatDayAndTime } from "../../utils/DayAndTime";
import Rating from "../../utils/Rating";
import Delete_Review from "../../modals/review/Delete_Review";
import api from "../../utils/axiosInstance";

interface ReviewDetails {
  _id: string;
  message: string;
  createdAt: string;
  rating: number;
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
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const getReview = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/review/details/${id}`);
      if (response.data) {
        setReviewData(response.data.data);
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

  useEffect(() => {
    if (reviewData?._id) {
      document.title = `Encore AI - View Review`;
    }
  }, [reviewData?._id]);

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
              <IoMdArrowBack className="w-[1.5rem] h-[1.5rem]" />
            </Button>
          </Tooltip>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col gap-[10px] w-[590px]">
            {loading ? (
              <Skeleton variant="circular" width={48} height={48} />
            ) : (
              <img
                src={reviewData?.toolId.image}
                className="w-[48px] h-[48px]"
              />
            )}

            <div className="flex justify-between items-center">
              {loading ? (
                <Skeleton width="60%" height={32} />
              ) : (
                <Typography fontWeight={500} fontSize={24} color="#302F37">
                  {reviewData?.toolId.name}
                </Typography>
              )}

              {!loading && reviewData?._id && (
                <Delete_Review
                  _id={reviewData?._id}
                  refreshReviews={getReview}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center my-[1rem]">
          <Divider sx={{ width: "620px" }} />
        </div>

        <div className="flex justify-center">
          <div className="w-[590px]">
            <div className="flex flex-col justify-center gap-[16px]">
              {[
                { label: "Name", value: reviewData?.toolId.name },
                { label: "Comment to be reviewed", value: reviewData?.message },
                {
                  label: "Category",
                  value: reviewData?.toolId.category_id.name,
                },
                {
                  label: "Review Submission Date",
                  value: formatDayAndTime(reviewData?.createdAt),
                },
              ].map((field, index) => (
                <div key={index}>
                  <Typography
                    fontWeight={600}
                    sx={{
                      color: "#00294E",
                      fontFamily: "Open Sans, sans-serif",
                    }}
                    fontSize={14}
                  >
                    {field.label}
                  </Typography>

                  {loading ? (
                    <Skeleton height={40} sx={{ borderRadius: "8px" }} />
                  ) : (
                    <TextField
                      disabled
                      value={field.value}
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
                  )}
                </div>
              ))}

              <div>
                <Typography
                  fontWeight={600}
                  sx={{ color: "#00294E", fontFamily: "Open Sans, sans-serif" }}
                  fontSize={14}
                >
                  Rating
                </Typography>

                {loading ? (
                  <Skeleton height={30} width={120} />
                ) : (
                  <Rating value={reviewData?.rating} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Pages>
  );
};

export default View;
