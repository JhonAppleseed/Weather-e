import HeroData from "./components/HeroData";
import Current from "./components/Current";
import Air from "./components/AirData";
import Today from "./components/Today";
import TodayAir from "./components/TodayAir";
import { useEffect, useState } from "react";

const App = () => {
  return (
    <div className="pb-[2%] px-[2%]">
      <div className=" flex justify-between py-[1.2em]">
        <div className="flex items-center gap-[1em]">
          <img
            className="w-[18%] cursor-pointer"
            src="/src/assets/favpng.png"
            alt=""
          />
          <h1 className="text-white font-bold text-[2.2ch]">WeatherE</h1>
        </div>
        <div className="flex gap-[0.4em] items-center">
          <img
            className="invert-50 w-[14%]"
            src="/src/assets/location.svg"
            alt=""
          />
          <span className="text-stone-400 mr-[0.5em] text-[1.3ch] text-nowrap">
            Helsinki, Finland
          </span>
          <span
            className="text-stone-400 text-[1.5ch] py-1 px-2.5 bg-[#2e333c] rounded-2xl cursor-pointer hover:text-stone-100 transition-all duration-200"
            onClick={() => window.location.reload()}
          >
            ⟳
          </span>
        </div>
      </div>
      {/* Current */}
      <div className="flex flex-col items-center gap-[1em]">
        <Current />
        <Today dataUsage={"temp"} name={"Temperature"} />
        <div className="flex gap-[1em] w-full">
          <Today dataUsage={"windspeed"} name={"Windspeed"} />
          <TodayAir dataUsage={"rain"} name={"Rain"} />
        </div>
      </div>
      {/* End --- Weather today */}
    </div>
  );
};
export default App;
