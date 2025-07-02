import React from "react";
import Sidebar from "../components/Sidebar";

interface PagesProps {
  children?: React.ReactNode;
  page?: string;
}

const Pages: React.FC<PagesProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="fixed">
        <Sidebar />
      </div>

      <div className="ml-[280px] w-[100%]">
        <div className="bg-[#FAFAFA] h-[87vh]">{children}</div>
      </div>
    </div>
  );
};

export default Pages;
