import { fetchBaseQuery, createApi, } from "@reduxjs/toolkit/query/react";

import { BASE_URL, USERS_URL } from "../constants";
import { setCredentials, logout } from "../features/auth/authSlice.js";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: `${USERS_URL}/refresh`,
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const newAccessToken = refreshResult.data.accessToken;

      const userInfo = api.getState().auth.userInfo;

      api.dispatch(
        setCredentials({
          ...userInfo,
          accessToken: newAccessToken,
        })
      );

      // Retry original request with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});