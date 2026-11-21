import { useLocation } from "react-router-dom";

function Header({ openSidebar }) {
  const location = useLocation();

  const pageTitles = {
    "/admin/dashboard": "Dashboard",
    "/admin/categories": "Categories",
    "/admin/products": "Products",
    "/admin/suppliers": "Suppliers",
  };

  const currentTitle = pageTitles[location.pathname] || "Admin Portal";

  return (
    <header className="dd-header">
      <div className="dd-header-left">
        <button
          type="button"
          className="dd-icon-button dd-mobile-menu"
          onClick={openSidebar}
          aria-label="Open navigation"
        >
          <i className="bi bi-list fs-5" />
        </button>

        <div>
          <div className="fw-bold">{currentTitle}</div>

          <small className="text-secondary">
            DairyDash AI / Administration
          </small>
        </div>
      </div>

      <div className="dd-header-right">
        <div className="dd-header-search">
          <i className="bi bi-search" />

          <input
            type="search"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </div>

        <button
          type="button"
          className="dd-icon-button"
          aria-label="Notifications"
          title="Notifications"
        >
          <i className="bi bi-bell fs-5" />
          <span className="dd-notification-dot" />
        </button>

        <div className="dd-profile">
          <div className="dd-avatar">AD</div>

          <div className="dd-profile-details">
            <div className="dd-profile-name">Administrator</div>

            <div className="dd-profile-role">Super Admin</div>
          </div>

          <i className="bi bi-chevron-down small text-secondary" />
        </div>
      </div>
    </header>
  );
}

export default Header;
