import { Rating, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../utils/axiosInstance";

interface Tools {
  averageRating: number;
  reviewCount: number;
  toolId: string;
  name: string;
  image: string;
}

const Top_Rated_Tools = () => {
  const [tools, setTools] = useState<Tools[]>([]);
  const [loading, setLoading] = useState(false);

  const getTopTools = async () => {
    setLoading(true);

    try {
      const response = await api.get("/api/top-tools");
      if (response.data) {
        setTools(response.data);
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
          <div key={tool.toolId} className="flex justify-between items-center">
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

            <Rating value={tool.averageRating} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top_Rated_Tools;
