import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
  Skeleton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import UserInvoice from "../../Pages/UserInvoice";
import { useGetProdQuery } from "./Prod";


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

const InventoryCard = () => {

  const [page, setPage] = useState(5);
  const [orderid, setOrderid] = useState("");
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  let token = localStorage.getItem('userToken')

  const navigate = useNavigate();

  const { data, isLoading, isSuccess } = useGetProdQuery(token)


  const ProgressBar = (progress) => {
    const { value } = progress;
    const valueInPercent = parseInt(value);
    const classes = useStyles();
    return (
      <div
        className={classes.root}
        style={{
          background: `${valueInPercent >= 70
              ? `linear-gradient(to right, #088208a3 ${valueInPercent}%, white 0%)`
              : valueInPercent >= 30 && valueInPercent <= 70
                ? `linear-gradient(to right, #efbb5aa3 ${valueInPercent}%, white 0%)`
                : `linear-gradient(to right, #f44336 ${valueInPercent}%, white 0%)`
            }`,
          backgroundColor: `${valueInPercent >= 70
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

  const columns = [
    {
      field: "_id",
      headerName: "Product ID",
      width: 120,
      cellClassName: classes.idcell,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Name",
      headerName: "Product Name",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Price",
      headerName: "Product Price",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell:(params) => {
        return (
          "₹ " + params.row.Price
        )
      }
    },
    {
      field: "Quantity",
      headerName: "Quantity Remaining",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Box sx={{ width: 130 }}>
            <ProgressBar value={parseInt(params.row.Quantity)} />
          </Box>
        );
      },
    },
  ];

  const handleCellClick = (params) => {
    if (params.field === "_id") {
      setOpen(true);
      setOrderid(params.id);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const LoadingSkeleton = () => {
    return (
      <Box>
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={470}
          width={690}
          sx={{ borderRadius: 3 }}
        />
      </Box>
    )
  }
  return (
    <>
    {isLoading ? <LoadingSkeleton /> : (
      <Box sx={{ width: "45vw", boxShadow: 4, borderRadius: 3, p: 2 }}>
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography color="primary" gutterBottom variant="h6" sx={{ fontWeight: 'bold' }}>
                Inventory
              </Typography>
              <Button
                onClick={() => navigate("/inventory")}
                style={{ color: "#2e7d32" }}
              >
                View All ⯈
              </Button>
            </Box><Box>
              <Grid container justifyContent="center" sx={{ height: "auto" }}>
                <Grid item xs="auto" md={12} alignItems="center">
                  <DataGrid
                    autoHeight
                    pagination
                    rows={isSuccess === true ? data : []}
                    getRowId={(data) => data._id}
                    columns={columns}
                    rowsPerPageOptions={[5, 10]}
                    pageSize={page}
                    onCellClick={handleCellClick}
                    onPageSizeChange={(newPageSize) => setPage(newPageSize)} />
                </Grid>
                <Dialog open={open} onClose={handleDialogClose}>
                  <DialogContent>
                    <UserInvoice orderid={orderid} />
                  </DialogContent>
                </Dialog>
              </Grid>
            </Box>
          </>
      </Box>
      )}
    </>
  );
};

export default InventoryCard;
