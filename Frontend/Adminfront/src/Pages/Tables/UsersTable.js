import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { auth } from "../../firebase/config";
import {useSelector} from 'react-redux'

const UsersTable = () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true)

  let token = localStorage.getItem("userToken");
  let baseURL = process.env.REACT_APP_BACK_URL
  const user = useSelector((state) => state.user.value)

  useEffect(() => {
    axios({
      url: `${baseURL}/customer/user?allCust=true`,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }).then((res) => {
        setLoading(false)
        setData(res.data.data);
    }).catch((e)=> {
      if (e.response.status === 401 && e.response.data === "Token Expired" && user.userId !== null) {
        auth.currentUser.getIdToken(true).then((token) => {
          localStorage.setItem("userToken", token);
          console.log("NEW TOKEN");
          window.location.reload(false);
        });
      }
    });
    return() => {
      setData([])
    }
  }, [token, baseURL, user]);

  const columns = [
    { field: "FName", headerName: "Customer Name", width: 200, headerClassName: "header", align:'center',headerAlign: "center" },
    { field: "email", type: "string", headerName: "Customer Email", width: 250, headerClassName: "header", align:'center',headerAlign: "center" },
    {
      field: "AuthType",
      headerName: "Auth type",
      width: 200,
      headerClassName: "header",
      align:'center',headerAlign: "center",
      renderCell: (params) => {
        return params.row.AuthType.toUpperCase();
      },
    },
    { field: "_id", headerName: "ID", width : 400, headerClassName: "header", align:'center',headerAlign: "center"},
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
            width={200}
          />
          <Skeleton
            key={idx + 1}
            animation="wave"
            variant="text"
            height={50}
            width={250}
          />
          <Skeleton
            key={idx + 2}
            animation="wave"
            variant="text"
            height={50}
            width={200}
          />
          <Skeleton
            key={idx + 3}
            animation="wave"
            variant="text"
            height={50}
            width={300}
          />
        </Stack>
      ))}
    </Box>
  );

  return (
    <Box>
      <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Typography sx={{ m: 1, fontWeight:'bold'}} variant="h4">
            Customers
          </Typography>
        </Box>
        <Box sx={{
            "& .header": {
              backgroundColor: "#39393d4f",
            },
          }}>
            <Grid container justifyContent="center" sx={{ height: 600, boxShadow: 4, borderRadius: 3, p: 2 }}>
              <Grid item sx={{ width: "70vw" }}>
                <DataGrid
                  components={{
                    Toolbar: GridToolbar,
                    LoadingOverlay: LoadingSkeleton
                  }}
                  pagination
                  rows={data}
                  getRowId={(data) => data._id}
                  columns={columns}
                  rowsPerPageOptions={[10, 15]}
                  pageSize={pageSize}
                  loading={loading}
                  onPageSizeChange={(newPage) => setPageSize(newPage)} />
              </Grid>
            </Grid>
          </Box>
    </Box>
  );
};

export default UsersTable;
