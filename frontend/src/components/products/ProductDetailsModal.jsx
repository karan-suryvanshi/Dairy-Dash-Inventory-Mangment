
import { useEffect, useState } from "react";
import productService from "../../services/productService";

function ProductDetailsModal({ show, productId, onClose }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!show || !productId) return;

    let cancelled = false;

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        const data = await productService.getById(productId);

        if (!cancelled) {
          setProduct(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
            "Unable to load product details."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [show, productId]);

  if (!show) return null;

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2
    });

  return (
    <div className="dd-modal-backdrop" onClick={onClose}>
      <div
        className="dd-details-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="dd-modal-header">
          <div>
            <h5>Product Details</h5>
            <p>Complete product information</p>
          </div>

          <button
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
          />
        </div>

        <div className="dd-modal-body">
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-success" />
              <p className="mt-2">Loading product...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          {product && !loading && (
            <>
              <div className="dd-detail-hero">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="dd-detail-image"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="dd-detail-image-placeholder">
                    <i className="bi bi-box-seam" />
                  </div>
                )}

                <div>
                  <span className="dd-product-sku">
                    {product.sku}
                  </span>

                  <h4 className="mt-3">{product.name}</h4>

                  <p className="text-muted mb-2">
                    {product.brand || "Brand not specified"}
                  </p>

                  <h5 className="text-success">
                    {formatPrice(product.price)}
                    <small className="text-muted">
                      {" "}/ {product.unit}
                    </small>
                  </h5>

                  <span
                    className={
                      product.active
                        ? "dd-status-badge dd-status-active"
                        : "dd-status-badge dd-status-inactive"
                    }
                  >
                    {product.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <hr />

              <h6 className="mb-3">Product Information</h6>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="dd-detail-field">
                    <label>Product ID</label>
                    <strong>{product.id}</strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="dd-detail-field">
                    <label>SKU</label>
                    <strong>{product.sku}</strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="dd-detail-field">
                    <label>Brand</label>
                    <strong>{product.brand || "—"}</strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="dd-detail-field">
                    <label>Barcode</label>
                    <strong>{product.barcode || "—"}</strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="dd-detail-field">
                    <label>Category</label>
                    <strong>{product.categoryName || "—"}</strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="dd-detail-field">
                    <label>Unit</label>
                    <strong>{product.unit || "—"}</strong>
                  </div>
                </div>

                <div className="col-12">
                  <div className="dd-detail-field">
                    <label>Description</label>
                    <p>{product.description || "No description available."}</p>
                  </div>
                </div>

                <div className="col-12">
                  <div className="dd-detail-field">
                    <label>Image URL</label>
                    {product.imageUrl ? (
                      <a
                        href={product.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View product image
                      </a>
                    ) : (
                      <strong>Not provided</strong>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="dd-modal-footer">
          <button className="btn btn-light" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsModal;
