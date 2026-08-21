import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/**
 * TASK 6.7 - A second slice proves the architecture scales.
 * No token code here either - the cookie rides along automatically.
 */

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/appointments");
      return data.appointments;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg ?? "Failed to load");
    }
  }
);

// TODO (Task 6.7): addAppointment    -> POST   /appointments,      return data.appointment
// TODO (Task 6.8): cancelAppointment -> DELETE /appointments/:id,  return the id

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // TODO (Task 6.7): addAppointment.fulfilled -> state.items.unshift(action.payload)
    // TODO (Task 6.8): cancelAppointment.fulfilled -> filter the id out of state.items
  },
});

export default appointmentsSlice.reducer;
