import { configureStore } from "@reduxjs/toolkit";

import healthReducer from "../features/health/healthSlice";

import dashboardReducer from "../features/dashboard/dashboardSlice";

import categoryReducer from "../features/categories/categorySlice";
import productReducer from "../features/products/productSlice";
import supplierReducer from "../features/suppliers/supplierSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    health: healthReducer,

    dashboard: dashboardReducer,

    categories: categoryReducer,
    products: productReducer,
    suppliers: supplierReducer,
    cart: cartReducer
  },
});
