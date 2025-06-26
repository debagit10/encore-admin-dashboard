import { Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Pages from "../container/Pages";
import { IoNotifications } from "react-icons/io5";
import logo from "../assets/logo.png";

const Dashboard = () => {
  return (
    <Pages>
      <Navbar page="Dashboard">
        <div className="flex gap-[1rem] items-center  ">
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
    </Pages>
  );
};

export default Dashboard;
