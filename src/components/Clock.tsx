import React from "react";

//  props'ların tipi tanımlandı
interface ClockProps {
  hour: number;     
  minute: number;   
}
// Clock adında function component tanımlayıp destructuring ile props içinden hour, minute çektik.
const Clock: React.FC<ClockProps> = ({ hour, minute }) => {

  const formatTime = (value: number) => {
    return value < 10 ? `0${value}` : value;  
    // value 10'dan küçükse başına 0 koy, 10 dan küçük değilse direk yaz.
  };

  return (
    <div>
      {formatTime(hour)}:{formatTime(minute)}
    </div>
  );
};

export default Clock;
