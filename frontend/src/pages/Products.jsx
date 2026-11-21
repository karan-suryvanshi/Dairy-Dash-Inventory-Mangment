import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProducts,
  clearProductError,
} from "../features/products/productSlice";

import { fetchCategories } from "../features/categories/categorySlice";

import ProductFormModal from "../components/products/ProductFormModal";
import DeleteProductModal from "../components/products/DeleteProductModal";

function Products() {
  const dispatch = useDispatch();

  const { items, page, size, totalElements, totalPages, loading, error } =
    useSelector((state) => state.products);

  const { items: categories } = useSelector((state) => state.categories);

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [direction, setDirection] = useState("desc");
  const [pageSize, setPageSize] = useState(10);

  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteProductItem, setDeleteProductItem] = useState(null);

  const loadProducts = useCallback(
    (pageNumber = 0) => {
      const params = {
        search: search.trim(),
        page: pageNumber,
        size: pageSize,
        sortBy,
        direction,
      };

      if (categoryId) {
        params.categoryId = Number(categoryId);
      }

      if (active !== "") {
        params.active = active;
      }

      dispatch(fetchProducts(params));
    },
    [dispatch, search, categoryId, active, pageSize, sortBy, direction],
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    loadProducts(0);
  }, [loadProducts]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = (product) => {
    dispatch(clearProductError());
    setDeleteProductItem(product);
    setShowDelete(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedProduct(null);
    loadProducts(page);
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
    setDeleteProductItem(null);
  };

  const handleDeleted = () => {
    const nextPage = items.length === 1 && page > 0 ? page - 1 : page;

    loadProducts(nextPage);
  };

  const handlePageChange = (nextPage) => {
    if (nextPage >= 0 && nextPage < totalPages) {
      loadProducts(nextPage);
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setDirection((previous) => (previous === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setDirection("asc");
    }
  };

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN");
  };

  const startRecord = totalElements === 0 ? 0 : page * size + 1;

  const endRecord = Math.min((page + 1) * size, totalElements);

  return (
    <div className="dd-page">
      {/* PAGE HEADER */}
      <div className="dd-page-header">
        <div>
          <h2 className="dd-page-title">Product Management</h2>
          <p className="dd-page-subtitle">
            Manage dairy products, prices, categories and availability.
          </p>
        </div>

        <button className="btn btn-dd-primary" onClick={handleAdd}>
          <i className="bi bi-plus-lg me-2" />
          Add Product
        </button>
      </div>

      {/* SUMMARY */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="dd-card dd-product-summary">
            <span>Total Products</span>
            <h3>{totalElements}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dd-card dd-product-summary">
            <span>Products on This Page</span>
            <h3>{items.length}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dd-card dd-product-summary">
            <span>Categories Available</span>
            <h3>{categories.length}</h3>
          </div>
        </div>
      </div>

      {/* FILTER TOOLBAR */}
      <div className="dd-table-card">
        <div className="dd-product-toolbar">
          <div className="dd-search-box">
            <i className="bi bi-search" />

            <input
              type="text"
              placeholder="Search by product name or SKU..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <select
            className="form-select"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
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
            value={active}
            onChange={(event) => setActive(event.target.value)}
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <select
            className="form-select"
            value={pageSize}
            onChange={(event) => setPageSize(Number(event.target.value))}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table dd-data-table align-middle">
            <thead>
              <tr>
                <th>ID</th>

                <th>
                  <button
                    className="dd-sort-button"
                    onClick={() => handleSort("sku")}
                  >
                    SKU
                  </button>
                </th>

                <th>
                  <button
                    className="dd-sort-button"
                    onClick={() => handleSort("name")}
                  >
                    Product
                  </button>
                </th>

                <th>Category</th>

                <th>
                  <button
                    className="dd-sort-button"
                    onClick={() => handleSort("price")}
                  >
                    Price
                  </button>
                </th>

                <th>Unit</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-5">
                    <div className="spinner-border text-success" />
                    <p className="mt-2 mb-0">Loading products...</p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="9">
                    <div className="alert alert-danger m-3">
                      {error}

                      <button
                        className="btn btn-sm btn-outline-danger ms-3"
                        onClick={() => loadProducts(page)}
                      >
                        Retry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan="9">
                    <div className="dd-empty-state">
                      <i className="bi bi-box-seam" />
                      <h6>No Products Found</h6>
                      <p>Try changing your filters or add a new product.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                items.map((product) => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>

                    <td>
                      <span className="dd-product-sku">{product.sku}</span>
                    </td>

                    <td>
                      <div className="dd-product-name">{product.name}</div>
                      <small className="text-muted">
                        {product.description || "No description"}
                      </small>
                    </td>

                    <td>{product.categoryName || "—"}</td>

                    <td className="fw-semibold">
                      {formatPrice(product.price)}
                    </td>

                    <td>{product.unit || "—"}</td>

                    <td>
                      <span
                        className={
                          product.active
                            ? "dd-status-badge dd-status-active"
                            : "dd-status-badge dd-status-inactive"
                        }
                      >
                        {product.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>{formatDate(product.createdAt)}</td>

                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="dd-action-button"
                          title="Edit product"
                          onClick={() => handleEdit(product)}
                        >
                          <i className="bi bi-pencil-square" />
                        </button>

                        <button
                          className="dd-action-button dd-action-danger"
                          title="Delete product"
                          onClick={() => handleDelete(product)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="dd-pagination">
          <span>
            Showing {startRecord}–{endRecord} of {totalElements} products
          </span>

          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={page === 0 || loading}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>

            <span className="dd-page-number">
              Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
            </span>

            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={page >= totalPages - 1 || loading}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <ProductFormModal
        show={showForm}
        onClose={handleFormClose}
        product={selectedProduct}
      />

      <DeleteProductModal
        show={showDelete}
        onClose={handleDeleteClose}
        product={deleteProductItem}
        onDeleted={handleDeleted}
      />
    </div>
  );
}

export default Products;
