import React, { useEffect, useState } from "react";
import RevenueInsights from "./graphs/RevenueInsights";
import PayMethod from "./graphs/PayMethod";
import RecentOrdersCard from "./RecentOrdersCard";
import StatCards from "./StatCards";
import InventoryCard from "./InventoryCard";
import { Stack, Typography } from "@mui/material";
import { authLogout } from "../../services/Functions/AuthFunc";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/config";
import { useSelector } from "react-redux";
import { useGetAddrQuery } from "./Prod";
import DashLoadingSkeleton from "./DashLoadingSkeleton";


const DashHome = () => {
  const [notAdmin, setNotAdmin] = useState(false);
  let token = localStorage.getItem("userToken");

  const user = useSelector((state) => state.user.value)

  const {data, error, isLoading} = useGetAddrQuery(token)

  const navigate = useNavigate();

  useEffect(()=> {
    if(error && token !== null && user.userId !== null && error.originalStatus === 401 && error.data === 'Token Expired'){
      console.log("dash", error);
      auth.currentUser.getIdToken(true).then((token) => {
        localStorage.setItem("userToken", token)
        window.location.reload(false)
      })
    }
    if (error && error.data === "NOT ADMIN") {
      setNotAdmin(true);
      authLogout().then(() => {
        navigate("*", { state: notAdmin });
        localStorage.clear();
      });
    }
  },[token, error, user, navigate, notAdmin])

  return (
    <Stack spacing={5}>
        <>
        {!isLoading && user.userId !== null && error === undefined ? (
          <>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb:-2 }}>
            Dashboard
          </Typography>
          <StatCards
            Customers={data !== null && data.noOfCustomers}
            Orders={data !== null && data.noOfOrders}
            Products={data !== null && data.noOfProducts}
            Revenue={data !== null && data.totalRevenue}
            Last24Revenue={data !== null && data.last24hrsRevenue}
            Last24Orders={data !== null && data.last24hrsOrders}
            loading={isLoading}
          />
          <RevenueInsights
            Daily={data !== null && data.last7DaysGraph}
            Week={data !== null && data.previous4WeekGraph}
            Month={data !== null && data.previous12MonthGraph}
            loading={isLoading}
          />
          <Stack spacing={5} direction="row">
            <PayMethod />
            <InventoryCard />
          </Stack>
          <RecentOrdersCard />
        </>
        ):<DashLoadingSkeleton />}
        </>
    </Stack>
  );
};

export default DashHome;
