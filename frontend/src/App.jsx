import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";
import NotFound from "./pages/NotFound";
import ProductCatalog from "./pages/ProductCatalog";
import Storefront from "./pages/Storefront";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { Inventory, PurchaseOrders, Warehouses, UsersRoles, Reports } from "./pages/OperationalPages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/shop" element={<Storefront />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Admin layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="categories" element={<Categories />} />

          <Route path="products" element={<Products />} />

          <Route path="suppliers" element={<Suppliers />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="purchase-orders" element={<PurchaseOrders />} />
          <Route path="warehouses" element={<Warehouses />} />
          <Route path="users-roles" element={<UsersRoles />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        <Route path="/catalog" element={<ProductCatalog />} />

        {/* Invalid routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
