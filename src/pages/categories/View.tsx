//import React, { useState } from "react";
import Pages from "../../container/Pages";
import Navbar from "../../components/Navbar";
import { Button, Divider, Tooltip, Typography } from "@mui/material";
import { IoMdArrowBack } from "react-icons/io";

import education from "../../icons/categories/education.png";

import { useNavigate } from "react-router-dom";
import Actions from "../../components/category/Actions";

// interface CategoryDetails {
//   id: string;
//   user_id: string;
//   logo: string;
//   name: string;
//   comment: string;
//   date: string;
//   category: string;
//   rating: 4;
//   status: boolean;
// }

import chatgpt from "../../assets/chatgpt.png";
import claude from "../../assets/claude.png";
import gemini from "../../assets/gemini.png";
import deepseek from "../../assets/deepseek.png";
import grok from "../../assets/grok.png";

const tools = [
  { icon: claude, name: "Claude A.I", demo_url: "https://chatgpt.com" },
  { icon: chatgpt, name: "Chat GPT", demo_url: "https://chatgpt.com" },
  { icon: grok, name: "Grok", demo_url: "https://chatgpt.com" },
  { icon: deepseek, name: "Deepseek", demo_url: "https://chatgpt.com" },
  { icon: gemini, name: "Gemini", demo_url: "https://chatgpt.com" },
];

const View = () => {
  //const [categoryData, setCategoryData] = useState<CategoryDetails>();

  const navigate = useNavigate();

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
          <div className="flex flex-col gap-[10px] w-[590px]">
            <img src={education} className="w-[20px] h-[20px]" />

            <div className="flex justify-between">
              <Typography fontWeight={500} fontSize={24} color="#302F37">
                Education
              </Typography>

              <Actions />
            </div>
          </div>
        </div>

        <div className="flex justify-center my-[1rem]">
          <Divider sx={{ width: "620px" }} />
        </div>

        <div className="flex justify-center ">
          <div className="flex flex-col gap-[24px] w-[590px]">
            <Typography fontWeight={400} fontSize={16} color="#667085">
              Education as a category of AI models focuses on enhancing learning
              experiences through personalized tutoring, intelligent content
              generation, and adaptive assessment systems. These models analyze
              student performance and behavior to provide tailored support,
              improving engagement and learning outcomes.
            </Typography>

            <div className="flex flex-col gap-[15px]">
              <Typography fontWeight={500} fontSize={14} color="#302F37">
                A.I Tools Under this Category ({tools.length})
              </Typography>

              <div className="h-[350px] overflow-y-auto pr-[8px] flex flex-col gap-[16px] mt-[12px]">
                {tools.map((tool) => (
                  <div className="flex justify-between items-center">
                    <div className="flex gap-[8px] items-center">
                      <img
                        src={tool.icon}
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
