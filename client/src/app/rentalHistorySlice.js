import apiSlice from "./apiSlice";

const rentalHistoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRentalHistory: build.query({
      query: () => ({
        url: '/api/rental-history',
      }),
    }),
    createRentalRecord: build.mutation({
      query: (rentalRecord) => ({
        url: '/api/rental-history',
        method: 'POST',
        body: rentalRecord,
      }),
    }),
    getRentalHistoryByUserId: build.query({
      query: (userId) => ({
        url: `/api/rental-history/user/${userId}`,
      }),
    }),
    updateRentalRecord: build.mutation({
      query: (updatedRecord) => ({
        url: `/api/rental-history/${updatedRecord.id}`,
        method: 'PUT',
        body: updatedRecord,
      }),
    }),
    deleteRentalRecord: build.mutation({
      query: (id) => ({
        url: `/api/rental-history/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { 
  useGetRentalHistoryQuery, 
  useCreateRentalRecordMutation, 
  useGetRentalHistoryByUserIdQuery, 
  useUpdateRentalRecordMutation, 
  useDeleteRentalRecordMutation 
} = rentalHistoryApiSlice;

export default rentalHistoryApiSlice;

