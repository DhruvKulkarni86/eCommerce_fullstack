import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const prodApi = createApi({
    reducerPath: 'prodApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${process.env.REACT_APP_BACK_URL}`
    }),
    keepUnusedDataFor: 120,
    refetchOnMountOrArgChange: 1,
    endpoints: (builder) => ({
        //*GET USER ADDR
        getAddr: builder.query({
            query: (id) => ({
                url: `stats/`,
                method: 'GET',
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": `Bearer ${id}`
                },
            })
        }),
        getPie: builder.query({
            query: (id) => ({
                url: 'stats/pie',
                method: 'GET',
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": `Bearer ${id}`,
                }
            })
        }),
        getProd: builder.query({
            query: (id) => ({
                url: 'product/all',
                method: 'GET',
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": `Bearer ${id}`
                }
            })
        }),
    }),
})

export const { useGetAddrQuery, useGetPieQuery, useGetProdQuery } = prodApi