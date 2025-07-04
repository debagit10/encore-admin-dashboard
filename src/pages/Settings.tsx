import { IoNotifications } from "react-icons/io5";
import Navbar from "../components/Navbar";
import Pages from "../container/Pages";
import { TextField, Typography } from "@mui/material";
import Edit_Profile from "../modals/profile/Edit_Profile";
import { useEffect, useState } from "react";
import Change_Password from "../modals/profile/Change_Password";

interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

const Settings = () => {
  const [userData, setUserData] = useState<UserDetails>();

  const [focusedFields, setFocusedFields] = useState({
    first_name: false,
    last_name: false,
    email: false,
  });

  const handleFocus = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: false }));
  };

  useEffect(() => {
    const adminString = localStorage.getItem("adminData");
    if (adminString) {
      const adminData = JSON.parse(adminString);
      setUserData(adminData);
    }
  }, []);

  return (
    <Pages>
      <Navbar page="Settings">
        <IoNotifications color="#777777" size={20} />
      </Navbar>

      <div className="px-[33.5px]">
        <div className="flex justify-center mt-[2rem]">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div className="flex flex-col gap-[8px]">
                <Typography fontWeight={500} fontSize={24} color="#1D1F2C">
                  Admin Profile
                </Typography>
                <Typography fontWeight={400} fontSize={16} color="#667085">
                  These are your informations, you can make changes.
                </Typography>
              </div>

              <div className="">
                <Edit_Profile />
              </div>
            </div>

            <div className="flex flex-col gap-[15px] mt-[2rem]">
              <div className="flex gap-[15px]">
                <div>
                  <Typography
                    fontWeight={600}
                    sx={{
                      color: focusedFields.first_name ? "#0167C4" : "#00294E",
                      fontFamily: "Open Sans, sans-serif",
                    }}
                    fontSize={14}
                  >
                    First Name
                  </Typography>
                  <TextField
                    disabled
                    onFocus={() => handleFocus("first_name")}
                    onBlur={() => handleBlur("first_name")}
                    focused={focusedFields.first_name}
                    name="first_name"
                    value={userData?.first_name}
                    type="text"
                    size="small"
                    fullWidth
                    sx={{
                      width: "373px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />
                </div>

                <div>
                  <Typography
                    fontWeight={600}
                    sx={{
                      color: focusedFields.last_name ? "#0167C4" : "#00294E",
                      fontFamily: "Open Sans, sans-serif",
                    }}
                    fontSize={14}
                  >
                    Last Name
                  </Typography>
                  <TextField
                    disabled
                    onFocus={() => handleFocus("last_name")}
                    onBlur={() => handleBlur("last_name")}
                    focused={focusedFields.last_name}
                    name="last_name"
                    value={userData?.last_name}
                    type="text"
                    size="small"
                    fullWidth
                    sx={{
                      width: "373px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-[15px]">
                <div>
                  <Typography
                    fontWeight={600}
                    sx={{
                      color: focusedFields.email ? "#0167C4" : "#00294E",
                      fontFamily: "Open Sans, sans-serif",
                    }}
                    fontSize={14}
                  >
                    Email
                  </Typography>
                  <TextField
                    disabled
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    focused={focusedFields.email}
                    name="email"
                    value={userData?.email}
                    type="text"
                    size="small"
                    fullWidth
                    sx={{
                      width: "373px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />
                </div>

                <div>
                  <Typography
                    fontWeight={600}
                    sx={{
                      color: "#00294E",
                      fontFamily: "Open Sans, sans-serif",
                    }}
                    fontSize={14}
                  >
                    Role
                  </Typography>
                  <TextField
                    disabled
                    name="role"
                    value={userData?.role}
                    type="text"
                    size="small"
                    fullWidth
                    sx={{
                      width: "373px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-[2rem] ">
              <Change_Password />
            </div>
          </div>
        </div>
      </div>
    </Pages>
  );
};

export default Settings;
