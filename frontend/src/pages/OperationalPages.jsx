import { useEffect, useMemo, useState } from "react";
import axiosClient from "../api/axiosClient";

function useCatalog() {
  const [catalog, setCatalog] = useState({ products: [], suppliers: [], categories: [], loading: true, error: "" });
  useEffect(() => {
    let active = true;
    Promise.all([
      axiosClient.get("/products", { params: { page: 0, size: 200 } }),
      axiosClient.get("/suppliers", { params: { page: 0, size: 200 } }),
      axiosClient.get("/categories"),
    ]).then(([products, suppliers, categories]) => {
      if (active) setCatalog({ products: products.data.content || [], suppliers: suppliers.data.content || [], categories: categories.data || [], loading: false, error: "" });
    }).catch((error) => {
      if (active) setCatalog((current) => ({ ...current, loading: false, error: error.response?.data?.message || "Could not load project data from the API." }));
    });
    return () => { active = false; };
  }, []);
  return catalog;
}

function PageHeading({ title, subtitle, icon }) {
  return <div className="d-flex align-items-center gap-3 mb-4">
    <div className="dd-metric-icon" style={{ color: "#2f855a", background: "#e8f2ec" }}><i className={`bi ${icon}`} /></div>
    <div><h1 className="dd-page-title">{title}</h1><p className="dd-page-subtitle">{subtitle}</p></div>
  </div>;
}

function Notice({ children, tone = "info" }) {
  return <div className={`alert alert-${tone} py-2 small`} role="status">{children}</div>;
}

function Inventory() {
  const { products, loading, error } = useCatalog();
  const [stock, setStock] = useState([]);
  const [saveError, setSaveError] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const quantities = useMemo(() => Object.fromEntries(stock.map((row) => [String(row.productId), row.quantity])), [stock]);
  const tracked = stock.length;
  const low = stock.filter((row) => Number(row.quantity) <= 5).length;
  useEffect(() => { axiosClient.get("/inventory").then(({ data }) => setStock(data)).catch(() => setSaveError("Could not load stock levels.")); }, []);
  const update = async (event) => {
    event.preventDefault();
    if (!productId || quantity === "" || Number(quantity) < 0) return;
    try { const { data } = await axiosClient.put(`/inventory/${productId}`, { quantity: Number(quantity) }); setStock((current) => [...current.filter((row) => row.productId !== data.productId), data]); setQuantity(""); setSaveError(""); }
    catch (failure) { setSaveError(failure.response?.data?.message || "Could not save stock quantity."); }
  };
  return <>
    <PageHeading title="Inventory" subtitle="Track opening and on-hand quantities for your catalog." icon="bi-boxes" />
    <div className="row g-3 mb-4">
      {[['Catalog products', products.length], ['Stock levels entered', tracked], ['At or below 5 units', low]].map(([label, value]) => <div className="col-md-4" key={label}><div className="dd-card p-3"><div className="small text-secondary">{label}</div><div className="fs-4 fw-bold">{value}</div></div></div>)}
    </div>
    <div className="dd-card p-4 mb-4">
      <h2 className="h6 fw-bold mb-3">Set stock level</h2>
      <form className="row g-2 align-items-end" onSubmit={update}>
        <div className="col-md-6"><label className="form-label" htmlFor="inventory-product">Product</label><select id="inventory-product" className="form-select" value={productId} onChange={(e) => setProductId(e.target.value)} required><option value="">Choose a product</option>{products.map((product) => <option key={product.id} value={product.id}>{product.name} ({product.sku})</option>)}</select></div>
        <div className="col-md-3"><label className="form-label" htmlFor="inventory-quantity">Quantity on hand</label><input id="inventory-quantity" className="form-control" type="number" min="0" step="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} required /></div>
        <div className="col-md-3"><button className="btn btn-dd-primary w-100" disabled={!products.length}>Save quantity</button></div>
      </form>
    </div>
    {(error || saveError) && <Notice tone="warning">{error || saveError}</Notice>}
    <div className="dd-card p-4"><h2 className="h6 fw-bold mb-3">Product stock</h2>{loading ? <p>Loading products…</p> : <div className="table-responsive"><table className="table align-middle mb-0"><thead><tr><th>Product</th><th>SKU</th><th>Category</th><th>On hand</th><th>Status</th></tr></thead><tbody>{products.map((product) => { const qty = quantities[String(product.id)]; return <tr key={product.id}><td className="fw-semibold">{product.name}</td><td>{product.sku}</td><td>{product.categoryName || "—"}</td><td>{qty ?? "Not set"}</td><td>{qty == null ? <span className="badge text-bg-secondary">Untracked</span> : qty <= 5 ? <span className="badge text-bg-warning">Low stock</span> : <span className="badge text-bg-success">In stock</span>}</td></tr>; })}{!products.length && <tr><td colSpan="5" className="text-center text-secondary py-4">No products found.</td></tr>}</tbody></table></div>}
      <p className="small text-secondary mt-3 mb-0">Stock counts are saved in the shared DairyDash database.</p>
    </div>
  </>;
}

