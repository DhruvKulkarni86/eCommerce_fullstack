import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { Box, CardContent } from "@mui/material";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const RecentPayments = ({ Daily, loading }) => {
  const [loadNow, setLoadNow] = useState(true)

  let day1 = dayjs().subtract(7, "day").format("DD MMMM");
  let day2 = dayjs().subtract(6, "day").format("DD MMMM");
  let day3 = dayjs().subtract(5, "day").format("DD MMMM");
  let day4 = dayjs().subtract(4, "day").format("DD MMMM");
  let day5 = dayjs().subtract(3, "day").format("DD MMMM");
  let day6 = dayjs().subtract(2, "day").format("DD MMMM");
  let day7 = dayjs().subtract(1, "day").format("DD MMMM");

  const weekday = {};
  const amount = Daily !== undefined && !loading ? Object.values(Daily) : 1

  weekday[day1] = amount[0];
  weekday[day2] = amount[1];
  weekday[day3] = amount[2];
  weekday[day4] = amount[3];
  weekday[day5] = amount[4];
  weekday[day6] = amount[5];
  weekday[day7] = amount[6];

  const chartData = {
    labels: Object.keys(weekday),
    datasets: [
      {
        label: "Revenue",
        data: Daily !== undefined && !loading ? Object.values(Daily) : [],
        borderColor: "#742774",
        //#8956ff
        fill: true,
        backgroundColor: "#e7ddff",
        tension: 0.3,
      },
    ],
  };

  useEffect(() => {
    const timer = () => setTimeout(() => setLoadNow(false), 900);
    const timerId = timer();
    return () => {
      clearTimeout(timerId);
    };
  },[]);


  const options = {
    animation: true,
    responsive: true,
    maintainAspectRatio: false,
    normalized: true,
    redraw: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          display: false,
          min: 0,
          max: 7
        },
      },
    },
  };
  return (
    <CardContent>
      {loadNow === false &&
        <Box sx={{ width: '70vw', height: 250 }}>
          <Line options={options} data={chartData} />
        </Box>
      }
    </CardContent>
  );
};

export default RecentPayments;
