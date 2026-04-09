import HeroData from "./components/HeroData";
import Current from "./components/Current";
import { useState } from "react";

const App = () => {
  const [tempIsActive, setTempIsActive] = useState(false);
  const [windSpeedIsActive, setWindSpeedIsActive] = useState(false);

  const changeBool = (item) => {
    if (item == "temp") {
      setTempIsActive(!tempIsActive);
    }

    if (item == "windspeed") {
      setWindSpeedIsActive(!windSpeedIsActive);
    }
  };

  return (
    <>
      <h1 className="text-[6ch] font-bold mt-20 text-white text-center">
        Weather In Helsinki
      </h1>
      <div className="flex flex-col items-center py-4 gap-2">
        <h1 className="text-white text-[3ch] font-bold">Current</h1>
        <Current />
      </div>
      <div className="p-4 gap-20 h-full items-center flex flex-col">
        <div className="flex flex-col gap-4 w-full items-center h-1/2">
          <h2 className="text-white font-semibold text-[3ch]">Temperature</h2>
          {tempIsActive ? (
            <div className="bg-[#001329] shadow-xl/30  flex w-1/2 rounded-xl pl-4 pr-10 py-6">
              <HeroData dataUsage={"temp"} />
            </div>
          ) : (
            <></>
          )}
          <button
            onClick={() => changeBool("temp")}
            className="bg-[#001329] shadow-xl/30 px-4 py-2 rounded-xl text-white cursor-pointer"
          >
            {tempIsActive ? "Close" : "Open Graph"}
          </button>
        </div>
        <div className="flex flex-col gap-4 w-full items-center h-1/2">
          <h2 className="text-white font-semibold text-[3ch]">Wind Speed</h2>
          {windSpeedIsActive ? (
            <div className="bg-[#001329] shadow-xl/30 flex w-1/2 rounded-xl pl-4 pr-10 py-6">
              <HeroData dataUsage={"windspeed"} />
            </div>
          ) : (
            <></>
          )}
          <button
            onClick={() => changeBool("windspeed")}
            className="bg-[#001329] shadow-xl/30 px-4 py-2 rounded-xl text-white cursor-pointer"
          >
            {windSpeedIsActive ? "Close" : "Open Graph"}
          </button>
        </div>
      </div>
    </>
  );
};
export default App;
