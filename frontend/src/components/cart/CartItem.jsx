
import React from "react";

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove
}) {
  return (
    <div className="cart-item">

      <div className="cart-item-image">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} />
        ) : (
          <i className="bi bi-box-seam"></i>
        )}
      </div>

      <div className="cart-item-details">

        <h5>{item.name}</h5>

        <small>{item.categoryName || "Dairy Product"}</small>

        <p>₹{Number(item.price).toFixed(2)} / {item.unit}</p>

      </div>

      <div className="cart-quantity-control">

        <button onClick={onDecrease} aria-label="Decrease quantity">
          <i className="bi bi-dash"></i>
        </button>

        <span>{item.quantity}</span>

        <button onClick={onIncrease} aria-label="Increase quantity">
          <i className="bi bi-plus"></i>
        </button>

      </div>

      <div className="cart-item-total">
        <strong>
          ₹{(item.price * item.quantity).toFixed(2)}
        </strong>

        <button
          className="cart-remove-btn"
          onClick={onRemove}
        >
          <i className="bi bi-trash"></i>
          Remove
        </button>
      </div>

    </div>
  );
}

export default CartItem;
