import { IoNotifications } from "react-icons/io5";
import Navbar from "../components/Navbar";
import Pages from "../container/Pages";

const Settings = () => {
  return (
    <Pages>
      <Navbar page="Settings">
        <IoNotifications color="#777777" size={20} />
      </Navbar>
    </Pages>
  );
};

export default Settings;
