import apiSlice from "./apiSlice"
const DressApiSlice = apiSlice.injectEndpoints({
endpoints: (build) => ({
getAllDresses: build.query({
query:(s)=>({
url: '/api/dress/'
}),
providesTags:["Dresses"]

}),
addDress: build.mutation({
    query: (dress) =>({
    url: "/api/dress/",
    method: "POST",
    body: dress
    }),
    invalidatesTags:["Dresses"]

}),

updateDress: build.mutation({
    query: (id) =>({
    url: '/api/dress/'+id,
    method: "PUT"
    // body: dress
    }),
    invalidatesTags:["Dresses"]

}),
deleteDress: build.mutation({
    query: (id) =>({
    url: '/api/dress/'+id,
    method: "DELETE"
    }),
    invalidatesTags:["Dresses"]
}),


})
})
export const {useGetAllDressesQuery, useAddDressMutation,useUpdateDressMutation,useDeleteDressMutation}=DressApiSlice

