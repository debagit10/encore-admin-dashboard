//import React, { useState } from "react";
import Pages from "../../container/Pages";
import Navbar from "../../components/Navbar";
import { Button, Divider, Skeleton, Tooltip, Typography } from "@mui/material";
import { IoMdArrowBack } from "react-icons/io";

import { useNavigate, useParams } from "react-router-dom";
import Actions from "../../components/category/Actions";

import { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";

interface CategoryDetails {
  _id: string;
  name: string;
  description: string;
}

interface CategoryTools {
  demo_url: string;
  name: string;
  image: string;
}

const View = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();

  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState<CategoryDetails>({
    _id: "",
    name: "",
    description: "",
  });

  const [categoryTools, setCategoryTools] = useState<CategoryTools[]>();

  const getCategory = async () => {
    try {
      const response = await api.get(`/api/category/details/${id}`);
      if (response.data.success) {
        setCategoryData(response.data.data.category);
        setCategoryTools(response.data.data.tools);
        return;
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    if (categoryData.name) {
      document.title = `Encore AI - ${categoryData.name}`;
    }
  }, [categoryData.name]);

  return (
    <Pages>
      <Navbar page="Categories" component="Education" />

      <div className="px-[33.5px] h-[87vh]">
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
          <div className="w-[590px]">
            <div className="flex justify-between">
              {loading ? (
                <Skeleton variant="text" width={200} height={32} />
              ) : (
                <Typography fontWeight={500} fontSize={24} color="#302F37">
                  {categoryData.name}
                </Typography>
              )}

              <Actions
                categoryDetails={categoryData}
                refreshCategories={getCategory}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center my-[1rem]">
          <Divider sx={{ width: "620px" }} />
        </div>

        <div className="flex justify-center ">
          <div className="flex flex-col gap-[24px] w-[590px]">
            {loading ? (
              <Skeleton variant="text" width="100%" height={24} />
            ) : (
              <Typography fontWeight={400} fontSize={16} color="#667085">
                {categoryData.description}
              </Typography>
            )}

            <div className="flex flex-col gap-[15px]">
              <Typography fontWeight={500} fontSize={14} color="#302F37">
                A.I Tools Under this Category ({categoryTools?.length})
              </Typography>

              <div className="h-[350px] overflow-y-auto pr-[8px] flex flex-col gap-[16px] mt-[12px]">
                {loading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex gap-[8px] items-center">
                          <Skeleton variant="circular" width={35} height={35} />
                          <Skeleton variant="text" width={120} height={20} />
                        </div>
                        <Skeleton variant="rounded" width={130} height={36} />
                      </div>
                    ))
                  : categoryTools?.map((tool) => (
                      <div
                        key={tool.name}
                        className="flex justify-between items-center"
                      >
                        <div className="flex gap-[8px] items-center">
                          <img
                            src={tool.demo_url}
                            alt={`Logo of ${tool.name}`}
                            className="w-[35px] h-[35px]"
                          />
                          <Typography
                            fontWeight={400}
                            fontSize={14}
                            color="#1D1F2C"
                          >
                            {tool.name}
                          </Typography>
                        </div>

                        <div className="bg-[#F0EEFF] rounded-[72px] py-[8px] pl-[12px] pr-[12px] w-[130px] overflow-hidden whitespace-nowrap text-ellipsis">
                          <a target="_blank" href={tool.demo_url}>
                            <Typography
                              color="#755AE2"
                              sx={{ fontFamily: "Open Sans, sans-serif" }}
                              fontWeight={400}
                              fontSize={14}
                            >
                              {tool.demo_url}
                            </Typography>
                          </a>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Pages>
  );
};

export default View;
