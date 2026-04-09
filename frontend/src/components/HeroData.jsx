import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { useState, useEffect } from "react";

export default function HeroData({ dataUsage }) {
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
    <AreaChart
      width="100%"
      height={400}
      data={heroData}
      style={{ background: "#ff000" }}
      margin={{ bottom: 20, left: 6, right: 12 }}
    >
      <defs>
        <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#1D9E75" stopOpacity={0.85} />
          <stop offset="95%" stopColor="#1D9E75" stopOpacity={0.25} />
        </linearGradient>
      </defs>
      <CartesianGrid stroke="rgba(255,255,255,0.08)" />
      <XAxis
        dataKey="time"
        label={{ value: "Time", position: "insideBottom", offset: -16 }}
      />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey={dataUsage}
        stroke="#1D9E75"
        strokeWidth={2}
        fill="url(#tealGradient)"
        dot={false}
      />
    </AreaChart>
  );
}
