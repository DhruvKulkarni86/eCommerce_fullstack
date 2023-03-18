import React from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import YardRoundedIcon from '@mui/icons-material/YardRounded';
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from 'react-router-dom'
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

const StatCards = ({Customers, Orders, Products, Revenue, Last24Revenue, Last24Orders, loading}) => {

  const navigate = useNavigate()

  return (
    <Box>
      <Grid
        container
        direction='row'
        gap="48px"
      >
        <Paper elevation={3} sx={{borderRadius: 3, display: 'flex', flexDirection:'row', gap:'20px', alignItems:'center',p:2, justifyContent:'space-between'}}>
            <Grid item width={145} height={110}>
              <Typography color="primary" gutterBottom variant="body1" sx={{fontWeight:'medium'}}>
                CUSTOMERS
              </Typography>
              <Grid item sx={{pt:1}}>
            <Typography color="primary" variant="h4">
                {Customers}
              </Typography>
            </Grid>
            <Grid item>
            <Button size='small' onClick={() => navigate('/users')} sx={{float:'right',mt:1}}>View All ⯈</Button>
            </Grid>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "#ffb22b",
                  height: 50,
                  width: 50,
                }}
              >
                <PeopleIcon />
              </Avatar>
            </Grid>
        </Paper>

        <Paper elevation={3} sx={{borderRadius: 3, display: 'flex', flexDirection:'row', gap:'20px', alignItems:'center',p:2, justifyContent:'space-between'}}>
        <Grid item width={145} height={110} sx={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <Typography color="primary" gutterBottom variant="body1" sx={{fontWeight:'medium'}}>
                ORDERS
              </Typography>
              <Grid item xs sx={{pt:1}}>
              <Typography color="textPrimary" variant="h4">
                {Orders}
              </Typography>
              </Grid>
              <Grid item>
              {Last24Orders !== 0 ? 
              <Typography variant='subtitle2' color={'green'} sx={{width:'200px'}}>
                ▲ {Last24Orders} in Last 24 hours
              </Typography>
              :null}
              </Grid>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "#fb9678",
                  height: 50,
                  width: 50,
                }}
              >
                <ShoppingCartIcon />
              </Avatar>
            </Grid>
        </Paper>

        <Paper elevation={3} sx={{borderRadius: 3, display: 'flex', flexDirection:'row', gap:'20px', alignItems:'center',p:2, justifyContent:'space-between'}}>
        <Grid item width={145} height={110}>
              <Typography color="primary" gutterBottom variant="body1" sx={{fontWeight:'medium'}}>
                PRODUCTS
              </Typography>
              <Grid item sx={{pt:1}}>
              <Typography color="textPrimary" variant="h4">
                {Products}
              </Typography>
              <Grid item>
            <Button size="small" onClick={() => navigate('/add')} sx={{float:'right',mt:1}}>Add More ⯈</Button>
            </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "success.main",
                  height: 50,
                  width: 50,
                }}
              >
                <YardRoundedIcon />
              </Avatar>
            </Grid>
        </Paper>

        <Paper elevation={3} sx={{borderRadius: 3, display: 'flex', flexDirection:'row', gap:'20px', alignItems:'center',p:2, justifyContent:'space-between'}}>
        <Grid item width={145} height={110} sx={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <Typography color="primary" gutterBottom variant="body1" sx={{fontWeight:'medium'}}>
                REVENUE
              </Typography>
              <Grid item xs sx={{pt:1}}>
              <Typography variant="h4" >
              ₹{Revenue}
              </Typography>
              </Grid>
              <Grid item>
              {Last24Revenue !== 0 ? 
              <Typography variant='subtitle2' color='green' sx={{display:'flex', width:'200px'}}>
              ▲ ₹{Last24Revenue} in Last 24 Hours
              </Typography>
              :null}
              </Grid>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "#1e88e5",
                  height: 50,
                  width: 50,
                }}
              >
                <AccountBalanceWalletRoundedIcon />
              </Avatar>
            </Grid>
        </Paper>
      </Grid>
    </Box>
  );
};

export default React.memo(StatCards);
