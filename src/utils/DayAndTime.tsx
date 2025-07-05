// src/utils/formatDate.ts
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export const formatDayAndTime = (date?: string | Date) => {
  if (!date) return "";
  const day = dayjs(date).format("Do");
  const monthYear = dayjs(date).format("MMMM YYYY");
  return `${day} Of ${monthYear}`;
};
