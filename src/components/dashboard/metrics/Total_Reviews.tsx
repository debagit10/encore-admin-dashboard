import { Typography } from "@mui/material";
import { RiArrowUpSFill } from "react-icons/ri";
import tools from "../../../icons/metrics/reviews.png";
import { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";

const Total_Reviews = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/review/get");
      if (response.data) {
        setReviews(response.data.data);
        return;
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="flex flex-col gap-[8px] w-[250px] bg-[#f5f3f3] py-[20px] px-[10px] rounded-[8px] ">
      <div className="flex gap-[4px] items-center">
        <img src={tools} className="w-[16px] h-[16px]" />
        <Typography
          color="#777980"
          fontWeight={400}
          fontSize={16}
          sx={{ fontFamily: "Open Sans, sans-serif" }}
        >
          Reviews
        </Typography>
      </div>

      <Typography fontWeight={600} fontSize={32} color="#1D1F2C">
        {reviews.length}
      </Typography>

      <div className="flex items-center gap-[4px]">
        <Typography fontWeight={700} fontSize={14} color="#4BB543">
          10%
        </Typography>
        <RiArrowUpSFill color="#4BB543" />

        <Typography fontWeight={400} fontSize={14} color="#858D9D">
          +30 today
        </Typography>
      </div>
    </div>
  );
};

export default Total_Reviews;
