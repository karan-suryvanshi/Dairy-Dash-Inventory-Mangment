
import React, { useEffect, useState } from "react";

import StorefrontHeader from "../components/storefront/StorefrontHeader";
import StorefrontHero from "../components/storefront/StorefrontHero";
import StorefrontCategories from "../components/storefront/StorefrontCategories";
import StorefrontProductCard from "../components/storefront/StorefrontProductCard";
import StorefrontFooter from "../components/storefront/StorefrontFooter";

import ProductDetailsModal from "../components/products/ProductDetailsModal";

import productService from "../services/productService";
import categoryService from "../services/categoryService";

import "../styles/storefront.css";

function Storefront() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [search, selectedCategory, sortBy, page]);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Category loading failed", err);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await productService.getCatalog({
        search: search || undefined,
        categoryId: selectedCategory || undefined,
        page,
        size: 8,
        sortBy,
        direction: "asc"
      });

      setProducts(response.content || []);
      setTotalPages(response.totalPages || 0);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  return (
    <div className="storefront-page">

      <StorefrontHeader />

      <StorefrontHero />

      <StorefrontCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleCategorySelect}
      />

      <section id="shop-products" className="store-section">
        <div className="container">

          <div className="store-section-heading">
            <div>
              <span className="section-eyebrow">
                OUR PRODUCTS
              </span>

              <h2>Explore Our Products</h2>

              <p>
                Discover our range of quality dairy products.
              </p>
            </div>
          </div>

          <div className="store-filter-bar">

            <div className="store-search">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearch}
              />
            </div>

            <select
              className="form-select store-sort"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(0);
              }}
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="sku">Sort by SKU</option>
            </select>

          </div>

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-success"></div>
              <p className="mt-2">Loading products...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              {error}
              <button
                className="btn btn-sm btn-outline-danger ms-3"
                onClick={loadProducts}
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="row g-4">

                {products.map((product) => (
                  <div
                    className="col-sm-6 col-lg-3"
                    key={product.id}
                  >
                    <StorefrontProductCard
                      product={product}
                      onViewDetails={setSelectedProduct}
                    />
                  </div>
                ))}

              </div>

              {products.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-search fs-1 text-muted"></i>
                  <h5 className="mt-3">No products found</h5>
                  <p>Try changing your search or category.</p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="store-pagination">

                  <button
                    className="btn btn-outline-success"
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </button>

                  <span>
                    Page {page + 1} of {totalPages}
                  </span>

                  <button
                    className="btn btn-outline-success"
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>

                </div>
              )}
            </>
          )}

        </div>
      </section>

      <StorefrontFooter />

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

    </div>
  );
}

export default Storefront;
