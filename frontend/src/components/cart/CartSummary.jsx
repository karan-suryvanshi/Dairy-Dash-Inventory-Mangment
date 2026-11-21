
import React from "react";

function CartSummary({ subtotal, onClearCart, onCheckout }) {

  return (
    <div className="cart-summary">

      <h4>Order Summary</h4>

      <div className="summary-row">
        <span>Subtotal</span>
        <strong>₹{subtotal.toFixed(2)}</strong>
      </div>

      <div className="summary-row">
        <span>Delivery Charges</span>
        <span>Calculated at checkout</span>
      </div>

      <hr />

      <div className="summary-total">
        <span>Estimated Total</span>
        <strong>₹{subtotal.toFixed(2)}</strong>
      </div>

      <button
        className="btn btn-success w-100 mt-4"
        onClick={onCheckout}
      >
        Proceed to Checkout
        <i className="bi bi-arrow-right ms-2"></i>
      </button>

      <button
        className="btn btn-outline-danger w-100 mt-2"
        onClick={onClearCart}
      >
        Clear Cart
      </button>

    </div>
  );
}

export default CartSummary;
