import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css';

import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import userReducer from './features/user';
import skipReducer from "./features/skip";
import filterReducer from './features/filter';
import cartReducer from './features/cart';
import { prodApi } from "./services/Prod";
import sortReducer from "./features/sort";
import dataFetchReducer from "./features/dataFetch";
import cartProgReducer from "./features/cartProg";
import openReducer from "./features/open";

const store = configureStore({
    reducer: {
        user: userReducer,
        filter: filterReducer,
        skip: skipReducer,
        sort: sortReducer,
        cart: cartReducer,
        dataFetch: dataFetchReducer,
        cartProg: cartProgReducer,
        open: openReducer,
        [prodApi.reducerPath]:prodApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(prodApi.middleware),
})
// setupListeners(store.dispatch)

ReactDom.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>, document.getElementById('root')
);