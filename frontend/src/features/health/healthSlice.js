import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import healthService from "../../services/healthService";

// Async API operation
export const checkBackendHealth = createAsyncThunk(
  "health/checkBackendHealth",

  async (_, thunkAPI) => {

    try {

      return await healthService.checkHealth();

    } catch (error) {

      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to connect to backend";

      return thunkAPI.rejectWithValue(message);

    }

  }
);

// Initial Redux state
const initialState = {
  data: null,
  loading: false,
  success: false,
  error: null
};

const healthSlice = createSlice({

  name: "health",

  initialState,

  reducers: {

    clearHealthError: (state) => {
      state.error = null;
    }

  },

  extraReducers: (builder) => {

    builder

      // Request started
      .addCase(checkBackendHealth.pending, (state) => {

        state.loading = true;
        state.success = false;
        state.error = null;

      })

      // Request successful
      .addCase(checkBackendHealth.fulfilled, (state, action) => {

        state.loading = false;
        state.success = true;
        state.data = action.payload;
        state.error = null;

      })

      // Request failed
      .addCase(checkBackendHealth.rejected, (state, action) => {

        state.loading = false;
        state.success = false;
        state.error = action.payload || "Backend connection failed";

      });

  }

});

export const { clearHealthError } = healthSlice.actions;

export default healthSlice.reducer;