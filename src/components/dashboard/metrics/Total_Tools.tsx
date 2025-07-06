import { Typography } from "@mui/material";
// import { RiArrowUpSFill } from "react-icons/ri";
import tool_icon from "../../../icons/metrics/ai.png";
import api from "../../../utils/axiosInstance";
import { useEffect, useState } from "react";

const Total_Tools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTools = async () => {
    setLoading(true);

    try {
      const response = await api.get("/api/tool/all");
      if (response.data.success) {
        setTools(response.data.data);
        return;
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTools();
  }, []);

  return (
    <div className="flex flex-col gap-[8px] w-[250px] bg-[#f5f3f3] py-[20px] px-[10px] rounded-[8px] ">
      <div className="flex gap-[4px] items-center">
        <img src={tool_icon} className="w-[16px] h-[16px]" />
        <Typography
          color="#777980"
          fontWeight={400}
          fontSize={16}
          sx={{ fontFamily: "Open Sans, sans-serif" }}
        >
          Total A.I Tools
        </Typography>
      </div>

      <Typography fontWeight={600} fontSize={32} color="#1D1F2C">
        {tools.length}
      </Typography>
    </div>
  );
};

export default Total_Tools;
