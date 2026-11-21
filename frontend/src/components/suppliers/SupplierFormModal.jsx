
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createSupplier,
  updateSupplier,
  clearSupplierError
} from "../../features/suppliers/supplierSlice";

import productService from "../../services/productService";

const initialForm = {
  supplierCode: "",
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  gstNumber: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  active: true,
  productIds: []
};

function SupplierFormModal({ show, onClose, supplier }) {
  const dispatch = useDispatch();

  const { saving, error } = useSelector(
    (state) => state.suppliers
  );

  const [form, setForm] = useState(initialForm);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const isEdit = Boolean(supplier);

  useEffect(() => {
    if (!show) return;

    dispatch(clearSupplierError());
    setValidationError("");

    if (supplier) {
      setForm({
        supplierCode: supplier.supplierCode || "",
        companyName: supplier.companyName || "",
        contactPerson: supplier.contactPerson || "",
        email: supplier.email || "",
        phone: supplier.phone || "",
        gstNumber: supplier.gstNumber || "",
        address: supplier.address || "",
        city: supplier.city || "",
        state: supplier.state || "",
        pincode: supplier.pincode || "",
        active: supplier.active ?? true,
        productIds: (supplier.productIds || []).map(Number)
      });
    } else {
      setForm(initialForm);
    }
  }, [show, supplier, dispatch]);

  useEffect(() => {
    if (!show) return;

    let cancelled = false;

    const loadProducts = async () => {
      try {
        setProductsLoading(true);

        const response = await productService.getAll({
          page: 0,
          size: 100
        });

        if (!cancelled) {
          setProducts(response.content || []);
        }
      } catch {
        if (!cancelled) {
          setProducts([]);
        }
      } finally {
        if (!cancelled) {
          setProductsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [show]);

  if (!show) return null;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleProductSelection = (event) => {
    const selectedIds = Array.from(
      event.target.selectedOptions,
      (option) => Number(option.value)
    );

    setForm((previous) => ({
      ...previous,
      productIds: selectedIds
    }));
  };

  const validate = () => {
    if (!form.supplierCode.trim()) {
      return "Supplier code is required.";
    }

    if (!form.companyName.trim()) {
      return "Company name is required.";
    }

    if (!form.phone.trim()) {
      return "Phone number is required.";
    }

    if (form.phone.trim().length < 7 || form.phone.trim().length > 20) {
      return "Phone number must contain 7 to 20 characters.";
    }

    if (
      form.gstNumber.trim() &&
      !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(
        form.gstNumber.trim().toUpperCase()
      )
    ) {
      return "Enter a valid GSTIN.";
    }

    if (
      form.pincode.trim() &&
      !/^[0-9]{6}$/.test(form.pincode.trim())
    ) {
      return "PIN code must contain exactly 6 digits.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const message = validate();

    if (message) {
      setValidationError(message);
      return;
    }

    setValidationError("");

    const supplierData = {
      supplierCode: form.supplierCode.trim(),
      companyName: form.companyName.trim(),
      contactPerson: form.contactPerson.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      gstNumber: form.gstNumber.trim().toUpperCase(),
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      pincode: form.pincode.trim(),
      active: form.active,

      // Always send an array of numeric IDs.
      productIds: form.productIds.map(Number)
    };

    try {
      if (isEdit) {
        await dispatch(
          updateSupplier({
            id: supplier.id,
            supplierData
          })
        ).unwrap();
      } else {
        await dispatch(createSupplier(supplierData)).unwrap();
      }

      onClose();
    } catch {
      // The backend error is displayed below.
    }
  };

  return (
    <div className="dd-modal-backdrop" onClick={onClose}>
      <div
        className="dd-form-modal dd-supplier-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="dd-modal-header">
          <div>
            <h5>{isEdit ? "Edit Supplier" : "Add Supplier"}</h5>
            <p>Enter supplier and product association details.</p>
          </div>

          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            disabled={saving}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="dd-modal-body">

            {validationError && (
              <div className="alert alert-danger">
                {validationError}
              </div>
            )}

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <h6 className="dd-form-section-title">
              Basic Information
            </h6>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Supplier Code *</label>
                <input
                  className="form-control"
                  name="supplierCode"
                  value={form.supplierCode}
                  onChange={handleChange}
                  maxLength={50}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Company Name *</label>
                <input
                  className="form-control"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  maxLength={150}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Contact Person</label>
                <input
                  className="form-control"
                  name="contactPerson"
                  value={form.contactPerson}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone *</label>
                <input
                  className="form-control"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={20}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">GSTIN</label>
                <input
                  className="form-control"
                  name="gstNumber"
                  value={form.gstNumber}
                  onChange={handleChange}
                  maxLength={15}
                  placeholder="27ABCDE1234F1Z5"
                />
              </div>
            </div>

            <hr />

            <h6 className="dd-form-section-title">
              Address Information
            </h6>

            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  name="address"
                  rows="2"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">City</label>
                <input
                  className="form-control"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">State</label>
                <input
                  className="form-control"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">PIN Code</label>
                <input
                  className="form-control"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  maxLength={6}
                />
              </div>
            </div>

            <hr />

            <h6 className="dd-form-section-title">
              Product Association
            </h6>

            <div className="mb-3">
              <label className="form-label">
                Select Products
              </label>

              <select
                multiple
                className="form-select dd-multi-select"
                value={form.productIds.map(String)}
                onChange={handleProductSelection}
                disabled={productsLoading}
              >
                {products.map((product) => (
                  <option
                    key={product.id}
                    value={product.id}
                  >
                    {product.sku} - {product.name}
                  </option>
                ))}
              </select>

              <small className="text-muted">
                Hold Ctrl (Windows) or Command (Mac) to select multiple products.
                {productsLoading ? " Loading products..." : ""}
              </small>

              {!productsLoading && products.length === 0 && (
                <div className="text-danger small mt-2">
                  No products were loaded. Check the Product API.
                </div>
              )}

              <div className="mt-2">
                <strong>Selected product IDs:</strong>{" "}
                {form.productIds.length
                  ? form.productIds.join(", ")
                  : "None"}
              </div>
            </div>

            <hr />

            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="supplierActive"
                name="active"
                checked={form.active}
                onChange={handleChange}
              />

              <label
                className="form-check-label"
                htmlFor="supplierActive"
              >
                Active Supplier
              </label>
            </div>

          </div>

          <div className="dd-modal-footer">
            <button
              type="button"
              className="btn btn-light"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-dd-primary"
              disabled={saving || productsLoading}
            >
              {saving
                ? "Saving..."
                : isEdit
                  ? "Update Supplier"
                  : "Save Supplier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SupplierFormModal;
