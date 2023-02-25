import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const prodApi = createApi({
    reducerPath: 'prodApi',
    baseQuery: fetchBaseQuery({ 
        // baseUrl: 'https://fakestoreapi.com/' 
        baseUrl: `${process.env.REACT_APP_BACK_URL}/` 
    }),
    keepUnusedDataFor: 60,
    refetchOnMountOrArgChange: 1,
    endpoints: (builder) => ({
        //*GET ALL PRODUCTS
        getAllProducts: builder.query({
            query: ({name, sort}) => `product?pageNo=${name}&sortBy=${sort}`,
            keepUnusedDataFor: 10,
        }),
        //*GET PRODUCT BY TAGS
        getCategory: builder.query({
            query: ({catName, limit}) => `product/tags/${catName}?limit=${limit}`
        }),
        //*GET SPECIFIC PRODUCT
        getProduct: builder.query({
            query: (id)=>`product/${id}`,
        }),
        //*SEARCH BAR
        getSearch: builder.query({
            query: ()=>`product/all`,
            keepUnusedDataFor:2,
        }),
        //*GET USER ORDERS
        getOrders: builder.query({
            query: (id)=>({
                url: `customer/frontendOrders`,
                method: 'GET',
                headers:{
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": `Bearer ${id}`
                },
            })
        }),
        //*GET USER ADDR
        getAddr: builder.query({
            query: (id)=>({
                url: `customer/userAddr`,
                method: 'GET',
                headers:{
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": `Bearer ${id}`
                },
            })
        }),
        //*GET CATEGORY
        getCategoryMain: builder.query({
            query: ({catName, number, sort}) => `product/category/${catName}?pageNo=${number}&sortBy=${sort}&category=${catName}`
        }),
    }),
})

export const { useGetAllProductsQuery, useGetCategoryQuery, useGetProductQuery, useGetSearchQuery, useGetOrdersQuery, useGetAddrQuery, useGetCategoryMainQuery } = prodApi
