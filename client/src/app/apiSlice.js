import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3435/',
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = sessionStorage.getItem("adminToken")
            //getState().auth.token
            console.log("Token sent in headers:", token);

            if (token) {
                console.log(token);
                
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: () => ({}),
})
export default apiSlice