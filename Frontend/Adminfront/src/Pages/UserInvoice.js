import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Box,
  Typography,
} from "@mui/material";

const UserInvoice = (orderid) => {
  const [data, setData] = useState([]);
  const [addr, setAddr] = useState([]);
  const [userDet, setUserDet] = useState([])
  let baseURL = process.env.REACT_APP_BACK_URL;
  let token = localStorage.getItem("userToken");

  const sum = data.reduce(
    (a, { Price, productQty }) => a + Price * productQty,
    0
  );

  useEffect(() => {
    axios({
      url: `${baseURL}/customer/userOrders?orderid=${orderid.orderid}`,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }).then((res) => {
      setData(res.data[0].OrderDetails);
      setAddr(res.data[0].Address);
      setUserDet(res.data[0])
    });
    return () => {
      setData([]);
    };
  }, [token, orderid, baseURL]);

  return (
    <Box>
      <Box sx={{ py: 5, maxWidth: 275, minWidth: 275 }}>
        <Typography sx={{ fontWeight: "bold", pb:2 ,mt:-3 }}>
          Delivery Address:
        </Typography>
        <Typography fontSize="small" sx={{mb: 1}}>
          <b>Name:</b> {userDet.Name}
        </Typography>
        <Typography fontSize="small" sx={{mb: 1}}>
          <b>House No :</b> {addr.HouseNo}
        </Typography>
        <Typography fontSize="small" sx={{pb: 1}}>
          <b> Area :</b> {addr.Area}
        </Typography>
        <Typography fontSize="small" sx={{pb: 1}}>
          <b> Street :</b> {addr.Street}
        </Typography>
        <Typography fontSize="small" sx={{pb: 1}}>
          <b> City : </b>
          {addr.City}, {addr.Pincode}
        </Typography>
        <Typography fontSize="small">
          <b> Contact : </b>
          {userDet.PhoneNumber}
        </Typography>
      </Box>
      <Box>
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ minWidth: 275 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={2}
                  sx={{ fontWeight: "bold" }}
                >
                  Order Summary
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.productName}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell align="right">
                    {item.productQty} x {item.Price} = ₹
                    {item.Price * item.productQty}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Total:</TableCell>
                <TableCell align="right">₹{sum}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default React.memo(UserInvoice);
