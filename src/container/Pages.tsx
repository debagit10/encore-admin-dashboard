import React from "react";
import Sidebar from "../components/Sidebar";

interface PagesProps {
  children?: React.ReactNode;
  page?: string;
}

const Pages: React.FC<PagesProps> = ({ children }) => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>

      <div className="w-[100%]">
        <div className="px-5 bg-[#FAFAFA] h-[90vh]">{children}</div>
      </div>
    </div>
  );
};

export default Pages;
