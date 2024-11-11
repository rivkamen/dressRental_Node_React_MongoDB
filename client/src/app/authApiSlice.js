import apiSlice from "./apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    loginAdmin: build.mutation({
      query: ({ username, password }) => ({
        url:"/api/auth/login",
        method: "POST",
        body: { username, password },
      }),
    }),
    registerAdmin: build.mutation({
        query: ({ username, password }) => ({
          url:"/api/auth/register",
          method: "POST",
          body: { username, password },
        }),
      }),
  }),
});

export const { useLoginAdminMutation ,useRegisterAdminMutation} = authApiSlice;
