import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";

interface Tools {
  visitCount: number;
  toolId: string;
  name: string;
  image?: string;
}

const Most_Viewed_Tools = () => {
  const [tools, setTools] = useState<Tools[]>();
  const [loading, setLoading] = useState(false);

  const getTopTools = async () => {
    setLoading(true);

    try {
      const response = await api.get("/api/top-visited");
      if (response.data) {
        setTools(response.data);
        console.log(response.data);
        return;
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopTools();
  }, []);

  console.log(tools);

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
        {tools?.map((tool) => (
          <div className="flex justify-between items-center">
            <div className="flex gap-[8px] items-center">
              <img
                src={tool.image}
                alt={`Logo of ${tool.name}`}
                className="w-[35px] h-[35px]"
              />
              <Typography fontWeight={400} fontSize={14} color="#1D1F2C">
                {tool.name}
              </Typography>
            </div>

            <Typography fontWeight={500} fontSize={14} color="#1D1F2C">
              {tool.visitCount}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Most_Viewed_Tools;
