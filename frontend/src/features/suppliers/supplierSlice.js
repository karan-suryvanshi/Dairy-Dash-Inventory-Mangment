
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supplierService from "../../services/supplierService";

const getErrorMessage = (error) => {
  const data = error.response?.data;

  if (typeof data === "string") return data;

  if (data?.message) return data.message;

  if (data?.errors) {
    return Object.values(data.errors).join(", ");
  }

  return error.message || "Something went wrong.";
};

export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchSuppliers",
  async (params = {}, thunkAPI) => {
    try {
      return await supplierService.getAll(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createSupplier = createAsyncThunk(
  "suppliers/createSupplier",
  async (supplierData, thunkAPI) => {
    try {
      return await supplierService.create(supplierData);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateSupplier = createAsyncThunk(
  "suppliers/updateSupplier",
  async ({ id, supplierData }, thunkAPI) => {
    try {
      return await supplierService.update(id, supplierData);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  "suppliers/deleteSupplier",
  async (id, thunkAPI) => {
    try {
      return await supplierService.remove(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState = {
  items: [],
  page: 0,
  size: 10,
  totalElements: 0,
  totalPages: 0,
  loading: false,
  saving: false,
  deleting: false,
  error: null,
  success: false
};

const supplierSlice = createSlice({
  name: "suppliers",
  initialState,

  reducers: {
    clearSupplierError: (state) => {
      state.error = null;
    },
    clearSupplierSuccess: (state) => {
      state.success = false;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;

        const response = action.payload;

        state.items = response.content || [];
        state.page = response.page ?? 0;
        state.size = response.size ?? 10;
        state.totalElements = response.totalElements ?? 0;
        state.totalPages = response.totalPages ?? 0;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to load suppliers.";
      })

      .addCase(createSupplier.pending, (state) => {
        state.saving = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSupplier.fulfilled, (state) => {
        state.saving = false;
        state.success = true;
      })
      .addCase(createSupplier.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      .addCase(updateSupplier.pending, (state) => {
        state.saving = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateSupplier.fulfilled, (state) => {
        state.saving = false;
        state.success = true;
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      .addCase(deleteSupplier.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteSupplier.fulfilled, (state) => {
        state.deleting = false;
        state.success = true;
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  }
});

export const {
  clearSupplierError,
  clearSupplierSuccess
} = supplierSlice.actions;

export default supplierSlice.reducer;
