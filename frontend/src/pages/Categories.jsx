import { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchCategories,
  clearCategoryError,
} from "../features/categories/categorySlice";

import CategoryFormModal from "../components/categories/CategoryFormModal";

import DeleteCategoryModal from "../components/categories/DeleteCategoryModal";

function Categories() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.categories);

  // Search
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const [pageSize, setPageSize] = useState(5);

  // Add/Edit modal
  const [showFormModal, setShowFormModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Fetch categories when page loads
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Search and filter
  const filteredCategories = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return items.filter((category) => {
      return (
        category.name?.toLowerCase().includes(keyword) ||
        category.description?.toLowerCase().includes(keyword)
      );
    });
  }, [items, search]);

  // Pagination calculation
  const totalRecords = filteredCategories.length;

  const totalPages = Math.ceil(totalRecords / pageSize);

  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));

  const startIndex = (safeCurrentPage - 1) * pageSize;

  const currentCategories = filteredCategories.slice(
    startIndex,
    startIndex + pageSize,
  );

  // Open create modal
  const handleAdd = () => {
    dispatch(clearCategoryError());

    setSelectedCategory(null);

    setShowFormModal(true);
  };

  // Open edit modal
  const handleEdit = (category) => {
    dispatch(clearCategoryError());

    setSelectedCategory(category);

    setShowFormModal(true);
  };

  // Open delete modal
  const handleDeleteClick = (category) => {
    dispatch(clearCategoryError());

    setCategoryToDelete(category);

    setShowDeleteModal(true);
  };

  // Close form
  const closeFormModal = () => {
    setShowFormModal(false);

    setSelectedCategory(null);
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);

    setCategoryToDelete(null);
  };

  // Search handler
  const handleSearch = (event) => {
    setSearch(event.target.value);

    setCurrentPage(1);
  };

  // Page size handler
  const handlePageSize = (event) => {
    setPageSize(Number(event.target.value));

    setCurrentPage(1);
  };

  // Refresh
  const handleRefresh = () => {
    dispatch(fetchCategories());
  };

  // Date formatting
  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "--";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "--";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",

      month: "short",

      year: "numeric",
    });
  };

  return (
    <div>
      {/* Page Header */}

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h1 className="dd-page-title">Category Management</h1>

          <p className="dd-page-subtitle">
            Manage and organize your product categories.
          </p>
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-light border"
            onClick={handleRefresh}
            disabled={loading}
          >
            <i className="bi bi-arrow-clockwise me-2" />
            Refresh
          </button>

          <button
            type="button"
            className="btn btn-dd-primary"
            onClick={handleAdd}
          >
            <i className="bi bi-plus-lg me-2" />
            Add Category
          </button>
        </div>
      </div>

      {/* Summary */}

      <div className="row g-3 mb-4">
        <div className="col-sm-4">
          <div className="dd-card p-3">
            <div className="small text-secondary">Total Categories</div>

            <h3 className="fw-bold mb-0 mt-2">{items.length}</h3>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="dd-card p-3">
            <div className="small text-secondary">Active Categories</div>

            <h3 className="fw-bold text-success mb-0 mt-2">
              {items.filter((item) => item.active).length}
            </h3>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="dd-card p-3">
            <div className="small text-secondary">Inactive Categories</div>

            <h3 className="fw-bold text-secondary mb-0 mt-2">
              {items.filter((item) => !item.active).length}
            </h3>
          </div>
        </div>
      </div>

      {/* API Error */}

      {error && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span>
            <i className="bi bi-exclamation-triangle me-2" />
            {error}
          </span>

          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={handleRefresh}
          >
            Retry
          </button>
        </div>
      )}

      {/* Category Table */}

      <div className="dd-card dd-table-card">
        {/* Toolbar */}

        <div className="dd-table-toolbar">
          <div>
            <h5 className="fw-bold mb-1">All Categories</h5>

            <p className="small text-secondary mb-0">
              View and manage registered categories.
            </p>
          </div>

          <div className="dd-table-search">
            <i className="bi bi-search" />

            <input
              type="search"
              className="form-control"
              placeholder="Search categories..."
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Loading */}

        {loading && (
          <div className="text-center py-5">
            <span className="spinner-border text-success" />

            <p className="small text-secondary mt-3 mb-0">
              Loading categories...
            </p>
          </div>
        )}

        {/* Table */}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table dd-table">
              <thead>
                <tr>
                  <th>ID</th>

                  <th>Category</th>

                  <th>Description</th>

                  <th>Status</th>

                  <th>Created Date</th>

                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentCategories.map((category) => (
                  <tr key={category.id}>
                    <td>
                      <span className="text-secondary">#{category.id}</span>
                    </td>

                    <td>
                      <div className="dd-category-name">{category.name}</div>
                    </td>

                    <td>
                      <div className="dd-category-description">
                        {category.description || "No description"}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`dd-status-badge ${
                          category.active
                            ? "dd-status-active"
                            : "dd-status-inactive"
                        }`}
                      >
                        <i className="bi bi-circle-fill" />

                        {category.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>{formatDate(category.createdAt)}</td>

                    <td className="text-end">
                      <button
                        type="button"
                        className="dd-table-action"
                        title="Edit category"
                        aria-label={`Edit ${category.name}`}
                        onClick={() => handleEdit(category)}
                      >
                        <i className="bi bi-pencil" />
                      </button>

                      <button
                        type="button"
                        className="dd-table-action delete"
                        title="Delete category"
                        aria-label={`Delete ${category.name}`}
                        onClick={() => handleDeleteClick(category)}
                      >
                        <i className="bi bi-trash3" />
                      </button>
                    </td>
                  </tr>
                ))}

                {currentCategories.length === 0 && (
                  <tr>
                    <td colSpan="6" className="dd-table-empty">
                      <i className="bi bi-folder2-open fs-1 d-block mb-3" />

                      <h6 className="fw-bold">No Categories Found</h6>

                      <p className="small mb-0">
                        {search
                          ? "Try another search keyword."
                          : "Create your first product category."}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}

        {!loading && !error && (
          <div className="dd-table-pagination">
            <div className="d-flex align-items-center gap-2">
              <span className="small text-secondary">Rows per page</span>

              <select
                className="form-select form-select-sm"
                style={{ width: "75px" }}
                value={pageSize}
                onChange={handlePageSize}
              >
                <option value="5">5</option>

                <option value="10">10</option>

                <option value="20">20</option>
              </select>
            </div>

            <div className="small text-secondary">
              {totalRecords === 0
                ? "Showing 0 records"
                : `Showing ${startIndex + 1}-${Math.min(
                    startIndex + pageSize,
                    totalRecords,
                  )} of ${totalRecords}`}
            </div>

            <div className="d-flex align-items-center gap-1">
              <button
                type="button"
                className="dd-pagination-button"
                disabled={safeCurrentPage <= 1}
                onClick={() => setCurrentPage(safeCurrentPage - 1)}
                aria-label="Previous page"
              >
                <i className="bi bi-chevron-left" />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    type="button"
                    key={page}
                    className={`dd-pagination-button ${
                      safeCurrentPage === page ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                className="dd-pagination-button"
                disabled={totalPages === 0 || safeCurrentPage >= totalPages}
                onClick={() => setCurrentPage(safeCurrentPage + 1)}
                aria-label="Next page"
              >
                <i className="bi bi-chevron-right" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}

      <CategoryFormModal
        show={showFormModal}
        category={selectedCategory}
        onClose={closeFormModal}
      />

      {/* Delete Modal */}

      <DeleteCategoryModal
        show={showDeleteModal}
        category={categoryToDelete}
        onClose={closeDeleteModal}
      />
    </div>
  );
}

export default Categories;
