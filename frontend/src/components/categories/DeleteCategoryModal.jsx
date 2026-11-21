import { useDispatch, useSelector } from "react-redux";

import { deleteCategory } from "../../features/categories/categorySlice";

function DeleteCategoryModal({ show, category, onClose }) {
  const dispatch = useDispatch();

  const { deleting, error } = useSelector((state) => state.categories);

  if (!show || !category) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await dispatch(deleteCategory(category.id)).unwrap();

      onClose();
    } catch (error) {
      console.error("Category deletion failed:", error);
    }
  };

  return (
    <div
      className="dd-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !deleting) {
          onClose();
        }
      }}
    >
      <div
        className="dd-modal-dialog dd-delete-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-category-title"
      >
        <div className="dd-modal-body text-center p-4">
          <div className="dd-delete-icon">
            <i className="bi bi-trash3" />
          </div>

          <h5 className="fw-bold mt-3" id="delete-category-title">
            Delete Category?
          </h5>

          <p className="text-secondary mb-3">
            Are you sure you want to delete
            <strong> {category.name}</strong>?
          </p>

          <p className="small text-secondary">This action cannot be undone.</p>

          {error && (
            <div className="alert alert-danger small py-2">{error}</div>
          )}
        </div>

        <div className="dd-modal-footer justify-content-center">
          <button
            type="button"
            className="btn btn-light border"
            onClick={onClose}
            disabled={deleting}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Deleting...
              </>
            ) : (
              <>
                <i className="bi bi-trash me-2" />
                Delete Category
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCategoryModal;