function PurchaseOrders() {
  const { products, suppliers, loading, error } = useCatalog();
  const [orders, setOrders] = useState([]); const [saveError, setSaveError] = useState("");
  useEffect(() => { axiosClient.get("/purchase-orders").then(({ data }) => setOrders(data)).catch(() => setSaveError("Could not load purchase orders.")); }, []);
  const [supplierId, setSupplierId] = useState(""); const [productId, setProductId] = useState(""); const [quantity, setQuantity] = useState("");
  const create = async (event) => {
    event.preventDefault();
    const product = products.find((item) => String(item.id) === productId);
    const supplier = suppliers.find((item) => String(item.id) === supplierId);
    if (!product || !supplier || Number(quantity) <= 0) return;
    try { const { data } = await axiosClient.post("/purchase-orders", { supplierId: Number(supplierId), productId: Number(productId), quantity: Number(quantity) }); setOrders((current) => [data, ...current]); setQuantity(""); setSaveError(""); }
    catch (failure) { setSaveError(failure.response?.data?.message || "Could not create purchase order."); }
  };
  const setStatus = async (order, status) => { try { const { data } = await axiosClient.patch(`/purchase-orders/${order.id}/status`, { status }); setOrders((current) => current.map((item) => item.id === order.id ? data : item)); setSaveError(""); } catch (failure) { setSaveError(failure.response?.data?.message || "Could not update order status."); } };
  return <>
    <PageHeading title="Purchase Orders" subtitle="Create and follow supplier replenishment orders." icon="bi-cart3" />
    {(error || saveError) && <Notice tone="warning">{error || saveError}</Notice>}
    {!loading && suppliers.length === 0 && <Notice tone="warning">Add a supplier in Suppliers before creating a purchase order.</Notice>}
    <div className="dd-card p-4 mb-4"><h2 className="h6 fw-bold mb-3">New purchase order</h2><form className="row g-2 align-items-end" onSubmit={create}>
      <div className="col-md-4"><label className="form-label" htmlFor="po-supplier">Supplier</label><select id="po-supplier" className="form-select" value={supplierId} onChange={(e) => setSupplierId(e.target.value)} required><option value="">Choose supplier</option>{suppliers.map((item) => <option key={item.id} value={item.id}>{item.companyName}</option>)}</select></div>
      <div className="col-md-4"><label className="form-label" htmlFor="po-product">Product</label><select id="po-product" className="form-select" value={productId} onChange={(e) => setProductId(e.target.value)} required><option value="">Choose product</option>{products.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div>
      <div className="col-md-2"><label className="form-label" htmlFor="po-quantity">Quantity</label><input id="po-quantity" className="form-control" type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} required /></div>
      <div className="col-md-2"><button className="btn btn-dd-primary w-100" disabled={loading || !suppliers.length || !products.length}>Create order</button></div>
    </form></div>
    <div className="dd-card p-4"><h2 className="h6 fw-bold mb-3">Orders ({orders.length})</h2><div className="table-responsive"><table className="table align-middle"><thead><tr><th>Order</th><th>Supplier</th><th>Product</th><th>Qty</th><th>Created</th><th>Status</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td className="fw-semibold">{order.orderNumber}</td><td>{order.supplier}</td><td>{order.product}<div className="small text-secondary">{order.sku}</div></td><td>{order.quantity}</td><td>{new Date(order.createdAt).toLocaleDateString("en-IN")}</td><td><select className="form-select form-select-sm" aria-label={`Status for ${order.orderNumber}`} value={order.status} onChange={(e) => setStatus(order, e.target.value)}>{["Draft", "Submitted", "Received", "Cancelled"].map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}{!orders.length && <tr><td colSpan="6" className="text-center text-secondary py-4">No purchase orders yet.</td></tr>}</tbody></table></div><p className="small text-secondary mb-0">Orders are stored in the shared DairyDash database.</p></div>
  </>;
}

