import React from "react";
import {
  Typography,
  Divider,
  Stack,
  Drawer,
  Link
} from "@mui/material";
import NavButton from "./NavButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import RefreshButton from "./RefreshButton";
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import LogOut from "./LogOut";
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded";
import { Box } from "@mui/system";
import { Link as RouterLink } from 'react-router-dom';

const NavDrawer = () => {
  const locations = [
    {
      nav: "/",
      icon: <DashboardIcon fontSize="small" />,
      name: "Dashboard",
    },
    {
      nav: "/orders",
      icon: <ViewInArRoundedIcon fontSize="small" />,
      name: "Orders",
    },
    {
      nav: "/add",
      icon: <AddShoppingCartIcon fontSize="small" />,
      name: "Add Product",
    },
    {
      nav: "/inventory",
      icon: <InventoryIcon fontSize="small" />,
      name: "Inventory",
    },
    {
      nav: "/feedback",
      icon: <ChatBubbleRoundedIcon fontSize="small" />,
      name: "Feedbacks",
    },
    {
      nav: "/users",
      icon: <PeopleRoundedIcon fontSize="small" />,
      name: "Users",
    },
  ];
  return (
      <Drawer
      sx={{justifySelf:'center', width:'100%'}}
        variant="permanent"
        anchor="left"
        PaperProps={{
          variant:'elevation',
          elevation:5,
          sx: {
            width: '300',
            padding:2,
            display:'flex',
            flexDirection:'column',
            minHeight:'100%'
          },
        }}
      >
        <Box component="div">
          <Typography
            color="primary"
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              cursor: "pointer",
              fontWeight: "bold",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Link to="/" underline='none' component={RouterLink}>
            Balaji Nursery & Farms
            </Link>
          </Typography>
          <Divider>
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{
                fontWeight: "medium",
                textAlign: "center",
                fontFamily: "Inter",
                fontSize:'15px',
              }}
            >
              Admin Panel
            </Typography>
          </Divider>
        </Box>
        <Stack
          direction="column"
          spacing={4}
          sx={{ width: "100%", marginTop: 5 }}
        >
          {locations.map((location) => (
            <NavButton
              icon={location.icon}
              name={location.name}
              nav={location.nav}
              key={location.name}
            />
          ))}
          <LogOut />
          <RefreshButton />
        </Stack>
      </Drawer>
  );
};

export default NavDrawer;
