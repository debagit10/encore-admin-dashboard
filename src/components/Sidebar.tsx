//import logo from "../logo/Logo_white.png";
import { Avatar, Divider, Typography } from "@mui/material";

import logo from "../assets/logo.png";
import bulb from "../icons/sidebar/bulb.png";

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import dashboard from "../icons/sidebar/dashboard.png";
import tools from "../icons/sidebar/tools.png";
import categories from "../icons/sidebar/categories.png";
import review from "../icons/sidebar/review.png";
import settings from "../icons/sidebar/settings.png";

import dashboard_2 from "../icons/sidebar/dashboard_2.png";
import tools_2 from "../icons/sidebar/tools_2.png";
import categories_2 from "../icons/sidebar/categories_2.png";
import review_2 from "../icons/sidebar/review_2.png";
import settings_2 from "../icons/sidebar/settings_2.png";

import { HiOutlineUsers } from "react-icons/hi";
import Logout from "../modals/profile/LogOut";
import { getInitials } from "../utils/Initials";

const sideItems_1 = [
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
];

interface AdminData {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [admin, setAdmin] = useState<AdminData>({
    first_name: "",
    last_name: "",
    role: "",
    email: "",
  });

  const [activeRoute, setActiveRoute] = useState(location.pathname);

  useEffect(() => {
    const adminString = localStorage.getItem("adminData");
    if (adminString) {
      const adminData = JSON.parse(adminString);
      setAdmin(adminData);
    }
    setActiveRoute(location.pathname); // syncs state with actual route on load or refresh
  }, [location.pathname]);

  return (
    <div className="w-[280px] sidebar-gradient flex flex-col justify-between text-white h-[100vh]">
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

        <Divider sx={{ borderColor: "#2B2B33" }} />

        <div className="m-[1.5rem] p-[1rem] rounded-[12px] flex gap-[7px] bg-[#2B2B33]">
          <div>
            <Avatar sx={{ width: 44, height: 44 }}>
              {getInitials(`${admin.first_name} ${admin.last_name}`)}
            </Avatar>
          </div>

          <div className="flex flex-col gap-[7px]">
            <Typography
              fontWeight={700}
              fontSize={13}
              sx={{ fontFamily: "Open Sans, sans-serif" }}
            >
              {admin.first_name} {admin.last_name}
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={10}
              color="#808084"
              sx={{ fontFamily: "Open Sans, sans-serif" }}
            >
              {admin.role}
            </Typography>
          </div>
        </div>

        <Divider sx={{ borderColor: "#2B2B33" }} />

        <div className="flex flex-col gap-[4px] my-[1rem] ">
          {sideItems_1.map((item, index) => {
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

        <Divider sx={{ borderColor: "#2B2B33" }} />

        <div className="flex flex-col gap-[4px] my-[1rem] ">
          <div
            className={`${
              activeRoute === "/admins" ? "border-r-6 border-[#0167C4]" : ""
            }`}
          >
            <div
              className={`flex items-center gap-[12px] py-[12px] mx-[1.5rem] px-[16px] rounded-[8px] cursor-pointer transition-all duration-300 ease-in-out ${
                activeRoute === "/admins"
                  ? "bg-[#2B2B33] text-[#FFFFFF] font-semibold"
                  : ""
              }`}
              onClick={() => {
                navigate("/admins");
                setActiveRoute("/admins");
              }}
            >
              <div className="text-[#0167C4]">
                <HiOutlineUsers
                  color={activeRoute === "/admins" ? "#0167C4" : "#AAAAAD"}
                />
              </div>
              <div>
                <Typography
                  fontWeight={400}
                  sx={{ fontFamily: "Open Sans, sans-serif" }}
                  fontSize="14px"
                >
                  Admins
                </Typography>
              </div>
            </div>
          </div>

          <div
            className={`${
              activeRoute === "/settings" ? "border-r-6 border-[#0167C4]" : ""
            }`}
          >
            <div
              className={`flex items-center gap-[12px] py-[12px] mx-[1.5rem] px-[16px] rounded-[8px] cursor-pointer transition-all duration-300 ease-in-out ${
                activeRoute === "/settings"
                  ? "bg-[#2B2B33] text-[#FFFFFF] font-semibold"
                  : ""
              }`}
              onClick={() => {
                navigate("/settings");
                setActiveRoute("/settings");
              }}
            >
              <div className="text-[#0167C4]">
                <img
                  color={activeRoute === "/settings" ? "#0167C4" : "white"}
                  src={activeRoute === "/settings" ? settings_2 : settings}
                />
              </div>
              <div>
                <Typography
                  fontWeight={400}
                  sx={{ fontFamily: "Open Sans, sans-serif" }}
                  fontSize="14px"
                >
                  Settings
                </Typography>
              </div>
            </div>
          </div>

          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
