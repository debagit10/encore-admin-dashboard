import { Button, ButtonGroup, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Pages from "../container/Pages";
import { IoNotifications } from "react-icons/io5";
import logo from "../assets/logo.png";
import { useState } from "react";
import Total_Tools from "../components/dashboard/metrics/Total_Tools";
import Total_Categories from "../components/dashboard/metrics/Total_Categories";
import Pending_Reviews from "../components/dashboard/metrics/Pending_Reviews";
import Total_Reviews from "../components/dashboard/metrics/Total_Reviews";
import Most_Viewed_Tools from "../components/dashboard/Most_Viewed_Tools";
import Top_Rated_Tools from "../components/dashboard/Top_Rated_Tools";
import Top_Categories from "../components/dashboard/Top_Categories";
import Recently_Added from "../components/dashboard/Recently_Added";

const Dashboard = () => {
  const [period, setPeriod] = useState<number>(0);

  const buttonGroup = [
    { label: "All Date" },
    { label: "12 Months" },
    { label: "30 Days" },
    { label: "7 Days" },
    { label: "24 Hours" },
  ];

  const metrics = [
    { component: <Total_Tools /> },
    { component: <Total_Categories /> },
    { component: <Pending_Reviews /> },
    { component: <Total_Reviews /> },
  ];

  return (
    <Pages>
      <Navbar page="Dashboard">
        <div className="flex gap-[1rem] items-center mb-[5rem]  ">
          <IoNotifications color="#777777" size={20} />

          <div className="flex gap-[11px] items-center bg-[#E7F3FD] rounded-[8px] h-[56px] pl-[1rem] pr-[2rem] ">
            <img src={logo} height={40} width={40} />

            <div className="flex flex-col gap-[4px]">
              <Typography fontWeight={500} fontSize={12} color="#0167C4">
                Ademola Lookman
              </Typography>
              <Typography fontWeight={400} fontSize={10} color="#999999">
                ademolalookman@gmail.com
              </Typography>
            </div>
          </div>
        </div>
      </Navbar>

      <div className="px-[33.5px] pt-[.5rem]">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-[8px]">
            <Typography fontWeight={500} fontSize={24} color="#1D1F2C">
              Welcome Back Lookman 👋🏼
            </Typography>
            <Typography fontWeight={400} fontSize={14} color="#667085">
              We have your reports ready , Get ready to change the world with AI
            </Typography>
          </div>

          <div>
            <ButtonGroup
              variant="outlined"
              sx={{
                borderRadius: "8px",
                border: "1px solid #E0E2E7",
                "& .MuiButtonGroup-grouped": {
                  margin: "3px",
                  border: "none",
                  borderRadius: "8px !important",
                  color: "#667085",
                },
                "& .MuiButton-outlined": {},
              }}
            >
              {buttonGroup.map((button, index) => (
                <Button
                  key={index}
                  sx={{
                    textTransform: "capitalize",
                    backgroundColor: period === index ? "#E7F3FD" : "inherit",
                  }}
                  onClick={() => setPeriod(index)}
                >
                  <Typography
                    color={period === index ? "#0167C4" : "#667085"}
                    fontWeight={period === index ? 600 : 400}
                    fontSize={14}
                  >
                    {button.label}
                  </Typography>
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </div>

        <div className="flex gap-[2rem]">
          <div>
            <div className="flex gap-[.5rem] pt-[.5rem]">
              {metrics.map((metric) => metric.component)}
            </div>

            <div className="pt-[.5rem]">
              <Recently_Added />
            </div>

            <div className="pt-[.5rem] w-[767px]">
              <Most_Viewed_Tools />
            </div>
          </div>

          <div>
            <div className="w-[356px]  pt-[.5rem]">
              <Top_Categories />
            </div>

            <div className="w-[356px] pt-[.5rem]">
              <Top_Rated_Tools />
            </div>
          </div>
        </div>
      </div>
    </Pages>
  );
};

export default Dashboard;
