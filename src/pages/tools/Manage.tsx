import { IoNotifications } from "react-icons/io5";
import Navbar from "../../components/Navbar";
import Pages from "../../container/Pages";
// import { Button } from "@mui/material";
import Create_Tool from "../../modals/Create_Tool";

const Manage = () => {
  return (
    <Pages>
      <Navbar page="Tool Management">
        <div className="flex gap-[1rem] items-center">
          <IoNotifications color="#777777" size={20} />

          <Create_Tool />
        </div>
      </Navbar>
    </Pages>
  );
};

export default Manage;
