// components/DynamicTitle.tsx
import React from "react";
import { Helmet } from "react-helmet-async";

interface DynamicTitleProps {
  title: string;
}

const DynamicTitle: React.FC<DynamicTitleProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default DynamicTitle;
