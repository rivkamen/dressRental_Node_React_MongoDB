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
    query: ({id,dress}) =>({
        
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

availableDress: build.mutation({
    query: ({ _id, chosenDate }) => ({
        url: `/api/dress/${_id}/available-dress?chosenDate=${chosenDate}`, // Pass date as a query parameter
        method: "GET",
    }),
    invalidatesTags: ["Dresses"], // This is good for invalidating cache related to dresses
}),

// takeDress:build.mutation({
//     query: (_id,userId,key,chosenDate) =>({

//     url: '/api/dress/'+_id+'/take-dress',
//     method: "PUT",
//     body: userId,key,chosenDate
//     }),
//     invalidatesTags:["Dresses"]

// }),
takeDress: build.mutation({
    query: ({ _id, userId, key, chosenDate }) => ({
        url: `/api/dress/${_id}/take-dress`,
        method: "PUT",
        body: { userId, key, chosenDate }, // Corrected: pass the parameters as an object
    }),
    invalidatesTags: ["Dresses"]
}),
getAllBookedDates: build.query({
    query: () => ({
        url: '/api/dress/rent',
    }),
    providesTags: ["BookedDates"]
}),
returnDress: build.mutation({
    query: ({id,dress}) =>({
        
    url: '/api/dress/'+id+'/cancel-dress',
    method: "PUT",
    body: dress
    }),
}),
cancelRentDress: build.mutation({
    query: ({id,dress}) =>({
        
    url: '/api/dress/'+id+'/cancel-dress',
    method: "PUT",
    body: dress
    }),

    invalidatesTags:["Dresses"]

}),

})
})
export const {useReturnDressMutation,useGetAllBookedDatesQuery,useGetAllDressesQuery, useAddDressMutation,useUpdateDressMutation,useDeleteDressMutation,useAvailableDressMutation,useTakeDressMutation,useCancelRentDressMutation}=DressApiSlice

