import { getSunrise, getSunset } from "sunrise-sunset-js";
import { useState } from "react";
import { getDate, getTime } from "../utils/helpers";

import classNames from "classnames";

export default function SunData() {
  const [city, setCity] = useState("San Francisco");
  // const [sunset, setSunset] = useState();
  const [date, setDate] = useState(getDate());
  const [time, setTime] = useState(getTime());

  return (
    <div
      className={classNames(
        "w-full border-2 my-3 border-yellow-500 h-[300px] flex flex-col items-start"
      )}
    >
      <div className={classNames("flex flex-row justify-between w-full")}>
        <div className={classNames("flex flex-col")}>
          <p>{time}</p>
          <p>{date}</p>
        </div>
        {/* city */}
        <form className="flex flex-col items-start space-y-1">
          <label htmlFor="city">Enter City</label>
          <input
            type="text"
            id="city"
            value={city}
            className="w-[175px]"
            onChange={(e) => setCity(e.target.value)}
          />
        </form>
      </div>
      <div
        className={classNames(
          "flex flex-col items-center text-center w-full justify-center space-y-2"
        )}
      >
        <p className="text-neutral-300">sunset today</p>
        <p className="text-6xl">6:31 PM</p>
        <p className="text-lg">San Francisco, California</p>
      </div>
    </div>
  );
}
