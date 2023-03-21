import axios from "axios";
import React, { forwardRef, useEffect, useState } from "react";
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Skeleton,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { auth } from "../../firebase/config";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import UserInvoice from "../UserInvoice";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import FlagCircleRoundedIcon from "@mui/icons-material/FlagCircleRounded";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";



const useStyles = makeStyles({
  idcell: {
    color: "#56B",
    cursor: "pointer",
    justifyContent: "center",
    "&:hover": {
      color: "#4D96FF",
      textDecoration: "underline",
    },
  },
  success: {
    // backgroundColor: "#069e2452",
  },
  fail: {
    backgroundColor: "#ff000042",
  },
  created: {
    backgroundColor: "#ed6c0211",
  },
});

const AllOrdersTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(10);
  const [orderid, setOrderid] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackState, setSnackState] = useState(false)
  const [resStatus, setResStatus] = useState(null);
  const [orderStatus, setOrderStatus] = useState('')


  let token = localStorage.getItem("userToken");
  let baseURL = process.env.REACT_APP_BACK_URL;
  const user = useSelector((state) => state.user.value)

  dayjs.extend(customParseFormat);
  const classes = useStyles();

  useEffect(() => {
    if(token !== null && user.userId !== null){
    axios({
      url: `${baseURL}/customer/allOrders`,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    })
      .then((res) => {
          setLoading(false);
          setData(res.data);
      })
      .catch((e) => {
        if (e.response.status === 401 && user.userId !== null) {
          auth.currentUser.getIdToken().then((token) => {
            localStorage.setItem("userToken", token);
            window.location.reload(false)
          });
        }
      });
    return () => {
      setData([]);
    };
  }
  }, [token, baseURL, user]);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleIconClick = (...params) => {
    axios({
      url: `${baseURL}/customer/status?status=${params[1]}&orderid=${params[0]}`,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
    })
      .then((res) => {
        if (res.status === 200 && res.data.message === "Internal Error") {
          setResStatus(0)
        } else {
          setResStatus(res.status)
        setData((prevData) =>
          prevData.map((row) =>
            row._id === params[0]
              ? { ...row, deliveryStatus: res.data.deliveryStatus }
              : row
          )
        );
        };
      })
      .catch((e) => {
        setResStatus(e.request.status)
        if (e.response.status === 401 && user.userId !== null) {
          auth.currentUser.getIdToken(true).then((token) => {
            localStorage.setItem("userToken", token);
            window.location.reload(false)
          });
        }
      });
  };

  const handleSnackClick = (params) => {
    setSnackState(true);
    setOrderStatus(params)
  };


  const handleSnackClose = () => {
    setSnackState(false);
  };


  const columns = [
    {
      field: "_id",
      headerName: "Order ID",
      width: 190,
      cellClassName: classes.idcell,
      headerAlign: "center",
      align: "center",
      headerClassName: "header",
    },
    {
      field: "Name",
      headerName: "Customer Name",
      width: 140,
      align: "center",
      headerClassName: "header",
    },
    {
      field: "CreatedOn",
      type: "date",
      headerName: "Order Date",
      width: 180,
      headerAlign: "center",
      align: "center",
      headerClassName: "header",
      renderCell: (params) => {
        return params.value + " @" + params.row.CreatedAt;
      },
    },
    {
      field: "CreatedAt",
      headerName: "Time",
      width: 5,
      headerAlign: "center",
      align: "center",
      headerClassName: "header",
    },
    {
      field: "Amount",
      headerName: "Amount",
      width: 100,
      headerAlign: "center",
      align: "center",
      headerClassName: "header",
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "header",
      renderCell: (params) => {
        return (
          <Chip
            variant="outlined"
            sx={{ border: 0 }}
            icon={
              params.row.paymentMethod === "card" ? (
                <CreditCardRoundedIcon />
              ) : params.row.paymentMethod === "wallet" ? (
                <AccountBalanceWalletRoundedIcon />
              ) : null
            }
            label={
              params.row.paymentMethod !== undefined
                ? params.row.paymentMethod.toUpperCase()
                : params.row.paymentMethod
            }
          />
        );
      },
    },
    {
      field: "Status",
      headerName: "Payment Status",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "header",
      renderCell: (params) => {
        return (
          <Chip
            variant="outlined"
            sx={{ border: 0 }}
            icon={
              params.row.Status === "Success" ? (
                <CheckCircleRoundedIcon />
              ) : params.row.Status === "Failed" ? (
                <CancelRoundedIcon />
              ) : (
                <FlagCircleRoundedIcon />
              )
            }
            label={params.row.Status}
            color={
              params.row.Status === "Success"
                ? "success"
                : params.row.Status === "Created"
                ? "warning"
                : "error"
            }
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Delivery Status",
      type: "actions",
      width: 170,
      headerClassName: "header",
      getActions: (params) => [
        params.row.deliveryStatus === "Pending" &&
        params.row.Status !== "Failed" ? (
          <Tooltip title="Click To Change Delivery Status.">
            <GridActionsCellItem
              icon={
                <Chip
                  variant="outlined"
                  icon={<PendingActionsOutlinedIcon />}
                  label={params.row.deliveryStatus}
                  color="error"
                  clickable
                />
              }
              label="Pending"
              onClick={() => {
                handleIconClick(params.row._id, "Out For Delivery");
                handleSnackClick("Order marked as Shipped!");
              }}
            />
          </Tooltip>
        ) : params.row.deliveryStatus === "Out For Delivery" &&
          params.row.Status !== "Failed" ? (
          <Tooltip title="Click To Change Delivery Status.">
            <GridActionsCellItem
              icon={
                <Chip
                  variant="outlined"
                  icon={<LocalShippingOutlinedIcon />}
                  label={params.row.deliveryStatus}
                  color="warning"
                  clickable
                />
              }
              label="Out For Delivery"
              onClick={() => {handleIconClick(params.row._id, "Delivered"); handleSnackClick("Order marked as Delivered!")}}
            />
          </Tooltip>
        ) : params.row.deliveryStatus === "Delivered" &&
          params.row.Status !== "Failed" ? (
          <Tooltip title="Product Delivered">
            <GridActionsCellItem
              icon={
                <Chip
                  variant="filled"
                  icon={<DoneAllRoundedIcon />}
                  label={params.row.deliveryStatus}
                  color="success"
                  disabled={true}
                />
              }
              label="Delivered"
            />
          </Tooltip>
        ) : params.row.Status === "Failed" ? (
          <GridActionsCellItem
            icon={
              <Chip
                variant="outlined"
                icon={<ErrorRoundedIcon />}
                label="Not Applicable"
                color="error"
              />
            }
            label="Else"
          />
        ) : (
          <GridActionsCellItem
          icon={
            <Chip
              variant="outlined"
              icon={<ErrorRoundedIcon />}
              label={"ERROR"}
              color="error"
            />
        }
          />
        ),
      ],
    },
  ];

  const LoadingSkeleton = () => (
    <Box
      sx={{
        // mt:7,
        boxShadow: 4,
        borderRadius: 4,
        height: 700,
      }}
    >
      {[...Array(10)].map((_, idx) => (
        <Stack key={idx} direction="row" gap="5px">
          <Skeleton
            key={idx}
            animation="wave"
            variant="text"
            height={50}
            width={190}
          />
          <Skeleton
            key={idx + 1}
            animation="wave"
            variant="text"
            height={50}
            width={140}
          />
          <Skeleton
            key={idx + 2}
            animation="wave"
            variant="text"
            height={50}
            width={170}
          />
          <Skeleton
            key={idx + 3}
            animation="wave"
            variant="text"
            height={50}
            width={100}
          />
          <Skeleton
            key={idx + 4}
            animation="wave"
            variant="text"
            height={50}
            width={150}
          />
          <Skeleton
            key={idx + 5}
            animation="wave"
            variant="text"
            height={50}
            width={150}
          />
          <Skeleton
            key={idx + 6}
            animation="wave"
            variant="text"
            height={50}
            width={170}
          />
        </Stack>
      ))}
    </Box>
  );

  const rowData = data.map((row) => {
    let split = row.CreatedOn.split(":");
    return {
      _id: row._id,
      Name: row.Name,
      CreatedOn: split[0],
      CreatedAt: split[1].replaceAll("-", ":").slice(0, 5),
      Amount:  '₹' + row.Amount / 100,
      paymentMethod: row.paymentMethod,
      Status: row.Status,
      deliveryStatus: row.deliveryStatus,
    };
  });

  const handleCellClick = (params) => {
    if (params.field === "_id") {
      setOpen(true);
      setOrderid(params.id);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box
        sx={{
          alignItems: "flex-start",
          display: "flex",
          // justifyContent: "space-around",
          // gap: "20vw",
          // marginBottom: "50px",
        }}
      >
        <Typography sx={{ m: 1, fontWeight: "bold" }} variant="h4">
          Orders
        </Typography>
      </Box>
      <Box
        sx={{
          height: 700,
          "& .header": {
            backgroundColor: "#39393d4f",
          },
        }}
      >
        <Grid container sx={{ height: 700, width: "72vw" }}>
          <Grid item>
            <DataGrid
              sx={{ height: 700, width: "72vw" }}
              components={{
                Toolbar: GridToolbar,
                LoadingOverlay: LoadingSkeleton,
              }}
              pagination
              columnVisibilityModel={{
                CreatedAt: false,
              }}
              rows={rowData.reverse()}
              getRowId={(data) => data._id}
              columns={columns}
              rowsPerPageOptions={[10, 15]}
              pageSize={page}
              loading={loading}
              onCellClick={handleCellClick}
              getCellClassName={(params) => {
                return params.row.Status === "Success"
                  ? `${classes.success}`
                  : params.row.Status === "Failed"
                  ? `${classes.fail}`
                  : `${classes.created}`;
              }}
              onPageSizeChange={(newPageSize) => setPage(newPageSize)}
            />
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleDialogClose}>
          <DialogContent>
          <IconButton onClick={() => handleDialogClose()} sx={{float:'right'}}> 
              <ClearRoundedIcon color="primary" />
            </IconButton>
            <UserInvoice orderid={orderid} />
          </DialogContent>
        </Dialog>
        <Snackbar
                open={snackState}
                autoHideDuration={3000}
                onClose={handleSnackClose}
              >
                {resStatus === 200 ? (
                  <Alert severity="success">
                    {orderStatus}
                  </Alert>
                ) : resStatus === 400 || resStatus === 0 || resStatus === 'Internal Error' || resStatus === 401 ? (
                  <Alert severity="error" sx={{ width: "100%" }}>
                    Failed To Change Delivery Status! Please Try Again
                  </Alert>
                ) : null}
              </Snackbar>
      </Box>
    </Box>
  );
};

export default AllOrdersTable;
