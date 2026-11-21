
import React from "react";

function StorefrontCategories({ categories, selectedCategory, onSelect }) {

  const categoryIcons = [
    "bi-cup-straw",
    "bi-box-seam",
    "bi-egg",
    "bi-cup-hot",
    "bi-basket"
  ];

  return (
    <section id="shop-categories" className="store-section">
      <div className="container">

        <div className="store-section-heading">
          <div>
            <span className="section-eyebrow">EXPLORE OUR RANGE</span>
            <h2>Shop by Category</h2>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-6 col-md-4 col-lg-2">
            <button
              className={`category-tile ${
                selectedCategory === ""
                  ? "active"
                  : ""
              }`}
              onClick={() => onSelect("")}
            >
              <i className="bi bi-grid"></i>
              <span>All Products</span>
            </button>
          </div>

          {categories.map((category, index) => (
            <div
              className="col-6 col-md-4 col-lg-2"
              key={category.id}
            >
              <button
                className={`category-tile ${
                  selectedCategory === String(category.id)
                    ? "active"
                    : ""
                }`}
                onClick={() => onSelect(String(category.id))}
              >
                <i className={`bi ${
                  categoryIcons[index % categoryIcons.length]
                }`}></i>

                <span>{category.name}</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default StorefrontCategories;
