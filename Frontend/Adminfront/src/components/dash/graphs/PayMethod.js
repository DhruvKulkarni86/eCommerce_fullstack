import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useGetPieQuery } from "../Prod";
import { auth } from "../../../firebase/config";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const PayMethod = () => {
  const [method, setMethod] = useState([]);
  let token = localStorage.getItem("userToken");

  const { data, error, isLoading, isSuccess } = useGetPieQuery(token);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (
      error &&
      token !== null &&
      user.userId !== null &&
      error.originalStatus === 401 &&
      error.data === "Token Expired"
    ) {
      auth.currentUser.getIdToken(true).then((token) => {
        localStorage.setItem("userToken", token);
        window.location.reload(false);
      });
    }
  }, [token, error, user]);

  useEffect(() => {
    let tempMethod = [];
    isSuccess === true &&
      data.items.map(
        (payment) => tempMethod.push(payment.method),
        setMethod(tempMethod)
      );
  }, [data, isLoading, isSuccess]);

  const counts = {};

  method.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });

  const datasets = {
    labels: ["UPI", "Wallet", "CARD", "NETBANKING"],
    datasets: [
      {
        label: "# of Votes",
        data: [counts.upi, counts.wallet, counts.card, counts.netbanking],
        backgroundColor: ["#745af2", "#1e88d0", "#26c6da", "#067BC2"],
        borderWidth: 1,
      },
    ],
  };

  const upi = counts.upi === undefined ? 0 : counts.upi;
  const wallet = counts.wallet === undefined ? 0 : counts.wallet;
  const card = counts.card === undefined ? 0 : counts.card;
  const netbanking = counts.netbanking === undefined ? 0 : counts.netbanking;
  const total = upi + wallet + card + netbanking;

  console.log("UPI", upi);
  const options = {
    responsive: true,
    cutout: 70,
    animation: {
      animateScale: true,
    },
    hover: {
      animationDuration: 0,
    },
    responsiveAnimationDuration: 0,
  };

  return (
    <Box>
      <Card
        sx={{
          padding: 2,
          maxWidth: "26vw",
          minWidth: "26vw",
          borderRadius: 5,
          boxShadow: 4,
        }}
      >
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h6"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Payment Insights
        </Typography>
        <CardContent>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            gap="30px"
          >
            <Grid item>
              <Doughnut options={options} data={datasets} />
            </Grid>
            <Grid item>
              {!isNaN(total) && (
                <Typography
                  component={"div"}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    fontSize: 14,
                  }}
                >
                  UPI {parseFloat((upi / total) * 100).toFixed(2)}%
                  <Divider orientation="vertical" flexItem color="#002E3D" />
                  WALLET {parseFloat((wallet / total) * 100).toFixed(2)}%
                  <Divider orientation="vertical" flexItem color="#002E3D" />
                  CARD {parseFloat((card / total) * 100).toFixed(2)}%
                  <Divider orientation="vertical" flexItem color="#002E3D" />
                  NETBANKING{" "}
                  {parseFloat((netbanking / total) * 100).toFixed(2)}%
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PayMethod;
