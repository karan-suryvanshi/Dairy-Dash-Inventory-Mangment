import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  createCategory,
  updateCategory,
  clearCategoryError,
} from "../../features/categories/categorySlice";

function CategoryFormModal({ show, onClose, category }) {
  const dispatch = useDispatch();

  const { saving, error } = useSelector((state) => state.categories);

  const isEditMode = Boolean(category);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    active: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show) {
      setFormData({
        name: category?.name || "",

        description: category?.description || "",

        active: category?.active ?? true,
      });

      setErrors({});

      dispatch(clearCategoryError());
    }
  }, [show, category, dispatch]);

  if (!show) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,

      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    const trimmedName = formData.name.trim();

    if (!trimmedName) {
      newErrors.name = "Category name is required.";
    } else if (trimmedName.length > 100) {
      newErrors.name = "Maximum 100 characters allowed.";
    }

    if (formData.description.length > 500) {
      newErrors.description = "Maximum 500 characters allowed.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const categoryData = {
      name: formData.name.trim(),

      description: formData.description.trim(),

      active: formData.active,
    };

    try {
      if (isEditMode) {
        await dispatch(
          updateCategory({
            id: category.id,

            categoryData,
          }),
        ).unwrap();
      } else {
        await dispatch(createCategory(categoryData)).unwrap();
      }

      onClose();
    } catch (error) {
      console.error("Category save failed:", error);
    }
  };

  return (
    <div
      className="dd-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <div
        className="dd-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-modal-title"
      >
        <form onSubmit={handleSubmit}>
          {/* Modal Header */}

          <div className="dd-modal-header">
            <div>
              <h5 className="mb-1" id="category-modal-title">
                {isEditMode ? "Edit Category" : "Add New Category"}
              </h5>

              <p className="mb-0 small text-secondary">
                {isEditMode
                  ? "Update category information."
                  : "Create a new product category."}
              </p>
            </div>

            <button
              type="button"
              className="dd-modal-close"
              onClick={onClose}
              disabled={saving}
              aria-label="Close"
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>

          {/* Modal Body */}

          <div className="dd-modal-body">
            {error && (
              <div className="alert alert-danger py-2 small">{error}</div>
            )}

            {/* Category Name */}

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Category Name
                <span className="text-danger"> *</span>
              </label>

              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter category name"
                value={formData.name}
                onChange={handleChange}
                maxLength={100}
                disabled={saving}
              />

              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}

              <div className="text-end text-secondary small mt-1">
                {formData.name.length}/100
              </div>
            </div>

            {/* Description */}

            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>

              <textarea
                name="description"
                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                rows="4"
                placeholder="Enter category description"
                value={formData.description}
                onChange={handleChange}
                maxLength={500}
                disabled={saving}
              />

              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}

              <div className="text-end text-secondary small mt-1">
                {formData.description.length}/500
              </div>
            </div>

            {/* Active Status */}

            <div className="dd-status-control">
              <div>
                <div className="fw-semibold">Category Status</div>

                <div className="small text-secondary">
                  Enable or disable this category.
                </div>
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                  disabled={saving}
                  id="categoryActive"
                />

                <label
                  className="form-check-label small fw-semibold"
                  htmlFor="categoryActive"
                >
                  {formData.active ? "Active" : "Inactive"}
                </label>
              </div>
            </div>
          </div>

          {/* Modal Footer */}

          <div className="dd-modal-footer">
            <button
              type="button"
              className="btn btn-light border"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-dd-primary"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-lg me-2" />
                  {isEditMode ? "Update Category" : "Save Category"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryFormModal;
