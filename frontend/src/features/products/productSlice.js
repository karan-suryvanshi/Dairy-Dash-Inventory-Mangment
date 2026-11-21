
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../../services/productService";

const getErrorMessage = (error) => {
  const data = error.response?.data;

  if (typeof data === "string") return data;

  if (data?.message) return data.message;

  if (data?.errors) {
    return Object.values(data.errors).join(", ");
  }

  return error.message || "Something went wrong.";
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}, thunkAPI) => {
    try {
      return await productService.getAll(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, thunkAPI) => {
    try {
      return await productService.create(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, thunkAPI) => {
    try {
      return await productService.update(id, productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.remove(id);
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

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    clearProductSuccess: (state) => {
      state.success = false;
    }
  },

  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        const response = action.payload;

        state.items = response.content || [];
        state.page = response.number ?? 0;
        state.size = response.size ?? 10;
        state.totalElements = response.totalElements ?? 0;
        state.totalPages = response.totalPages ?? 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to load products.";
      })

      // CREATE
      .addCase(createProduct.pending, (state) => {
        state.saving = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.saving = false;
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateProduct.pending, (state) => {
        state.saving = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.saving = false;
        state.success = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteProduct.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleting = false;
        state.success = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  }
});

export const {
  clearProductError,
  clearProductSuccess
} = productSlice.actions;

export default productSlice.reducer;
