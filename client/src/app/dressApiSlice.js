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
    query: (id,dress) =>({
    url: '/api/dress/'+id,
    method: "PUT",
    body: dress
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
// availableDress: build.mutation({
//     query: (dress) =>({
        
//     url: '/api/dress/'+dress._id+'/available-dress',
//     // console.log(_id),

//     method: "GET",
//     body:dress.chosenDate
//     }),
//     invalidatesTags:["Dresses"]

// }),
availableDress: build.mutation({
    query: ({ _id, chosenDate }) => ({
        url: `/api/dress/${_id}/available-dress?chosenDate=${chosenDate}`, // Pass date as a query parameter
        method: "GET",
    }),
    invalidatesTags: ["Dresses"], // This is good for invalidating cache related to dresses
}),



})
})
export const {useGetAllDressesQuery, useAddDressMutation,useUpdateDressMutation,useDeleteDressMutation,useAvailableDressMutation}=DressApiSlice

