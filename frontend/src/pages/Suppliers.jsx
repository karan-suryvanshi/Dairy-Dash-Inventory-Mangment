
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSuppliers,
  clearSupplierError
} from "../features/suppliers/supplierSlice";

import SupplierFormModal from "../components/suppliers/SupplierFormModal";
import DeleteSupplierModal from "../components/suppliers/DeleteSupplierModal";

function Suppliers() {
  const dispatch = useDispatch();

  const {
    items,
    page,
    size,
    totalElements,
    totalPages,
    loading,
    error
  } = useSelector((state) => state.suppliers);

  const [search, setSearch] = useState("");
  const [active, setActive] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const [showForm, setShowForm] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  const loadSuppliers = useCallback(
    (pageNumber = 0) => {
      const params = {
        search: search.trim(),
        page: pageNumber,
        size: pageSize
      };

      if (active !== "") {
        params.active = active;
      }

      dispatch(fetchSuppliers(params));
    },
    [dispatch, search, active, pageSize]
  );

  useEffect(() => {
    loadSuppliers(0);
  }, [loadSuppliers]);

  const handleAdd = () => {
    dispatch(clearSupplierError());
    setSelectedSupplier(null);
    setShowForm(true);
  };

  const handleEdit = (supplier) => {
    dispatch(clearSupplierError());
    setSelectedSupplier(supplier);
    setShowForm(true);
  };

  const handleDelete = (supplier) => {
    dispatch(clearSupplierError());
    setSupplierToDelete(supplier);
    setShowDelete(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedSupplier(null);
    loadSuppliers(page);
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
    setSupplierToDelete(null);
  };

  const handleDeleted = () => {
    const nextPage =
      items.length === 1 && page > 0 ? page - 1 : page;

    loadSuppliers(nextPage);
  };

  const handlePageChange = (nextPage) => {
    if (nextPage >= 0 && nextPage < totalPages) {
      loadSuppliers(nextPage);
    }
  };

  const startRecord =
    totalElements === 0 ? 0 : page * size + 1;

  const endRecord = Math.min(
    (page + 1) * size,
    totalElements
  );

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN");
  };

  return (
    <div className="dd-page">

      {/* HEADER */}
      <div className="dd-page-header">
        <div>
          <h2 className="dd-page-title">Supplier Management</h2>
          <p className="dd-page-subtitle">
            Manage supplier profiles, contact information and products.
          </p>
        </div>

        <button
          className="btn btn-dd-primary"
          onClick={handleAdd}
        >
          <i className="bi bi-plus-lg me-2" />
          Add Supplier
        </button>
      </div>

      {/* SUMMARY */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="dd-card dd-product-summary">
            <span>Total Suppliers</span>
            <h3>{totalElements}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dd-card dd-product-summary">
            <span>Suppliers on This Page</span>
            <h3>{items.length}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dd-card dd-product-summary">
            <span>Pages</span>
            <h3>{totalPages}</h3>
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="dd-table-card">

        <div className="dd-product-toolbar">

          <div className="dd-search-box">
            <i className="bi bi-search" />

            <input
              type="search"
              placeholder="Search company, code, contact or city..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

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
            <option value={100}>100 per page</option>
          </select>

        </div>

        {/* SUPPLIER TABLE */}
        <div className="table-responsive">
          <table className="table dd-data-table align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Supplier Code</th>
                <th>Company</th>
                <th>Contact Person</th>
                <th>Phone</th>
                <th>City</th>
                <th>Products</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center py-5">
                    <div className="spinner-border text-success" />
                    <p className="mt-2 mb-0">Loading suppliers...</p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="10">
                    <div className="alert alert-danger m-3">
                      {error}

                      <button
                        className="btn btn-sm btn-outline-danger ms-3"
                        onClick={() => loadSuppliers(page)}
                      >
                        Retry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan="10">
                    <div className="dd-empty-state">
                      <i className="bi bi-building" />
                      <h6>No Suppliers Found</h6>
                      <p>
                        Change your search or add a supplier.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                items.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>#{supplier.id}</td>

                    <td>
                      <span className="dd-product-sku">
                        {supplier.supplierCode}
                      </span>
                    </td>

                    <td>
                      <div className="dd-product-name">
                        {supplier.companyName}
                      </div>
                      <small className="text-muted">
                        {supplier.email || "No email"}
                      </small>
                    </td>

                    <td>{supplier.contactPerson || "—"}</td>

                    <td>{supplier.phone}</td>

                    <td>{supplier.city || "—"}</td>

                    <td>
                      <span className="dd-product-count">
                        {(supplier.productNames || []).length}
                      </span>
                      <small className="text-muted ms-1">
                        associated
                      </small>
                    </td>

                    <td>
                      <span
                        className={
                          supplier.active
                            ? "dd-status-badge dd-status-active"
                            : "dd-status-badge dd-status-inactive"
                        }
                      >
                        {supplier.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>{formatDate(supplier.createdAt)}</td>

                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="dd-action-button"
                          title="Edit supplier"
                          onClick={() => handleEdit(supplier)}
                        >
                          <i className="bi bi-pencil-square" />
                        </button>

                        <button
                          className="dd-action-button dd-action-danger"
                          title="Delete supplier"
                          onClick={() => handleDelete(supplier)}
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
            Showing {startRecord}–{endRecord} of {totalElements} suppliers
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

      <SupplierFormModal
        show={showForm}
        supplier={selectedSupplier}
        onClose={handleFormClose}
      />

      <DeleteSupplierModal
        show={showDelete}
        supplier={supplierToDelete}
        onClose={handleDeleteClose}
        onDeleted={handleDeleted}
      />

    </div>
  );
}

export default Suppliers;
