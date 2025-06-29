import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RatingProps {
  value?: number;
  max?: number;
}

const Rating: React.FC<RatingProps> = ({ value = 0, max = 5 }) => {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    if (value >= i) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (value >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-500" />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default Rating;
