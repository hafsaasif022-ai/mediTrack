import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/**
 * TASK 5.2 - The four thunks. The component never touches axios.
 *
 * Notice what is NOT in this file: the token. It lives only in the cookie.
 */

export const registerUser = createAsyncThunk(
  "auth/register",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/register", body);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg ?? "Registration failed");
    }
  }
);

// TODO (Task 5.2): loginUser  -> POST /auth/login, return data.user
// TODO (Task 5.2): fetchMe    -> GET  /auth/me,    rejectWithValue(null) on failure
// TODO (Task 5.2): logoutUser -> POST /auth/logout, return true

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  booted: false, // has /me answered yet? stops the login page flashing
};

/**
 * TASK 5.3 - Write the builder chain with addCase ONLY (no addMatcher),
 * so every action maps to one visible reducer.
 *
 *   registerUser / loginUser : pending -> loading true, error null
 *                              fulfilled -> user, isAuthenticated true, loading false
 *                              rejected  -> error = action.payload, loading false
 *   fetchMe.fulfilled  -> user, isAuthenticated true, booted true
 *   fetchMe.rejected   -> user null, isAuthenticated false, booted true
 *   logoutUser.fulfilled -> user null, isAuthenticated false
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    forceLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // TODO (Task 5.3): add the cases for loginUser, fetchMe and logoutUser
  },
});

export const { clearError, forceLogout } = authSlice.actions;
export default authSlice.reducer;
