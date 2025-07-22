
import React from "react";

//  props'ların tipi
interface ClockProps {
  hour: number;     
  minute: number;   
}

const Clock: React.FC<ClockProps> = ({ hour, minute }) => {

  const formatTime = (value: number) => {
    return value < 10 ? `0${value}` : value;  // değerleri ikili yaz 05, 09 vs.
  };

  // JSX: Saat, dakikayı göste
  return (
    <div>
      {formatTime(hour)}:{formatTime(minute)}
    </div>
  );
};

export default Clock;
