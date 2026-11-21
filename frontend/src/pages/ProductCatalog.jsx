
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import productService from "../services/productService";
import { fetchCategories } from "../features/categories/categorySlice";
import ProductDetailsModal from "../components/products/ProductDetailsModal";

function ProductCatalog() {
  const dispatch = useDispatch();

  const { items: categories } = useSelector(
    (state) => state.categories
  );

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const loadCatalog = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        size: pageSize,
        sortBy: "name",
        direction: "asc"
      };

      if (search.trim()) {
        params.search = search.trim();
      }

      if (categoryId) {
        params.categoryId = Number(categoryId);
      }

      const response = await productService.getCatalog(params);

      setProducts(response.content || []);
      setTotalPages(response.totalPages ?? 0);
      setTotalElements(response.totalElements ?? 0);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load the product catalogue."
      );
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, categoryId]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  const openDetails = (productId) => {
    setSelectedProductId(productId);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedProductId(null);
  };

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2
    });

  return (
    <div className="dd-catalog-page">

      <section className="dd-catalog-banner">
        <div>
          <span className="dd-catalog-eyebrow">
            FRESHNESS • QUALITY • TRUST
          </span>

          <h1>Explore Our Dairy Products</h1>

          <p>
            Discover quality dairy products for your everyday needs.
          </p>
        </div>

        <div className="dd-catalog-banner-icon">
          <i className="bi bi-basket2" />
        </div>
      </section>

      <div className="dd-catalog-heading">
        <div>
          <h2>Our Products</h2>
          <p>
            {totalElements} active products available
          </p>
        </div>
      </div>

      <div className="dd-catalog-filters">
        <div className="dd-search-box">
          <i className="bi bi-search" />

          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(0);
            }}
          />
        </div>

        <select
          className="form-select"
          value={categoryId}
          onChange={(event) => {
            setCategoryId(event.target.value);
            setPage(0);
          }}
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          className="form-select"
          value={pageSize}
          onChange={(event) => {
            setPageSize(Number(event.target.value));
            setPage(0);
          }}
        >
          <option value={12}>12 products</option>
          <option value={24}>24 products</option>
          <option value={48}>48 products</option>
        </select>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
          <button
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={loadCatalog}
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" />
          <p className="mt-2">Loading catalogue...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="dd-empty-state dd-catalog-empty">
          <i className="bi bi-basket" />
          <h6>No Products Available</h6>
          <p>Try another search or category.</p>
        </div>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <div
              className="col-12 col-sm-6 col-lg-4 col-xl-3"
              key={product.id}
            >
              <article className="dd-catalog-card">

                <div className="dd-catalog-image-wrap">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="dd-catalog-image"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                        event.currentTarget.nextElementSibling.style.display = "flex";
                      }}
                    />
                  ) : null}

                  <div
                    className="dd-catalog-image-placeholder"
                    style={{
                      display: product.imageUrl ? "none" : "flex"
                    }}
                  >
                    <i className="bi bi-box-seam" />
                  </div>

                  <span className="dd-catalog-category">
                    {product.categoryName || "Dairy Product"}
                  </span>
                </div>

                <div className="dd-catalog-card-body">
                  <small className="text-muted">
                    {product.brand || "DairyDash Selection"}
                  </small>

                  <h5>{product.name}</h5>

                  <p>
                    {product.description || "Quality dairy product."}
                  </p>

                  <div className="dd-catalog-card-footer">
                    <div>
                      <strong>{formatPrice(product.price)}</strong>
                      <small>/ {product.unit}</small>
                    </div>

                    <button
                      className="btn btn-dd-primary btn-sm"
                      onClick={() => openDetails(product.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>

              </article>
            </div>
          ))}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="dd-catalog-pagination">
          <button
            className="btn btn-outline-secondary"
            disabled={page === 0}
            onClick={() => setPage((previous) => previous - 1)}
          >
            Previous
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>

          <button
            className="btn btn-outline-secondary"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((previous) => previous + 1)}
          >
            Next
          </button>
        </div>
      )}

      <ProductDetailsModal
        show={showDetails}
        productId={selectedProductId}
        onClose={closeDetails}
      />

    </div>
  );
}

export default ProductCatalog;
