import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  CardHeader,
  Skeleton,
} from "@mui/material";
import RecentPayments from "./RecentPayments";
import YearGraph from "./YearGraph";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const RevenueInsights = ({ Daily, Week, Month, loading }) => {
  const [show, setShow] = useState("Daily");

  let week1 = dayjs().subtract(4, "week").format("DD MMMM YY");
  let week2 = dayjs().subtract(3, "week").format("DD MMMM YY");
  let week3 = dayjs().subtract(2, "week").format("DD MMMM YY");
  let week4 = dayjs().subtract(1, "week").format("DD MMMM YY");

  const weeks = {};

  const amt = Week !== undefined ? Object.values(Week) : 1;

  weeks[week1] = amt[0];
  weeks[week2] = amt[1];
  weeks[week3] = amt[2];
  weeks[week4] = amt[3];

  const data2 = {
    labels: Object.keys(weeks),
    datasets: [
      {
        label: "Revenue",
        data: Week !== undefined ? Object.values(Week) : [],
        borderColor: "#4a74de",
        // backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderRadius: 4,
        backgroundColor: "#81a4ff",
        barPercentage: 0.2,
        // fill: true,
        borderWidth: 2,
      },
    ],
  };
  const options = {
    animation: true,
    responsive: true,
    maintainAspectRatio: false,
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
        },
      },
    },
  };

  const handleClick = (value) => {
    setShow(value);
  };

  const LoadingSkeleton = () => (
    <Box sx={{ display: "flex", gap: "30px" }}>
      {/* <Skeleton variant="rectangular" height={50} /> */}
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={350}
        width={"100%"}
        sx={{ borderRadius: 3 }}
      />
    </Box>
  );

  return (
    <Box>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <Card sx={{ height: 350, borderRadius: 4, boxShadow: 4 }}>
          <CardHeader
            action={
              <CardActions sx={{ pr: 2, width: "18vw" }}>
                <Button
                  sx={{ px: 2, width: "6vw" }}
                  style={
                    show === "Daily"
                      ? { backgroundColor: "primary" }
                      : { border: "1px solid", color: "primary" }
                  }
                  variant={show === "Daily" ? "contained" : "text"}
                  size="small"
                  onClick={() => handleClick("Daily")}
                >
                  Daily
                </Button>
                <Button
                  sx={{ px: 2, width: "6vw" }}
                  style={
                    show === "Weekly"
                      ? { backgroundColor: "primary" }
                      : { border: "1px solid", color: "primary" }
                  }
                  variant={show === "Weekly" ? "contained" : "text"}
                  size="small"
                  onClick={() => handleClick("Weekly")}
                >
                  Weekly
                </Button>
                <Button
                  sx={{ px: 2, width: "6vw" }}
                  style={
                    show === "Monthly"
                      ? { backgroundColor: "primary" }
                      : { border: "1px solid", color: "primary" }
                  }
                  variant={show === "Monthly" ? "contained" : "outlined"}
                  size="small"
                  onClick={() => handleClick("Monthly")}
                >
                  Monthly
                </Button>
              </CardActions>
            }
            title={<b>{show} Revenue Insights</b>}
          />
          {show === "Weekly" ? (
            <>
              <CardContent>
                <Box sx={{ width: "70vw" }}>
                  <Bar options={options} data={data2} height={250} />
                </Box>
              </CardContent>
            </>
          ) : show === "Daily" ? (
            <RecentPayments Daily={Daily} loading={loading} />
          ) : show === "Monthly" ? (
            <YearGraph Month={Month} loading={loading} />
          ) : null}
        </Card>
      )}
    </Box>
  );
};

export default RevenueInsights;
