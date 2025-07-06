// import { RiArrowDownSFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import categories_icon from "../../../icons/metrics/category.png";
import { Typography } from "@mui/material";
import api from "../../../utils/axiosInstance";

const Total_Categories = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await api.get("/api/category/all");
      if (response.data.success) {
        setCategories(response.data.data);
        return;
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex flex-col gap-[8px] w-[250px] bg-[#f5f3f3] py-[20px] px-[10px] rounded-[8px] ">
      <div className="flex gap-[4px] items-center">
        <img src={categories_icon} className="w-[16px] h-[16px]" />
        <Typography
          color="#777980"
          fontWeight={400}
          fontSize={16}
          sx={{ fontFamily: "Open Sans, sans-serif" }}
        >
          A.I Category
        </Typography>
      </div>

      <Typography fontWeight={600} fontSize={32} color="#1D1F2C">
        {categories.length}
      </Typography>
    </div>
  );
};

export default Total_Categories;
