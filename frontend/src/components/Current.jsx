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

  const [heroData, setHeroData] = useState([]);
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
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Raw data", data);
        parseTime(data);
        setHeroData(data);
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
        <div className="bg-white shadow-xl/30 flex gap-4 rounded-xl px-4 py-2">
          <div>Time: {heroData[heroData.length - 1]?.time}</div>
          <span>|</span>
          <div>Temp: {heroData[heroData.length - 1]?.temp} °C</div>
          <span>|</span>
          <div>Windspeed: {heroData[heroData.length - 1]?.windspeed} °C</div>
        </div>
      )}
    </>
  );
}
