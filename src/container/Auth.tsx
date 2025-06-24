import React from "react";
import background from "../assets/background.png";

interface AuthProps {
  children?: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="">
        <img
          src={background}
          alt="encore background"
          className="h-[100vh] w-[818px] "
        />
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Auth;
