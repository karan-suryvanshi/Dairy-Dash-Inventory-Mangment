import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

function StorefrontProductCard({ product, onViewDetails }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="store-product-card">
      <div className="store-product-image">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        <div
          className="product-image-placeholder"
          style={{
            display: product.imageUrl ? "none" : "flex",
          }}
        >
          <i className="bi bi-box-seam"></i>
        </div>

        <span className="product-status-badge">Available</span>
      </div>

      <div className="store-product-content">
        <small>{product.categoryName || "Dairy Product"}</small>

        <h5>{product.name}</h5>

        <p>{product.description || "Quality product from DairyDash"}</p>

        <div className="product-card-bottom">
          <div>
            <strong>₹{Number(product.price).toFixed(2)}</strong>
            <small> / {product.unit}</small>
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-success"
              onClick={() => onViewDetails(product)}
            >
              Details
            </button>

            <button className="btn btn-success" onClick={handleAddToCart}>
              <i className="bi bi-cart-plus me-1"></i>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StorefrontProductCard;
