import { IoNotifications } from "react-icons/io5";
import Navbar from "../../components/Navbar";
import Pages from "../../container/Pages";
import { InputAdornment, TextField, Typography } from "@mui/material";
import Create from "../../modals/categories/Create";
import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import education from "../../icons/categories/education.png";
import chatbot from "../../icons/categories/chatbot.png";
import image_gen from "../../icons/categories/image_gen.png";
import video_edit from "../../icons/categories/video_edit.png";
import writing from "../../icons/categories/writing.png";
import Actions from "../../components/category/Actions";

const dummyCategories = [
  { icon: education, name: "Education", rating: 5, bg: "E7F3FD" },
  { icon: chatbot, name: "Chatbot A.I Assistant", rating: 4.5, bg: "FFF0EA" },
  { icon: image_gen, name: "Image Generation", rating: 4, bg: "EBEEFF" },
  { icon: video_edit, name: "Video Editing", rating: 3.5, bg: "FEECEE" },
  { icon: writing, name: "Writing", rating: 3, bg: "EAF8FF" },
];

const Categories = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return dummyCategories;
    return dummyCategories?.filter((category) =>
      `${category.name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, dummyCategories]);

  return (
    <Pages>
      <Navbar page="Categories">
        <IoNotifications size={20} color="777777" />
      </Navbar>

      <div className="px-[33.5px] h-[87vh]">
        <div className="flex justify-between items-center mt-[.5rem]">
          <div className="flex flex-col gap-[8px]">
            <Typography fontWeight={500} fontSize={24} color="#1D1F2C">
              Categories
            </Typography>
            <Typography fontWeight={400} fontSize={16} color="#667085">
              The A.I tools should section into these categories
            </Typography>
          </div>

          <Create />
        </div>

        <div className="flex justify-between py-[1rem]">
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Categories"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="border-t-[1px] border-[#E5E5E6] p-[24px] flex flex-col gap-[16px] h-[500px] overflow-y-auto ">
          {filteredCategories.map((category) => (
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => navigate("/category/view/123")}
            >
              <div className="flex gap-[8px] items-center">
                <div className={`bg-[#${category.bg}] rounded-[100%] p-[8px]`}>
                  <img
                    src={category.icon}
                    alt={`Logo of ${category.name}`}
                    className="w-[18px] h-[18px]"
                  />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <Typography fontWeight={400} fontSize={14} color="#1D1F2C">
                    {category.name}
                  </Typography>

                  <Typography fontWeight={400} fontSize={12} color="#667085">
                    340 A.I Tools
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-[20px] ">
                <Typography fontWeight={500} fontSize={14} color="#1D1F2C">
                  {category.rating}
                </Typography>

                <div onClick={(e) => e.stopPropagation()}>
                  <Actions />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Pages>
  );
};

export default Categories;
