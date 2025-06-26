import education from "../../icons/categories/education.png";
import chatbot from "../../icons/categories/chatbot.png";
import image_gen from "../../icons/categories/image_gen.png";
import video_edit from "../../icons/categories/video_edit.png";
import writing from "../../icons/categories/writing.png";
import { Typography } from "@mui/material";

const categories = [
  { icon: education, name: "Education", rating: 5, bg: "E7F3FD" },
  { icon: chatbot, name: "Chatbot A.I Assistant", rating: 4.5, bg: "FFF0EA" },
  { icon: image_gen, name: "Image Generation", rating: 4, bg: "EBEEFF" },
  { icon: video_edit, name: "Video Editing", rating: 3.5, bg: "FEECEE" },
  { icon: writing, name: "Writing", rating: 3, bg: "EAF8FF" },
];

const Top_Categories = () => {
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

      <div className="flex flex-col gap-[16px] mt-[12px]">
        {categories.map((category) => (
          <div className="flex justify-between items-center">
            <div className="flex gap-[8px] items-center">
              <div className={`bg-[#${category.bg}] rounded-[100%] p-[8px]`}>
                <img
                  src={category.icon}
                  alt={`Logo of ${category.name}`}
                  className="w-[18px] h-[18px]"
                />
              </div>
              <Typography fontWeight={400} fontSize={14} color="#1D1F2C">
                {category.name}
              </Typography>
            </div>

            <Typography fontWeight={500} fontSize={14} color="#1D1F2C">
              {category.rating}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top_Categories;