function Warehouses() {
  const [warehouses, setWarehouses] = useState([]); const [name, setName] = useState(""); const [location, setLocation] = useState(""); const [error, setError] = useState("");
  useEffect(() => { axiosClient.get("/warehouses").then(({ data }) => setWarehouses(data)).catch(() => setError("Could not load warehouse locations.")); }, []);
  const create = async (event) => { event.preventDefault(); if (!name.trim()) return; try { const { data } = await axiosClient.post("/warehouses", { name: name.trim(), location: location.trim() }); setWarehouses((current) => [data, ...current]); setName(""); setLocation(""); setError(""); } catch (failure) { setError(failure.response?.data?.message || "Could not add warehouse."); } };
  const remove = async (item) => { try { await axiosClient.delete(`/warehouses/${item.id}`); setWarehouses((current) => current.filter((row) => row.id !== item.id)); } catch (failure) { setError(failure.response?.data?.message || "Could not remove warehouse."); } };
  return <><PageHeading title="Warehouses" subtitle="Maintain the locations used to organize stock." icon="bi-building" />{error && <Notice tone="warning">{error}</Notice>}<div className="dd-card p-4 mb-4"><h2 className="h6 fw-bold mb-3">Add warehouse</h2><form className="row g-2 align-items-end" onSubmit={create}><div className="col-md-5"><label className="form-label" htmlFor="warehouse-name">Warehouse name</label><input id="warehouse-name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required /></div><div className="col-md-5"><label className="form-label" htmlFor="warehouse-location">Location</label><input id="warehouse-location" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} /></div><div className="col-md-2"><button className="btn btn-dd-primary w-100">Add location</button></div></form></div><div className="dd-card p-4"><h2 className="h6 fw-bold mb-3">Locations ({warehouses.length})</h2><div className="table-responsive"><table className="table align-middle"><thead><tr><th>Name</th><th>Location</th><th /></tr></thead><tbody>{warehouses.map((item) => <tr key={item.id}><td className="fw-semibold">{item.name}</td><td>{item.location || "—"}</td><td className="text-end"><button className="btn btn-sm btn-outline-danger" onClick={() => remove(item)} aria-label={`Remove ${item.name}`}><i className="bi bi-trash" /></button></td></tr>)}{!warehouses.length && <tr><td colSpan="3" className="text-center text-secondary py-4">No warehouse locations added.</td></tr>}</tbody></table></div><p className="small text-secondary mb-0">Warehouse records are stored in the shared DairyDash database.</p></div></>;
}

