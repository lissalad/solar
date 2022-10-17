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
  const [city, setCity] = useState("San Francisco");
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
        "w-full my-3 h-[300px] flex flex-col items-center justify-center bg-[url('/sunset-sky.jpg')] bg-bottom text-neutral-900"
      )}
    >
      <div className={classNames("flex flex-col items-center my-3")}>
        <p>Sunset for {date}</p>
        <p className="text-6xl">{sunset}</p>
      </div>
      <div
        className={classNames(
          "flex flex-col items-center text-center w-full justify-center space-y-2"
        )}
      >
        {/* <p className="text-lg">San Francisco, California</p> */}
      </div>
      <button
        className="bg-stone-700/80 text-sm text-stone-200 px-4 py-1 rounded"
        onClick={handleGrantLocation}
      >
        grant location
      </button>
    </div>
  );
}
