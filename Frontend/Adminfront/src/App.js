import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventoryTable from "./Pages/Tables/InventoryTable";
import UsersTable from "./Pages/Tables/UsersTable";
import AllOrdersTable from "./Pages/Tables/AllOrdersTable";
import { CssBaseline } from "@mui/material";
import MainLayout from "./components/Layouts/MainLayout";
import DashHome from "./components/dash/DashHome";
import AddProduct from "./Pages/AddProduct";
import Login from "./Pages/Login";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/user";
import { auth } from "./firebase/config";
import RequireAuth from "../src/components/RequireAuth";
import NotFound from "./Pages/NotFound";
import Feedback from "./Pages/Feedback";
import Reset from "./Pages/Reset";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email,
            currentUser: true,
            authType: user.providerId,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className="App">
      <CssBaseline />
      <BrowserRouter>
        <Routes>
              <Route path="/login" element={<Login />} />
              <Route path='*' element={<NotFound />} />
              <Route path="/reset" element={<Reset />}/>
              <Route element={<RequireAuth><MainLayout /></RequireAuth>}>
                <Route path="/" element={<DashHome />} />
                <Route path="/add" element={<AddProduct />} />
                <Route path="/inventory" element={<InventoryTable />} />
                <Route path="product/:id" element={<AddProduct />} />
                <Route path="/users" element={<UsersTable />} />
                <Route path="/orders" element={<AllOrdersTable />} />
                <Route path='/feedback' element={<Feedback />}/>
                </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
