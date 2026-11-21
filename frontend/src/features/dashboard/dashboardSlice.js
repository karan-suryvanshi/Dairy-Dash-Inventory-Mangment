import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import dashboardService from "../../services/dashboardService";

export const fetchDashboardSummary = createAsyncThunk(
  "dashboard/fetchSummary",

  async (_, thunkAPI) => {
    try {
      return await dashboardService.getSummary();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to load dashboard information";

      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {
  summary: {
    totalProducts: 0,
    totalCategories: 0,
    totalSuppliers: 0,
  },

  loading: false,

  success: false,

  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.summary = action.payload;
      })

      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Dashboard loading failed";
      });
  },
});

export const { clearDashboardError } = dashboardSlice.actions;

export default dashboardSlice.reducer;
