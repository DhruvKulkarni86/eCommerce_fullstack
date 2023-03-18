import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { auth } from "../../firebase/config";
import axios from "axios";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Dialog,
  DialogContent,
  Grid,
  Box,
  Typography,
  Button,
  Card,
  Chip,
  DialogActions,
  Skeleton,
  Stack,
  DialogTitle,
  Rating,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddProduct from "../AddProduct";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    border: `1px solid `,
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: 26,
    borderRadius: 2,
  },
  value: {
    position: "absolute",
    lineHeight: "24px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  high: {
    backgroundColor: "#088208a3",
  },
  medium: {
    backgroundColor: "#efbb5aa3",
  },
  low: {
    backgroundColor: "#f44336",
  },
});

const InventoryTable = () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false);
  const [id, setID] = useState("");
  const [loading, setLoading] = useState(true);
  const [delOp, setDelOp] = useState(false);
  const [pid, setPid] = useState("");

  let baseURL = process.env.REACT_APP_BACK_URL
  let token = localStorage.getItem('userToken')
  const user = useSelector((state) => state.user.value)

  useEffect(() => {
    axios.get(`${baseURL}/product/all`).then((res) => {
      setLoading(false);
      if (!open) {
        setData(res.data);
      }
    });
  }, [open, baseURL]);

  const handleDelete = (pid) => {
    setDelOp(true);
    setPid(pid);
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setID(id);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const ProgressBar = (ProgressBarProps) => {
    const { value } = ProgressBarProps;
    const valueInPercent = parseInt(value);
    const classes = useStyles();
    return (
      <div
        className={classes.root}
        style={{
          background: `${
            valueInPercent >= 70
              ? `linear-gradient(to right, #088208a3 ${valueInPercent}%, white 0%)`
              : valueInPercent >= 30 && valueInPercent <= 70
              ? `linear-gradient(to right, #efbb5aa3 ${valueInPercent}%, white 0%)`
              : `linear-gradient(to right, #f44336 ${valueInPercent}%, white 0%)`
          }`,
          backgroundColor: `${
            valueInPercent >= 70
              ? "#088208a3"
              : valueInPercent >= 30 && valueInPercent <= 70
              ? "#efbb5aa3"
              : "#f44336"
          }`,
        }}
      >
        <div className={classes.value}>{`${valueInPercent} pcs.`}</div>
        <div style={{ maxWidth: `${valueInPercent}%` }} />
      </div>
    );
  };

  const handleConfirmDel = () => {
    axios({
      url: `${baseURL}/product`,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`,
      },
      data: { pid: pid },
      method: "DELETE",
    })
      .then(() => {
        setData(data.filter((item) => item._id !== pid));
      })
      .then(setDelOp(false))
      .catch((e) => {
        if (e.response.status === 401 &&  user.userId !== null && e.response.data === "Token Expired") {
          auth.currentUser.getIdToken(true).then((token) => {
            localStorage.setItem("userToken", token);
            window.location.reload(false);
          });
        }
      });
  };

  const handleCancelDel = () => {
    setPid("");
    setDelOp(false);
  };

  const LoadingSkeleton = () => (
    <Box
      sx={{
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
            width={90}
          />
          <Skeleton
            key={idx + 1}
            animation="wave"
            variant="text"
            height={50}
            width={190}
          />
          <Skeleton
            key={idx + 2}
            animation="wave"
            variant="text"
            height={50}
            width={70}
          />
          <Skeleton
            key={idx + 3}
            animation="wave"
            variant="text"
            height={50}
            width={150}
          />
          <Skeleton
            key={idx + 4}
            animation="wave"
            variant="text"
            height={50}
            width={110}
          />
          <Skeleton
            key={idx + 5}
            animation="wave"
            variant="text"
            height={50}
            width={170}
          />
          <Skeleton
            key={idx + 6}
            animation="wave"
            variant="text"
            height={50}
            width={240}
          />
        </Stack>
      ))}
    </Box>
  );

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 70,
      headerClassName: "header",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Name",
      headerName: "Name",
      width: 180,
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Price",
      headerName: "Price",
      width: 90,
      headerClassName: "header",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return ('₹' + params.row.Price) 
      }
    },
    {
      field:"ratingTotal",
      headerName:'User Ratings',
      width:155,
      headerClassName:"header",
      align:'center',
      headerAlign:'center',
      renderCell:(params) => {
        return (
          <Rating name="read-only" value={params.row.ratingTotal} readOnly />
        )
      }
    },
    {
      field: "Quantity",
      headerName: "Quantity Remaining",
      width: 160,
      align: "center",
      headerAlign: "center",
      headerClassName: "header",
      renderCell: (params) => {
        return (
          <Box key={params.row.id} sx={{ width: 130 }}>
            <ProgressBar value={parseInt(params.row.Quantity)} />
          </Box>
        );
      },
    },
    {
      field: "Category",
      headerName: "Category",
      width: 100,
      headerClassName: "header",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "SubCategory",
      headerName: "Sub Category",
      width: 160,
      headerClassName: "header",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Actions",
      type: "actions",
      editable: true,
      width: 200,
      headerClassName: "header",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            <Chip
              clickable
              sx={{ mx: 2 }}
              variant="outlined"
              icon={<ModeEditOutlineOutlinedIcon label="Edit" />}
              onClick={() => handleClickOpen(params.row._id)}
              label="Edit"
              color="warning"
            />
            <Chip
              clickable
              variant="outlined"
              icon={<DeleteOutlineRoundedIcon label="Delete" />}
              onClick={() => handleDelete(params.row._id)}
              label="Delete"
              color="error"
            />
          </>
        );
      },
    },
  ];
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20vw",
        }}
      >
        <Typography sx={{ m: 1, fontWeight:'bold' }} variant="h4">
          Inventory
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button variant="contained" onClick={() => handleClickOpen()}>
            Add Products
          </Button>
        </Box>
      </Box>
      <Card>
        <Box
          sx={{
            "& .header": {
              backgroundColor: "#39393d4f",
            },
          }}
        >
          <Grid container sx={{ height: 665, width: "74vw" }}>
            <Grid item>
              <DataGrid
              sx={{ height: 665, width: "74vw" }}
                components={{
                  Toolbar: GridToolbar,
                  LoadingOverlay: LoadingSkeleton,
                }}
                pagination
                rows={data}
                getRowId={(data) => data._id}
                columns={columns}
                rowsPerPageOptions={[10, 15]}
                pageSize={pageSize}
                // checkboxSelection
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                loading={loading}
              />
            </Grid>
            <Dialog
              fullScreen={fullScreen}
              fullWidth
              maxWidth="md"
              open={open}
              onClose={handleClose}
            >
              <DialogActions>
                <Button onClick={handleClose}>
                  <CloseRoundedIcon /> Close
                </Button>
              </DialogActions>
              <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h4" component="div">
                  {id ? "Edit Product" : <>{null}</>}
                </Typography>
              </DialogTitle>
              <DialogContent>
                <AddProduct Edit={id} Close={() => handleClose()}/>
              </DialogContent>
            </Dialog>
            <Dialog open={delOp}>
              <DialogTitle sx={{ fontSize: "17px", textAlign: "center" }}>
                {"Confirm Delete?"}
              </DialogTitle>
              <DialogContent>
                <Box sx={{ "& button": { mx: 1 } }}>
                  <>
                    <Button
                      size="small"
                      variant="text"
                      color="error"
                      onClick={() => handleConfirmDel()}
                    >
                      Yes
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      color="primary"
                      onClick={() => handleCancelDel()}
                    >
                      No
                    </Button>
                  </>
                </Box>
              </DialogContent>
            </Dialog>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
};

export default InventoryTable;
