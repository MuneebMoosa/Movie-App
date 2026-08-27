import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `${USERS_URL}/verify-email/${token}`,
        method: "POST",
      }),
    }),
    resendVerificationEmail: builder.mutation({
      query: (email) => ({
        url: `${USERS_URL}/resend-verification`,
        method: "POST",
        body: { email },
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

     logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),

     profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),

      getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: `${USERS_URL}/forgot-password`,
        method: "POST",
        body: { email },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, newPassword, confirmPassword }) => ({
        url: `${USERS_URL}/reset-password/${token}`,
        method: "POST",
        body: {
          newPassword,
          confirmPassword,
        },
      }),
    }),

  })
})

export const { 
      useLoginMutation,
      useVerifyEmailMutation, 
      useRegisterMutation, 
      useLogoutMutation ,
      useProfileMutation ,
      useResendVerificationEmailMutation,
      useGetUsersQuery,
      useForgotPasswordMutation,
      useResetPasswordMutation} = userApiSlice;