
import React from "react";
import { Link } from "react-router-dom";

function StorefrontFooter() {
  return (
    <footer className="store-footer" id="store-about">
      <div className="container">

        <div className="row g-4">

          <div className="col-md-5">
            <h3>
              Dairy<span>Dash</span>
            </h3>

            <p>
              Your trusted platform for discovering quality
              dairy products and managing dairy supply chains.
            </p>
          </div>

          <div className="col-md-3">
            <h5>Quick Links</h5>

            <ul>
              <li><Link to="/shop">Home</Link></li>
              <li><Link to="/catalog">Catalogue</Link></li>
              <li><a href="#shop-categories">Categories</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Our Promise</h5>
            <p>
              Quality products, reliable suppliers and
              a convenient shopping experience.
            </p>
          </div>

        </div>

        <hr />

        <div className="text-center">
          © {new Date().getFullYear()} DairyDash AI. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default StorefrontFooter;
