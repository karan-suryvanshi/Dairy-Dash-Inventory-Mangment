import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createProduct,
  updateProduct,
  clearProductError,
} from "../../features/products/productSlice";

const initialForm = {
  sku: "",
  name: "",
  description: "",
  price: "",
  unit: "Litre",
  active: true,
  categoryId: "",
  brand: "",
  barcode: "",
  imageUrl: "",
};

function ProductFormModal({ show, onClose, product }) {
  const dispatch = useDispatch();

  const { items: categories } = useSelector((state) => state.categories);

  const { saving, error } = useSelector((state) => state.products);

  const isEdit = Boolean(product);

  const [form, setForm] = useState(initialForm);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (!show) return;

    dispatch(clearProductError());
    setValidationError("");

    if (product) {
      setForm({
        sku: product.sku || "",
        name: product.name || "",
        description: product.description || "",
        price: product.price ?? "",
        unit: product.unit || "Litre",
        active: product.active ?? true,
        categoryId: product.categoryId ? String(product.categoryId) : "",
        brand: product.brand || "",
        barcode: product.barcode || "",
        imageUrl: product.imageUrl || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [show, product, dispatch]);

  if (!show) return null;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationError("");

    if (!form.sku.trim()) {
      setValidationError("SKU is required.");
      return;
    }

    if (!form.name.trim()) {
      setValidationError("Product name is required.");
      return;
    }

    if (form.price === "" || Number(form.price) < 0) {
      setValidationError("Enter a valid price greater than or equal to zero.");
      return;
    }

    if (!form.unit.trim()) {
      setValidationError("Unit is required.");
      return;
    }

    if (!form.categoryId) {
      setValidationError("Please select a category.");
      return;
    }

    const productData = {
      sku: form.sku.trim(),
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      unit: form.unit.trim(),
      active: form.active,
      categoryId: Number(form.categoryId),
      brand: form.brand.trim(),
      barcode: form.barcode.trim(),
      imageUrl: form.imageUrl.trim(),
    };

    try {
      if (isEdit) {
        await dispatch(
          updateProduct({
            id: product.id,
            productData,
          }),
        ).unwrap();
      } else {
        await dispatch(createProduct(productData)).unwrap();
      }

      onClose();
    } catch {
      // The Redux slice exposes the backend error.
    }
  };

  return (
    <div className="dd-modal-backdrop" onClick={onClose}>
      <div
        className="dd-form-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="dd-modal-header">
          <div>
            <h5>{isEdit ? "Edit Product" : "Add Product"}</h5>
            <p>Enter the product information below.</p>
          </div>

          <button type="button" className="btn-close" onClick={onClose} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="dd-modal-body">
            {validationError && (
              <div className="alert alert-danger">{validationError}</div>
            )}

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">SKU *</label>
                <input
                  type="text"
                  name="sku"
                  className="form-control"
                  value={form.sku}
                  onChange={handleChange}
                  maxLength={50}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  maxLength={150}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Price *</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Unit *</label>
                <select
                  name="unit"
                  className="form-select"
                  value={form.unit}
                  onChange={handleChange}
                  required
                >
                  <option value="Litre">Litre</option>
                  <option value="Kg">Kg</option>
                  <option value="Gram">Gram</option>
                  <option value="Piece">Piece</option>
                  <option value="Pack">Pack</option>
                  <option value="Box">Box</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Category *</label>
                <select
                  name="categoryId"
                  className="form-select"
                  value={form.categoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {categories.length === 0 && (
                  <small className="text-danger">
                    No categories found. Create a category first.
                  </small>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">Brand</label>
                <input
                  type="text"
                  name="brand"
                  className="form-control"
                  value={form.brand}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Barcode</label>
                <input
                  type="text"
                  name="barcode"
                  className="form-control"
                  value={form.barcode}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Product Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  className="form-control"
                  placeholder="https://example.com/product.jpg"
                  value={form.imageUrl}
                  onChange={handleChange}
                  maxLength={1000}
                />
                <small className="text-muted">
                  Enter an HTTP or HTTPS image URL.
                </small>
              </div>

              {form.imageUrl && (
                <div className="col-12">
                  <label className="form-label">Image Preview</label>
                  <div>
                    <img
                      src={form.imageUrl}
                      alt="Product preview"
                      className="dd-form-image-preview"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="col-12">
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    name="active"
                    className="form-check-input"
                    id="productActive"
                    checked={form.active}
                    onChange={handleChange}
                  />

                  <label className="form-check-label" htmlFor="productActive">
                    Active Product
                  </label>
                </div>
              </div>
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
              disabled={saving || categories.length === 0}
            >
              {saving
                ? "Saving..."
                : isEdit
                  ? "Update Product"
                  : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;
