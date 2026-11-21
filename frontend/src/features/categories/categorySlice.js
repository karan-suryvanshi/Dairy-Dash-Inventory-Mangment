import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import categoryService from "../../services/categoryService";

// Extract a useful backend error message
const getErrorMessage = (error) => {

  const data = error.response?.data;

  if (typeof data === "string") {
    return data;
  }

  if (data?.message) {
    return data.message;
  }

  if (data?.errors) {
    return Object.values(data.errors).join(", ");
  }

  return error.message || "Something went wrong";

};

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",

  async (_, thunkAPI) => {

    try {

      return await categoryService.getAll();

    } catch (error) {

      return thunkAPI.rejectWithValue(
        getErrorMessage(error)
      );

    }

  }
);

// Create category
export const createCategory = createAsyncThunk(
  "categories/create",

  async (categoryData, thunkAPI) => {

    try {

      return await categoryService.create(categoryData);

    } catch (error) {

      return thunkAPI.rejectWithValue(
        getErrorMessage(error)
      );

    }

  }
);

// Update category
export const updateCategory = createAsyncThunk(
  "categories/update",

  async ({ id, categoryData }, thunkAPI) => {

    try {

      return await categoryService.update(id, categoryData);

    } catch (error) {

      return thunkAPI.rejectWithValue(
        getErrorMessage(error)
      );

    }

  }
);

// Delete category
export const deleteCategory = createAsyncThunk(
  "categories/delete",

  async (id, thunkAPI) => {

    try {

      return await categoryService.remove(id);

    } catch (error) {

      return thunkAPI.rejectWithValue(
        getErrorMessage(error)
      );

    }

  }
);

const initialState = {

  items: [],

  loading: false,

  saving: false,

  deleting: false,

  success: false,

  error: null

};

const categorySlice = createSlice({

  name: "categories",

  initialState,

  reducers: {

    clearCategoryError: (state) => {
      state.error = null;
    },

    clearCategorySuccess: (state) => {
      state.success = false;
    }

  },

  extraReducers: (builder) => {

    builder

      // FETCH
      .addCase(fetchCategories.pending, (state) => {

        state.loading = true;
        state.error = null;

      })

      .addCase(fetchCategories.fulfilled, (state, action) => {

        state.loading = false;
        state.items = action.payload;
        state.success = true;

      })

      .addCase(fetchCategories.rejected, (state, action) => {

        state.loading = false;
        state.error = action.payload;

      })

      // CREATE
      .addCase(createCategory.pending, (state) => {

        state.saving = true;
        state.error = null;

      })

      .addCase(createCategory.fulfilled, (state, action) => {

        state.saving = false;
        state.items.unshift(action.payload);
        state.success = true;

      })

      .addCase(createCategory.rejected, (state, action) => {

        state.saving = false;
        state.error = action.payload;

      })

      // UPDATE
      .addCase(updateCategory.pending, (state) => {

        state.saving = true;
        state.error = null;

      })

      .addCase(updateCategory.fulfilled, (state, action) => {

        state.saving = false;

        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }

        state.success = true;

      })

      .addCase(updateCategory.rejected, (state, action) => {

        state.saving = false;
        state.error = action.payload;

      })

      // DELETE
      .addCase(deleteCategory.pending, (state) => {

        state.deleting = true;
        state.error = null;

      })

      .addCase(deleteCategory.fulfilled, (state, action) => {

        state.deleting = false;

        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );

        state.success = true;

      })

      .addCase(deleteCategory.rejected, (state, action) => {

        state.deleting = false;
        state.error = action.payload;

      });

  }

});

export const {
  clearCategoryError,
  clearCategorySuccess
} = categorySlice.actions;

export default categorySlice.reducer;