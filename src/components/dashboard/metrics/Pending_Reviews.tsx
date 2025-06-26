import { Typography } from "@mui/material";
import tools from "../../../icons/ai.png";
//import { RiArrowDownSFill } from "react-icons/ri";

const Pending_Reviews = () => {
  return (
    <div className="flex flex-col gap-[8px] w-[180px] bg-[#f5f3f3] py-[20px] px-[10px] rounded-[8px] ">
      <div className="flex gap-[4px] items-center">
        <img src={tools} className="w-[16px] h-[16px]" />
        <Typography
          color="#777980"
          fontWeight={400}
          fontSize={16}
          sx={{ fontFamily: "Open Sans, sans-serif" }}
        >
          Pending Reviews
        </Typography>
      </div>

      <Typography fontWeight={600} fontSize={32} color="#1D1F2C">
        50
      </Typography>

      {/* <div className="flex items-center gap-[4px]">
        <Typography fontWeight={700} fontSize={14} color="#4BB543">
          10%
        </Typography>
        <RiArrowDownSFill color="#4BB543" />

        <Typography fontWeight={400} fontSize={14} color="#858D9D">
          +30 today
        </Typography>
      </div> */}
    </div>
  );
};

export default Pending_Reviews;
