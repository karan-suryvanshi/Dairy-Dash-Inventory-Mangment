
import { useDispatch, useSelector } from "react-redux";
import { deleteSupplier } from "../../features/suppliers/supplierSlice";

function DeleteSupplierModal({ show, supplier, onClose, onDeleted }) {
  const dispatch = useDispatch();

  const { deleting, error } = useSelector(
    (state) => state.suppliers
  );

  if (!show || !supplier) return null;

  const handleDelete = async () => {
    try {
      await dispatch(deleteSupplier(supplier.id)).unwrap();
      onDeleted();
      onClose();
    } catch {
      // Display the backend error.
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

        <h5>Delete Supplier?</h5>

        <p>
          Are you sure you want to delete{" "}
          <strong>{supplier.companyName}</strong>?
        </p>

        {error && (
          <div className="alert alert-danger text-start">
            {error}
          </div>
        )}

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
            {deleting ? "Deleting..." : "Delete Supplier"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteSupplierModal;
