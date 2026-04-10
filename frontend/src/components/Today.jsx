import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { useState, useEffect } from "react";

export default function TodayTemp({ dataUsage, name }) {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const [todayData, setTodayData] = useState([]);
  const [loading, setLoading] = useState(true);

  const todayTime = (data) => {
    if (!data || data.length === 0) return;

    // Find the newest element by sorting on full timestamp
    const newest = data.reduce((latest, element) =>
      new Date(element.time) > new Date(latest.time) ? element : latest,
    );

    const newestDay = newest.time.slice(8, 10); // Extract DD from "2026-04-07T15:30"

    const todaysElements = data
      .filter((element) => {
        const minutes = element.time.slice(14);
        const day = element.time.slice(8, 10);
        return day === newestDay && (minutes === "00" || minutes === "30");
      })
      .map((element) => ({ ...element, time: element.time.split("T")[1] })); // ✅ new object

    console.log("Newest day:", newestDay);
    console.log("Matching elements:", todaysElements);

    return [...todaysElements].reverse();
  };

  useEffect(() => {
    fetch(`${API_URL}/temp`)
      .then((res) => res.json())
      .then((data) => {
        data = todayTime(data.reverse());
        setTodayData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#21252a] flex flex-col gap-4 rounded-xl p-[1.2em] px-[4vw] border-solid w-full border-[#42454b] border">
      <h1 className="text-gray-400">{name} - Today</h1>
      <AreaChart
        width="100%"
        height={"240px"}
        data={todayData}
        // style={{ background: "#ff000" }}
        // margin={{ right: 12 }}
      >
        <defs>
          <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="#38a4e2" stopOpacity={0.25} />
            <stop offset="98%" stopColor="#38a4e2" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" />
        <XAxis
          dataKey="time"
          tick={{ fill: "hsl(215, 15%, 55%)", fontSize: "1.2ch" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "hsl(215, 15%, 55%)", fontSize: "1.2ch" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey={dataUsage}
          stroke="#38a4e2"
          strokeWidth={2}
          fill="url(#tealGradient)"
          dot={false}
        />
      </AreaChart>
    </div>
  );
}
