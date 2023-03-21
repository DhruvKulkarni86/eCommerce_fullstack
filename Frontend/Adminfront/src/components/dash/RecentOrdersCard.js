import axios from "axios";
import React, { forwardRef, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
  Chip,
  Skeleton,
  Tooltip,
  Snackbar,
  IconButton,
} from "@mui/material";
import { auth } from "../../firebase/config";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import UserInvoice from "../../Pages/UserInvoice";
import MuiAlert from "@mui/material/Alert";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useSelector } from "react-redux";



const useStyles = makeStyles({
  idcell: {
    color: "#56B",
    cursor: "pointer",
    "&:hover": {
      color: "#4D96FF",
      textDecoration: "underline",
    },
  },
  success: {
    color: "green",
  },
  fail: {
    color: "red",
  },
});

const RecentOrdersCard = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(5);
  const [orderid, setOrderid] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [resStatus, setResStatus] = useState(null);
  const [snackState, setSnackState] = useState(false);
  const [orderStatus, setOrderStatus] = useState('')

  const classes = useStyles();
  let baseURL = process.env.REACT_APP_BACK_URL;
  let token = localStorage.getItem("userToken");
  const user = useSelector((state) => state.user.value)


  const navigate = useNavigate();

  useEffect(() => {
    if(token !== null && user.userId !== null){
    axios({
      url: `${baseURL}/customer/allOrders`,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": `Bearer ${token}`
      },
      method: "GET",
    }).then((res) => {
        setLoading(false);
        setData(res.data);
    }).catch((e) => {
      if (e.response.status === 401 && user.userId !== null) {
      auth.currentUser.getIdToken(true).then((token) => {
        localStorage.setItem("userToken", token);
        window.location.reload(false)
      });
    }
  });
    return () => {
      setData([])
    }
  }
  }, [token, baseURL, user]);

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
          )
        };
      })
      .catch((e) => {
        setResStatus(e.request.status)
        if (e.response.status === 401 && user.userId !== null) {
          auth.currentUser.getIdToken().then((token) => {
            localStorage.setItem("userToken", token);
            window.location.reload(false)
          });
        }
      });
  };

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSnackClick = (params) => {
    setSnackState(true);
    setOrderStatus(params)
  };


  const handleSnackClose = () => {
    setSnackState(false);
  };

  let days = [
    dayjs().subtract(6, "day").format("DD/MM/YYYY").toString(),
    dayjs().subtract(5, "day").format("DD/MM/YYYY").toString(),
    dayjs().subtract(4, "day").format("DD/MM/YYYY").toString(),
    dayjs().subtract(3, "day").format("DD/MM/YYYY").toString(),
    dayjs().subtract(2, "day").format("DD/MM/YYYY").toString(),
    dayjs().subtract(1, "day").format("DD/MM/YYYY").toString(),
    dayjs().format("DD/MM/YYYY").toString(),
  ];

  const columns = [
    {
      field: "_id",
      headerName: "Order ID",
      width: 200,
      cellClassName: classes.idcell,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Name",
      headerName: "Customer Name",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "CreatedOn",
      type: "date",
      headerName: "Order Date",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Amount",
      headerName: "Order Amount",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: 180,
      headerAlign: "center",
      align: "center",
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
      field: "actions",
      headerName: "Delivery Status",
      type: "actions",
      width: 190,
      editable: true,
      align: "center",
      headerAlign: "center",
      getActions: (params) => [
        params.row.deliveryStatus === "Pending" ? (
          <GridActionsCellItem
            icon={
              <Tooltip title="Click To Change Delivery Status.">
                <Chip
                  variant="outlined"
                  icon={<PendingActionsOutlinedIcon />}
                  label={params.row.deliveryStatus}
                  color="error"
                  clickable
                />
              </Tooltip>
            }
            label="Pending"
            onClick={() => {
              handleIconClick(params.row._id, "Out For Delivery")
              handleSnackClick("Order marked as Shipped!");
            }}
          />
        ) : params.row.deliveryStatus === "Out For Delivery" ? (
          <GridActionsCellItem
            icon={
              <Tooltip title="Click To Change Delivery Status.">
                <Chip
                  variant="outlined"
                  icon={<LocalShippingOutlinedIcon />}
                  label={params.row.deliveryStatus}
                  color="warning"
                  clickable
                />
              </Tooltip>
            }
            label="Out For Delivery"
            onClick={() => { handleIconClick(params.row._id, "Delivered"); handleSnackClick("Order marked as Delivered"); }}
          />
        ) : params.row.deliveryStatus === "Delivered" ? (
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
        ) : (
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
            label="Else"
          />
        ),
      ],
    },
  ];

  const rowData = data.length !== 0 || data !== undefined ? data?.map((row) => {
    let split = row.CreatedOn.split(":");
    return {
      _id: row._id,
      Name: row.Name,
      CreatedOn: split[0] + "@" + split[1].replaceAll("-", ":").slice(0, 5),
      Amount: "₹ "+ row.Amount / 100,
      Status: row.Status,
      deliveryStatus: row.deliveryStatus,
      paymentMethod: row.paymentMethod,
    };
  }): null;

  let filteredRowData = rowData.length !== 0 || rowData!== null ? rowData?.reverse().filter(
    (date) =>
      days.indexOf(date.CreatedOn.slice(0,10)) !== -1 &&
      date.Status === "Success"
  ):[];
  const handleCellClick = (params) => {
    if (params.field === "_id") {
      setOpen(true);
      setOrderid(params.id);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const LoadingSkeleton = () => (
    <Box sx={{ display: "flex", gap: "30px", width: "72vw" }}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={450}
        width={"72vw"}
        sx={{ borderRadius: 3 }}
      />
    </Box>
  );

  return (
    <>
      {loading ? (
        LoadingSkeleton()
      ) : (
        <Box sx={{ width: "74vw", boxShadow: 4, p: 2, pb:5, borderRadius: 4, height:'auto'}}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography color="primary" gutterBottom variant="h6" sx={{fontWeight:'bold'}}>
              Recent Orders
            </Typography>
            <Button
              onClick={() => navigate("/orders")}
              style={{ color: "#2e7d32" }}
            >
              View All ⯈
            </Button>
          </Box>
          <Box>
            <Grid container justifyContent="center" sx={{ height: "auto" }}>
              <Grid item xs="auto" md={12} alignItems="center">
                <DataGrid
                  autoHeight
                  pagination
                  initialState={{
                    sorting: {
                      sortModel: [
                        {
                          field: "CreatedOn",
                          sort: "desc",
                        },
                      ],
                    },
                  }}
                  rows={filteredRowData.length !== 0 || filteredRowData !== null ? filteredRowData.slice(0, 10) : []}
                  getRowId={data !== undefined || data.length ? (data) => data._id : 1}
                  columns={columns}
                  rowsPerPageOptions={[5, 10]}
                  pageSize={page}
                  onCellClick={handleCellClick}
                  onPageSizeChange={(newPageSize) => setPage(newPageSize)}
                />
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
                  <Alert severity="success" sx={{ width: "100%" }}>
                    {orderStatus}
                  </Alert>
                ) : resStatus === 400 || resStatus === 0 || resStatus === 'Internal Error' || resStatus === 401 ? (
                  <Alert severity="error" sx={{ width: "100%" }}>
                    Failed To Change Delivery Status! Please Try Again
                  </Alert>
                ) : null}
              </Snackbar>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
};

export default React.memo(RecentOrdersCard);
