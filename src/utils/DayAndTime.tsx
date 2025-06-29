import React from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

interface DayAndTimeProps {
  date?: string;
}

const DayAndTime: React.FC<DayAndTimeProps> = ({ date }) => {
  const day = dayjs(date).format("Do"); // 24th
  const monthYear = dayjs(date).format("MMMM YYYY"); // June 2024

  return <>{`${day} Of ${monthYear}`}</>;
};

export default DayAndTime;
