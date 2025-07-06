import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../utils/axiosInstance";
import { VscDebugBreakpointDataUnverified } from "react-icons/vsc";

// const categories = [
//   { icon: education, name: "Education", rating: 5, bg: "E7F3FD" },
//   { icon: chatbot, name: "Chatbot A.I Assistant", rating: 4.5, bg: "FFF0EA" },
//   { icon: image_gen, name: "Image Generation", rating: 4, bg: "EBEEFF" },
//   { icon: video_edit, name: "Video Editing", rating: 3.5, bg: "FEECEE" },
//   { icon: writing, name: "Writing", rating: 3, bg: "EAF8FF" },
// ];

interface Categories {
  averageRating: number;
  reviewCount: number;
  categoryId: string;
  name: string;
}

const Top_Categories = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(false);

  const getTopCategories = async () => {
    setLoading(true);

    try {
      const response = await api.get("/api/top-categories");
      if (response.data) {
        setCategories(response.data);
        return;
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopCategories();
  }, []);

  return (
    <div className="p-[24px] rounded-[8px] bg-[#f5f3f3]">
      <div className="flex flex-col gap-[12px]">
        <Typography fontWeight={500} fontSize={20} color="#1D1F2C">
          Top Categories
        </Typography>
        <Typography fontWeight={400} fontSize={16} color="#777980">
          Top Categories in a period of time
        </Typography>
      </div>

      <div className="h-[165px] overflow-y-auto pr-[8px] flex flex-col gap-[16px] mt-[12px]">
        {categories.map((category) => (
          <div className="flex justify-between items-center">
            <div className="flex gap-[8px] items-center">
              <VscDebugBreakpointDataUnverified className="w-[18px] h-[18px]" />

              <Typography fontWeight={400} fontSize={14} color="#1D1F2C">
                {category.name}
              </Typography>
            </div>

            <Typography fontWeight={500} fontSize={14} color="#1D1F2C">
              {category.averageRating}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top_Categories;
