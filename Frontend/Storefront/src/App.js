import React, {useEffect} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Snackbar, Slide, Alert } from "@mui/material";
import { useDispatch,useSelector } from 'react-redux';
import { auth } from './firebase/config';
import {login, logout} from './features/user'
import axios from "axios";
import { HelmetProvider } from "react-helmet-async";
import {open} from "./features/open";
// import MainLanding from './routes/MainLanding';
import StoreLanding from "./routes/StoreLanding";
import Layout from "./components/Layouts/Layout";
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import RequireAuth from './components/RequireAuth';
import ProdLayout from './components/Layouts/ProdLayout'
import ProductCatalogue from "./components/Product/ProductCatalogue";
import MainResult from "./components/MainProduct/MainResult";
import Cart from './components/Cart/Cart';
import OrderLayout from "./components/Layouts/OrderLayout";
import UserDetails from "./components/Order/UserDetails/UserDetails";
import { add } from "./features/cart";
import PaymentSumm from "./components/Order/PaymentSumm";
import TagPage from "./routes/TagPage";
import Reset from "./components/Reset/Reset";
import UserOrder from "./routes/UserOrder";
import PaymentConf from "./routes/PaymentConf";
import CategoryPage from "./routes/CategoryPage";
import WildCard from "./routes/WildCard";
import Story from "./routes/Story";
import Terms from "./routes/Terms";
import Contact from "./routes/Contact";
import LocateUs from "./routes/LocateUs";
import Privacy from "./routes/Privacy";
import RedirectPass from "./routes/RedirectPass";
import PaymentFailed from './routes/PaymentFailed';
const App = () =>{
    const dispatch = useDispatch();

    const opa = useSelector((state)=>state.open.value.open);

    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
        if (user) {
                dispatch(login({
                    userId: user.uid,
                    userName:user.displayName,
                    userEmail: user.email,
                    currentUser:true,
                    authType:user.providerId
                }))
        } else {
            dispatch(logout());
        }
        });
    }, [dispatch]);

    // const cart = useSelector((state)=>state.cart.value.cartItems);
    const fbUser = auth.currentUser;
    useEffect(()=>{
        const getCart = () => {
            let token = localStorage.getItem('userToken');
            axios({
                url:`${process.env.REACT_APP_BACK_URL}/cart`,
                headers:{
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": `Bearer ${token}`
                },
                method:"GET"
            }).then((res)=>{
                if(res.data.message!=='Internal Error'){
                    res.data.map((item)=>(
                        dispatch(add(item))
                    ))
                }
            }).catch((err)=>{
                if(err.response.status===401){
                    auth.currentUser.getIdToken().then((token)=>{
                        localStorage.setItem("userToken", token)
                        getCart();
                    })
                }
            })
        }
        if(user.authType==='firebase' && fbUser.emailVerified===true){
            getCart();
            // sendCart();
        }
    },[user, dispatch, fbUser])   

    function TransitionLeft(props) {
        return <Slide {...props} direction="left" />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        dispatch(open({
            open:false
        }))
        // setOpen(false);
    };

    return(
        <>
            <HelmetProvider>
            <CssBaseline/>
                <Snackbar open={opa} TransitionComponent={TransitionLeft} autoHideDuration={2000} onClose={handleClose}>
                    <Alert severity='success' sx={{width:'100%', border:'2px solid', borderColor:'primary.main'}}>
                        Logged Out Successfully!    
                    </Alert>
                </Snackbar> 
                <Routes>
                    <Route path="/" element={<Navigate to='/store'/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/signin" element={<Login/>}/>
                    <Route path="/reset" element={<Reset/>}/>
                    <Route path="*" element={<WildCard/>}/>
                    <Route path="/paymentDone" element=
                        {<RequireAuth>
                            <PaymentConf/>
                        </RequireAuth>}
                    />
                    <Route path='/store/payment' element=
                        {<RequireAuth>
                            <PaymentSumm/>
                        </RequireAuth>}
                    />
                    <Route element={<Layout/>}>
                        <Route path="/paymentErr" element=
                            {<RequireAuth>
                                <PaymentFailed/>
                            </RequireAuth>}
                        />
                        <Route path="/ourStory" element={<Story/>}/>
                        <Route path="/terms" element={<Terms/>}/>
                        <Route path="/contactus" element={<Contact/>}/>
                        <Route path="/locate" element={<LocateUs/>}/>
                        <Route path="/privacy" element={<Privacy/>}/>
                        <Route path="/passRedirect" element={<RedirectPass/>}/>
                        <Route path="/store" element={<StoreLanding/>}/>
                        <Route path="/store/product/:id" element={<MainResult/>}/>
                        <Route path="/store/:tag" element={<TagPage/>}/>
                        <Route path="/store/cat/:cat" element={<CategoryPage/>}/>
                        <Route element={<ProdLayout/>}>
                            <Route path="/store/catalogue" element={<ProductCatalogue/>}/>
                        </Route>
                        <Route element={<OrderLayout/>}>
                            <Route path='/store/cart' element={<Cart/>}/>
                            <Route path='/store/order' element=
                                {<RequireAuth>
                                    <UserDetails/>
                                </RequireAuth>}
                            />
                        </Route>
                            <Route 
                                path="/dash" 
                                element={
                                    <RequireAuth>
                                        <Dashboard />
                                    </RequireAuth>
                                }
                            />
                            <Route 
                                path="/orders" 
                                element={
                                    <RequireAuth>
                                        <UserOrder />
                                    </RequireAuth>
                                }
                            />
                        </Route>
                </Routes>
            </HelmetProvider>
        </>
    )
}

export default App