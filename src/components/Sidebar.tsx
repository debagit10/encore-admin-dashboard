//import logo from "../logo/Logo_white.png";
import { Avatar, Divider, Typography } from "@mui/material";

import logo from "../assets/logo.png";
import bulb from "../icons/bulb.png";

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import dashboard from "../icons/dashboard.png";
import tools from "../icons/tools.png";
import categories from "../icons/categories.png";
import review from "../icons/review.png";
import settings from "../icons/settings.png";

import dashboard_2 from "../icons/dashboard_2.png";
import tools_2 from "../icons/tools_2.png";
import categories_2 from "../icons/categories_2.png";
import review_2 from "../icons/review_2.png";
import settings_2 from "../icons/settings_2.png";

const sideItems = [
  {
    id: 0,
    name: "Dashboard",
    icon: dashboard,
    icon_2: dashboard_2,
    route: "/dashboard",
  },
  {
    id: 1,
    name: "Tool Management",
    icon: tools,
    icon_2: tools_2,
    route: "/tools",
  },

  {
    id: 2,
    name: "Categories",
    icon: categories,
    icon_2: categories_2,
    route: "/categories",
  },
  { id: 3, name: "Reviews", icon: review, icon_2: review_2, route: "/reviews" },
  {
    id: 4,
    name: "Settings",
    icon: settings,
    icon_2: settings_2,
    route: "/settings",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeRoute, setActiveRoute] = useState(location.pathname);

  useEffect(() => {
    setActiveRoute(location.pathname); // syncs state with actual route on load or refresh
  }, [location.pathname]);

  return (
    <div className="w-[280px] sidebar-gradient flex flex-col justify-between text-white  h-[100vh]">
      <div>
        <div className="flex justify-between items-center px-[1.5rem]">
          <div
            className="flex gap-[9px] py-[23px] px-[16px] cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <img className="h-[33px] w-[33px]" src={logo} alt="logo" />
            <Typography
              fontWeight={900}
              sx={{ fontFamily: "Open Sans, sans-serif" }}
              fontSize={"24px"}
              color="#0167C4"
            >
              Encore
            </Typography>
          </div>

          <img src={bulb} alt="illustration of innovation" />
        </div>

        <Divider />

        <div className="m-[1.5rem] p-[1rem] rounded-[12px] flex gap-[7px] bg-[#2B2B33]">
          <div>
            <Avatar sx={{ width: 44, height: 44 }}>AL</Avatar>
          </div>

          <div className="flex flex-col gap-[7px]">
            <Typography
              fontWeight={700}
              fontSize={13}
              sx={{ fontFamily: "Open Sans, sans-serif" }}
            >
              Ademola Lookman
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={10}
              color="#808084"
              sx={{ fontFamily: "Open Sans, sans-serif" }}
            >
              ADMINISTRATOR
            </Typography>
          </div>
        </div>

        <Divider />

        <div className="flex flex-col gap-[4px] mt-[1rem] ">
          {sideItems.map((item, index) => {
            return (
              <div
                className={`${
                  activeRoute === item.route
                    ? "border-r-6 border-[#0167C4]"
                    : ""
                }`}
                key={index}
              >
                <div
                  key={index}
                  className={`flex items-center gap-[12px] py-[12px] mx-[1.5rem] px-[16px] rounded-[8px] cursor-pointer transition-all duration-300 ease-in-out ${
                    activeRoute === item.route
                      ? "bg-[#2B2B33] text-[#FFFFFF] font-semibold"
                      : ""
                  }`}
                  onClick={() => {
                    navigate(item.route);
                    setActiveRoute(item.route);
                  }}
                >
                  <div className="text-[#0167C4]">
                    <img
                      color={activeRoute === item.route ? "#0167C4" : "white"}
                      src={activeRoute === item.route ? item.icon_2 : item.icon}
                      alt={item.name}
                    />
                  </div>
                  <div>
                    <Typography
                      fontWeight={400}
                      sx={{ fontFamily: "Open Sans, sans-serif" }}
                      fontSize="14px"
                    >
                      {item.name}
                    </Typography>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
