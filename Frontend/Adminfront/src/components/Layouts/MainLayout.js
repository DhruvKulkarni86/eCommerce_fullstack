import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";
import Sidebar from "../NavDrawer/Sidebar";
import StoreTheme from "../../themes/StoreTheme";

const MainLayout = () => {
  return (
    <ThemeProvider theme={StoreTheme}>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          width: "100%",
          // paddingX: 5,
          // paddingY: 1,
        }}
      >
        <Grid container gap="45px" spacing={4} sx={{ marginY: 0, }}>
          <Grid
            item
            xs={12}
            md={'auto'}
            // maxWidth={false}
            // width={1/2}
            sx={{maxWidth:'20%', minWidth:'20%', width:'20%'}}
          >
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={'auto'}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
