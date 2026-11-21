import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../features/products/productSlice";

function DeleteProductModal({ show, onClose, product, onDeleted }) {
  const dispatch = useDispatch();

  const { deleting, error } = useSelector((state) => state.products);

  if (!show || !product) return null;

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(product.id)).unwrap();
      onDeleted();
      onClose();
    } catch {
      // Display the Redux error below.
    }
  };

  return (
    <div className="dd-modal-backdrop" onClick={onClose}>
      <div
        className="dd-confirm-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="dd-confirm-icon">
          <i className="bi bi-trash3" />
        </div>

        <h5>Delete Product?</h5>

        <p>
          Are you sure you want to delete <strong>{product.name}</strong>? This
          action cannot be undone.
        </p>

        {error && <div className="alert alert-danger text-start">{error}</div>}

        <div className="d-flex justify-content-center gap-2 mt-4">
          <button
            className="btn btn-light"
            onClick={onClose}
            disabled={deleting}
          >
            Cancel
          </button>

          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;
