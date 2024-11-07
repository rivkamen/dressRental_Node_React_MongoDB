import apiSlice from "./apiSlice"

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: '/api/user/'
            }),
        }),
        createUser: build.mutation({
            query: (user) => ({
                url: '/api/user/',
                method:"POST",
                body:user
            }),
        }),
        loginUser: build.mutation({
            query: (user) => ({
                url: '/api/auth/login',
                method:"POST",
                body:user
            })
        }),  
        getUserById: build.query({
            query: (id) => ({
                url: `/api/user/${id}`,
            }),
        }),
        getUserByPhone: build.query({
            query: (phone) => ({
                url: `/api/user/phone/${phone}`,
            }),
        }),
        // deleteUser: build.mutation({
        //     query: (id) => ({
        //         url: `/api/user/${id}`,
        //         method:"DELETE"
                
        //     }),
        //     invalidatesTags:["users"]
        // }),
        updateUser: build.mutation({
            query: (obj) => ({
                url: `/api/user/${obj.id}`,
                method:"PUT",
                body:obj.user
            }),
            invalidatesTags:["users"]
        }),
    

    }),
})

export const { useGetUsersQuery,useCreateUserMutation,useLoginUserMutation,useDeleteUserMutation ,useUpdateUserMutation,useGetUserByIdQuery,useGetUserByPhoneQuery} = userApiSlice