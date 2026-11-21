import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: "bi-grid-1x2",
  },
  {
    title: "Categories",
    path: "/admin/categories",
    icon: "bi-tags",
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: "bi-box-seam",
  },
  {
    title: "Suppliers",
    path: "/admin/suppliers",
    icon: "bi-truck",
  },
  { title: "Inventory", path: "/admin/inventory", icon: "bi-boxes" },
  { title: "Purchase Orders", path: "/admin/purchase-orders", icon: "bi-cart3" },
  { title: "Warehouses", path: "/admin/warehouses", icon: "bi-building" },
  { title: "Users & Roles", path: "/admin/users-roles", icon: "bi-people" },
  { title: "Reports", path: "/admin/reports", icon: "bi-graph-up" },
];

function Sidebar({ isOpen, closeSidebar }) {
  return (
    <>
      <div
        className={`dd-sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={closeSidebar}
      />

      <aside className={`dd-sidebar ${isOpen ? "show" : ""}`}>
        <div className="dd-sidebar-header">
          <div className="dd-brand">
            <div className="dd-brand-icon">D</div>

            <h2 className="dd-brand-name">
              Dairy<span>Dash</span>
              <small className="ms-1 fs-6">AI</small>
            </h2>
          </div>
        </div>

        <div className="dd-sidebar-label">Main Menu</div>

        <nav className="dd-sidebar-nav">
          {navigationItems.slice(0, 4).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `dd-nav-link ${isActive ? "active" : ""}`
              }
            >
              <i className={`bi ${item.icon}`} />
              <span>{item.title}</span>
            </NavLink>
          ))}

          <div className="dd-sidebar-label px-2">Operations</div>
          {navigationItems.slice(4, 7).map((item) => (
            <NavLink key={item.path} to={item.path} onClick={closeSidebar}
              className={({ isActive }) => `dd-nav-link ${isActive ? "active" : ""}`}>
              <i className={`bi ${item.icon}`} /><span>{item.title}</span>
            </NavLink>
          ))}

          <div className="dd-sidebar-label px-2">Management</div>
          {navigationItems.slice(7).map((item) => (
            <NavLink key={item.path} to={item.path} onClick={closeSidebar}
              className={({ isActive }) => `dd-nav-link ${isActive ? "active" : ""}`}>
              <i className={`bi ${item.icon}`} /><span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        <div className="dd-sidebar-footer">
          <div className="fw-semibold text-white">DairyDash AI</div>
          <div>Enterprise Inventory Platform</div>
          <div className="mt-2">Version 1.0.0</div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
