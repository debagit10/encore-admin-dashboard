import { IoNotifications } from "react-icons/io5";
import Navbar from "../../components/Navbar";
import Pages from "../../container/Pages";
import { InputAdornment, TextField, Typography } from "@mui/material";
import Create from "../../modals/categories/Create";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface CategoryDetails {
  _id: string;
  name: string;
  description: string;
  toolCount: number;
}

import { VscDebugBreakpointDataUnverified } from "react-icons/vsc";
import api from "../../utils/axiosInstance";
import Actions from "../../components/category/Actions";

const Categories = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [categories, setCategories] = useState<CategoryDetails[]>();

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

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    return categories?.filter((category) =>
      `${category.name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, categories]);

  useEffect(() => {
    getCategories();
  }, []);

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

          <Create refreshCategories={getCategories} />
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
          {filteredCategories?.map((category) => (
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => navigate(`/category/view/${category._id}`)}
            >
              <div className="flex gap-[8px] items-center">
                <div className="rounded-[100%] p-[8px]">
                  <VscDebugBreakpointDataUnverified className="w-[18px] h-[18px]" />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <Typography fontWeight={400} fontSize={14} color="#1D1F2C">
                    {category.name}
                  </Typography>

                  <Typography fontWeight={400} fontSize={12} color="#667085">
                    {category.toolCount > 1 || category.toolCount === 0
                      ? `${category.toolCount} tools`
                      : `${category.toolCount} tool`}
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-[20px] ">
                {/* <Typography fontWeight={500} fontSize={14} color="#1D1F2C">
                  {category.rating}
                </Typography> */}

                <div onClick={(e) => e.stopPropagation()}>
                  <Actions
                    categoryDetails={category}
                    refreshCategories={getCategories}
                  />
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
