
import React from "react";

function StorefrontHero() {
  return (
    <section className="store-hero">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6">
            <span className="hero-label">
              FRESHNESS YOU CAN TRUST
            </span>

            <h1>
              Fresh Dairy Products
              <span> Delivered With Care.</span>
            </h1>

            <p>
              Discover quality dairy products for your family
              and business. Freshness, quality and convenience
              in every purchase.
            </p>

            <div className="d-flex gap-3 flex-wrap">
              <a
                href="#shop-products"
                className="btn btn-success btn-lg"
              >
                Explore Products
                <i className="bi bi-arrow-right ms-2"></i>
              </a>

              <a
                href="#store-about"
                className="btn btn-outline-dark btn-lg"
              >
                Learn More
              </a>
            </div>

            <div className="hero-highlights">
              <div>
                <i className="bi bi-check-circle-fill"></i>
                Quality Products
              </div>

              <div>
                <i className="bi bi-check-circle-fill"></i>
                Trusted Suppliers
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1563636619-e9143da7973b?w=1000"
                alt="Fresh milk"
                className="hero-image"
              />

              <div className="hero-floating-card">
                <i className="bi bi-droplet-fill"></i>
                <div>
                  <strong>Fresh Every Day</strong>
                  <small>Quality you can trust</small>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default StorefrontHero;
