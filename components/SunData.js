import { getSunrise, getSunset } from "sunrise-sunset-js";
import { useState } from "react";
import { getDate, getTime } from "../utils/helpers";

import classNames from "classnames";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export default function SunData() {
  const [sunset, setSunset] = useState();
  const [date, setDate] = useState(getDate());
  const [time, setTime] = useState(getTime());

  function handleGrantLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      const sunsetTime = getSunset(
        position.coords.latitude,
        position.coords.longitude
      );
      setSunset(sunsetTime.toLocaleString().split(",")[1]);
    });
  }

  return (
    <div
      className={classNames(
        "w-full h-[300px] flex flex-col justify-center justify-between bg-[url('/sunset.jpg')] bg-cover text-neutral-100 relative"
      )}
    >
      {sunset ? (
        <>
          <div
            className={classNames(
              "flex flex-col items-center my-3 bg-neutral-600/50 w-fit px-4 py-2 space-y-2 absolute bottom-2"
            )}
          >
            <p className="text-left w-full">Today's Sunset</p>
            <p className="text-6xl">{sunset}</p>
            <p>{date}</p>
          </div>
          <div
            className={classNames(
              "flex flex-col items-center text-center w-full justify-center space-y-2"
            )}
          ></div>
        </>
      ) : (
        <button
          className="flex flex-col items-center my-3 bg-neutral-600/50 w-fit px-4 py-2 space-y-2 absolute bottom-2"
          onClick={handleGrantLocation}
        >
          Get sunset time for my location
        </button>
      )}
    </div>
  );
}
