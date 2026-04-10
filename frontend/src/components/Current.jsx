import { useState, useEffect } from "react";

export default function Current() {
  const months = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  const [currentTemp, setCurrentTemp] = useState([]);
  const [currentAir, setCurrentAir] = useState([]);
  const [loading, setLoading] = useState(true);

  const parseTime = (data) => {
    // 2026-04-07T15:30
    var temp_time;
    data.forEach((item) => {
      temp_time =
        months[item.time.slice(5, 7)] +
        " " +
        item.time.slice(8, 10) +
        ", " +
        item.time.slice(11, item.time.length);
      // temp_time = temp_time;
      item.time = temp_time;
    });
  };

  useEffect(() => {
    fetch("http://localhost:8000/temp")
      .then((res) => res.json())
      .then((data) => {
        console.log("Raw data", data);
        parseTime(data);
        setCurrentTemp(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/air")
      .then((res) => res.json())
      .then((data) => {
        console.log("Raw data", data);
        parseTime(data);
        setCurrentAir(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <div className="bg-[#21252a] flex flex-col gap-4 rounded-xl p-[1.2em] px-[4vw] border-solid w-full border-[#42454b] border">
          <div className="flex w-full justify-between items-center">
            <div className="text-[1.3ch]  flex gap-[1em]">
              <h1 className="text-gray-400">CURRENT WEATHER</h1>
              <h2 className="text-gray-200">
                {currentTemp[currentTemp.length - 1]?.time}
              </h2>
            </div>

            <span className="text-[1.2ch] text-[#38a4e2]">LIVE</span>
          </div>
          <div>
            <span className="text-[5ch] font-semibold text-gray-100">
              {currentTemp[currentTemp.length - 1]?.temp}°C
            </span>
          </div>
          <div className="h-px flex w-full bg-gray-600"></div>
          {/* Additionals */}
          <div className="flex gap-[4em]">
            <div className="flex flex-col text-gray-400">
              <span>Rain</span>
              <span className="text-[1.5ch] font-semilight text-gray-100">
                {currentAir[currentAir.length - 1]?.rain} %
              </span>
            </div>
            <div className="flex flex-col text-gray-400">
              <span>Windspeed</span>
              <span className="text-[1.5ch] font-semilight text-gray-100">
                {currentTemp[currentTemp.length - 1]?.windspeed} km/h
              </span>
            </div>
            <div className="flex flex-col text-gray-400">
              <span>Humidity</span>
              <span className="text-[1.5ch] font-semilight text-gray-100">
                {currentAir[currentAir.length - 1]?.humidy} %
              </span>
            </div>
            <div className="flex flex-col text-gray-400">
              <span>Visibility</span>
              <span className="text-[1.5ch] font-semilight text-gray-100">
                {currentAir[currentAir.length - 1]?.visibility / 1000} km
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
// heroData[heroData.length - 1]?.time
// border-[#42454b] card border color
// bg-[#2e333c] card bg
// text-stone-400 text col
