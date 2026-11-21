import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function StorefrontHeader() {
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <header className="storefront-header">
      <div className="container">
        <nav className="navbar navbar-expand-lg py-3">
          <Link to="/shop" className="navbar-brand">
            <span className="store-logo-icon">
              <i className="bi bi-droplet-fill"></i>
            </span>
            <span className="store-logo-text">
              Dairy<span>Dash</span>
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#storeNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="storeNavbar">
            <div className="navbar-nav mx-auto gap-lg-4">
              <NavLink to="/shop" className="store-nav-link">
                Home
              </NavLink>

              <a href="#shop-products" className="store-nav-link">
                Products
              </a>

              <a href="#shop-categories" className="store-nav-link">
                Categories
              </a>

              <a href="#store-about" className="store-nav-link">
                About Us
              </a>
            </div>

            <div className="store-header-actions">
              <Link to="/catalog" className="btn btn-outline-success">
                Browse Catalogue
              </Link>
              <Link
                to="/cart"
                className="btn btn-outline-success position-relative ms-3"
              >
                <i className="bi bi-cart3 me-2"></i>
                Cart
                <span className="cart-count-badge">{cartCount}</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default StorefrontHeader;
