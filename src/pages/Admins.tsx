import Pages from "../container/Pages";
import Navbar from "../components/Navbar";
import { IoNotifications } from "react-icons/io5";
import { Avatar, Chip, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Add_Admin from "../modals/admins/Add_Admin";
import Actions from "../components/admins/Actions";
import api from "../utils/axiosInstance";
import { getInitials } from "../utils/Initials";

interface AdminsState {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  suspended: string;
  _id: string;
}

const Admins = () => {
  const [admins, setAdmins] = useState<AdminsState[]>();

  const [loading, setLoading] = useState<boolean>(true);

  const getAdmins = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/admin/all");
      if (response.data.success) {
        setAdmins(response.data.data);
        return;
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <Pages>
      <Navbar page="Manage Admins">
        <div className="flex gap-[1rem] items-center">
          <IoNotifications color="#777777" size={20} />

          <Add_Admin />
        </div>
      </Navbar>

      <div className="px-[33.5px] mx-[2rem] my-[1rem]">
        <div className=" p-[1rem] ">
          <Typography fontWeight={400} fontSize={16} color="#667085">
            Add new admins, Assign/remove roles, Edit admin details
          </Typography>

          <div className="h-[600px] overflow-y-auto">
            {admins?.map((item) => (
              <div className="flex justify-between items-center mt-[.5rem] border-[1px] border-[#CCCCCE] p-[1rem] rounded-[8px]">
                <div className="flex gap-[12px]">
                  <Avatar
                    sx={{
                      backgroundColor: "#55555C",
                      height: "44px",
                      width: "44px",
                    }}
                  >
                    <Typography color="#FFFFFF" fontSize={20} fontWeight={400}>
                      {getInitials(`${item.first_name} ${item.last_name}`)}
                    </Typography>
                  </Avatar>
                  <div className="flex flex-col gap-[7px] ">
                    <Typography fontWeight={700} fontSize={13} color="#302F37">
                      {item.first_name} {item.last_name}
                    </Typography>
                    <Typography
                      fontWeight={400}
                      fontSize={10}
                      color="#808084"
                      sx={{ textTransform: "uppercase" }}
                    >
                      {item.role}
                    </Typography>
                    <Typography fontWeight={400} fontSize={10} color="#808084">
                      {item.email}
                    </Typography>
                  </div>
                </div>

                <Chip
                  label={item.suspended ? "Suspended" : "Active"}
                  sx={{
                    fontFamily: "Open Sans, sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    backgroundColor: item.suspended ? "#ffcdd2" : "#c8e6c9",
                    color: item.suspended ? "#d32f2f" : "#2e7d32",
                  }}
                />

                <Actions adminDetails={item} refreshAdmins={getAdmins} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Pages>
  );
};

export default Admins;