function UsersRoles() {
  const [users, setUsers] = useState([]); const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [role, setRole] = useState("Viewer"); const [error, setError] = useState("");
  useEffect(() => { axiosClient.get("/team-members").then(({ data }) => setUsers(data)).catch(() => setError("Could not load team members.")); }, []);
  const create = async (event) => { event.preventDefault(); if (!name.trim() || !email.trim()) return; try { const { data } = await axiosClient.post("/team-members", { name: name.trim(), email: email.trim(), role }); setUsers((current) => [data, ...current]); setName(""); setEmail(""); setError(""); } catch (failure) { setError(failure.response?.data?.message || "Could not add team member."); } };
  const changeRole = async (user, nextRole) => { try { const { data } = await axiosClient.put(`/team-members/${user.id}`, { name: user.name, email: user.email, role: nextRole }); setUsers((current) => current.map((row) => row.id === user.id ? data : row)); setError(""); } catch (failure) { setError(failure.response?.data?.message || "Could not update role."); } };
  const remove = async (user) => { try { await axiosClient.delete(`/team-members/${user.id}`); setUsers((current) => current.filter((row) => row.id !== user.id)); } catch (failure) { setError(failure.response?.data?.message || "Could not remove team member."); } };
  return <><PageHeading title="Users & Roles" subtitle="Keep a directory of team members and assigned roles." icon="bi-people" /><Notice tone="warning">Roles are stored in the database, but do not grant or restrict access yet. Sign-in and permission enforcement need an authentication system.</Notice>{error && <Notice tone="danger">{error}</Notice>}<div className="dd-card p-4 mb-4"><h2 className="h6 fw-bold mb-3">Add team member</h2><form className="row g-2 align-items-end" onSubmit={create}><div className="col-md-4"><label className="form-label" htmlFor="user-name">Name</label><input id="user-name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required /></div><div className="col-md-4"><label className="form-label" htmlFor="user-email">Email</label><input id="user-email" type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required /></div><div className="col-md-2"><label className="form-label" htmlFor="user-role">Role</label><select id="user-role" className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>{["Admin", "Manager", "Staff", "Viewer"].map((item) => <option key={item}>{item}</option>)}</select></div><div className="col-md-2"><button className="btn btn-dd-primary w-100">Add member</button></div></form></div><div className="dd-card p-4"><h2 className="h6 fw-bold mb-3">Team members ({users.length})</h2><div className="table-responsive"><table className="table align-middle"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th /></tr></thead><tbody>{users.map((user) => <tr key={user.id}><td className="fw-semibold">{user.name}</td><td>{user.email}</td><td><select className="form-select form-select-sm" aria-label={`Role for ${user.name}`} value={user.role} onChange={(e) => changeRole(user, e.target.value)}>{["Admin", "Manager", "Staff", "Viewer"].map((item) => <option key={item}>{item}</option>)}</select></td><td className="text-end"><button className="btn btn-sm btn-outline-danger" onClick={() => remove(user)} aria-label={`Remove ${user.name}`}><i className="bi bi-trash" /></button></td></tr>)}{!users.length && <tr><td colSpan="4" className="text-center text-secondary py-4">No team members added.</td></tr>}</tbody></table></div></div></>;
}

function Reports() {
  const [summary, setSummary] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { axiosClient.get("/reports/summary").then(({ data }) => setSummary(data)).catch(() => setError("Could not load report summary.")).finally(() => setLoading(false)); }, []);
  const rows = useMemo(() => summary ? [["Products", summary.totalProducts, "Catalog records"], ["Active products", summary.activeProducts, "Available in catalog"], ["Categories", summary.totalCategories, "Product groups"], ["Suppliers", summary.totalSuppliers, "Supplier records"], ["Tracked products", summary.trackedProducts, "Products with stock counts"], ["Low stock", summary.lowStockProducts, "Stock at or below 5 units"], ["Purchase orders", summary.purchaseOrders, "Recorded supplier orders"]] : [], [summary]);
  const download = () => {
    const csv = ["Metric,Value,Description", ...rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" })); const link = document.createElement("a"); link.href = url; link.download = "dairydash-summary-report.csv"; link.click(); URL.revokeObjectURL(url);
  };
  return <><PageHeading title="Reports" subtitle="Review live catalog, stock, supplier, and purchasing totals." icon="bi-graph-up" />{error && <Notice tone="warning">{error}</Notice>}<div className="dd-card p-4"><div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3"><div><h2 className="h6 fw-bold mb-1">Business summary</h2><p className="small text-secondary mb-0">Live counts from the DairyDash database</p></div><button className="btn btn-outline-success" onClick={download} disabled={loading || !summary}><i className="bi bi-download me-2" />Export CSV</button></div>{loading ? <p>Loading report data…</p> : <div className="table-responsive"><table className="table align-middle mb-0"><thead><tr><th>Metric</th><th>Value</th><th>Description</th></tr></thead><tbody>{rows.map(([label, value, description]) => <tr key={label}><td className="fw-semibold">{label}</td><td>{value}</td><td>{description}</td></tr>)}</tbody></table></div>}<p className="small text-secondary mt-3 mb-0">Sales and stock movement reporting requires transaction records beyond current stock levels and order headers.</p></div></>;
}

export { Inventory, PurchaseOrders, Warehouses, UsersRoles, Reports };
