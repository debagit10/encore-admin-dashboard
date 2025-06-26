import { Rating, Typography } from "@mui/material";
import chatgpt from "../../assets/chatgpt.png";
import claude from "../../assets/claude.png";
import gemini from "../../assets/gemini.png";
import deepseek from "../../assets/deepseek.png";
import grok from "../../assets/grok.png";

const tools = [
  { icon: chatgpt, name: "Chat GPT", rating: 5 },
  { icon: claude, name: "Claude A.I", rating: 4.5 },
  { icon: gemini, name: "Gemini", rating: 4 },
  { icon: deepseek, name: "Deepseek", rating: 3.5 },
  { icon: grok, name: "Grok", rating: 3 },
];

const Most_Viewed_Tools = () => {
  return (
    <div className="p-[24px] rounded-[8px] bg-[#f5f3f3]">
      <div className="flex flex-col gap-[12px]">
        <Typography fontWeight={500} fontSize={20} color="#1D1F2C">
          Most Viewed A.I Tools
        </Typography>
        <Typography fontWeight={400} fontSize={16} color="#777980">
          Top 5 tools based on average rating
        </Typography>
      </div>

      <div className="h-[180px] overflow-y-auto pr-[8px] flex flex-col gap-[16px] mt-[12px]">
        {tools.map((tool) => (
          <div key={tool.name} className="flex justify-between items-center">
            <div className="flex gap-[8px] items-center">
              <img
                src={tool.icon}
                alt={`Logo of ${tool.name}`}
                className="w-[35px] h-[35px]"
              />
              <Typography fontWeight={400} fontSize={14} color="#1D1F2C">
                {tool.name}
              </Typography>
            </div>

            <Rating value={tool.rating} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Most_Viewed_Tools;
