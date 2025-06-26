import chatgpt from "../../assets/chatgpt.png";
import claude from "../../assets/claude.png";
import gemini from "../../assets/gemini.png";
import deepseek from "../../assets/deepseek.png";
import grok from "../../assets/grok.png";
import { Stack, Avatar, Tooltip, Typography } from "@mui/material";

const tools = [
  { icon: chatgpt, name: "Chat GPT" },
  { icon: claude, name: "Claude A.I" },
  { icon: gemini, name: "Gemini" },
  { icon: deepseek, name: "Deepseek" },
  { icon: grok, name: "Grok" },
  { icon: chatgpt, name: "Chat GPT" },
  { icon: claude, name: "Claude A.I" },
  { icon: gemini, name: "Gemini" },
  { icon: deepseek, name: "Deepseek" },
  { icon: grok, name: "Grok" },
];

const Recently_Added = () => {
  return (
    <div className="p-[24px] rounded-[8px] bg-[#f5f3f3]">
      <div className="flex flex-col gap-[12px] mb-[1.5rem]">
        <Typography fontWeight={400} fontSize={14} color="#2B2B33">
          Recently Added A.I
        </Typography>
      </div>

      <Stack direction="row" spacing={2}>
        {tools.map((tool) => (
          <Tooltip title={tool.name}>
            <Avatar
              src={tool.icon}
              alt={`Logo of ${tool.name}`}
              className="w-[40px] h-[40px]"
            />
          </Tooltip>
        ))}
      </Stack>
    </div>
  );
};

export default Recently_Added;
