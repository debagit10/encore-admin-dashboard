import { Typography } from "@mui/material";

import chatgpt from "../../assets/chatgpt.png";
import claude from "../../assets/claude.png";
import gemini from "../../assets/gemini.png";
import deepseek from "../../assets/deepseek.png";
import grok from "../../assets/grok.png";

const tools = [
  { icon: claude, name: "Claude A.I", clicks: 400 },
  { icon: chatgpt, name: "Chat GPT", clicks: 350 },
  { icon: grok, name: "Grok", clicks: 300 },
  { icon: deepseek, name: "Deepseek", clicks: 250 },
  { icon: gemini, name: "Gemini", clicks: 200 },
];

const Top_Rated_Tools = () => {
  return (
    <div className="p-[24px] rounded-[8px] bg-[#f5f3f3]">
      <div className="flex flex-col gap-[12px]">
        <Typography fontWeight={500} fontSize={20} color="#1D1F2C">
          Top Rated A.I tools
        </Typography>
        <Typography fontWeight={400} fontSize={16} color="#777980">
          Top 5 tools based on average visits
        </Typography>
      </div>

      <div className="h-[180px] overflow-y-auto pr-[8px] flex flex-col gap-[16px] mt-[12px]">
        {tools.map((tool) => (
          <div className="flex justify-between items-center">
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

            <Typography fontWeight={500} fontSize={14} color="#1D1F2C">
              {tool.clicks}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top_Rated_Tools;
