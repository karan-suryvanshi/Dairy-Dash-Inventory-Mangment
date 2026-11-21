
import React from "react";

function CheckoutOrderSummary({ items, subtotal }) {
  const deliveryCharge = 0;
  const tax = 0;
  const total = subtotal + deliveryCharge + tax;

  return (
    <div className="checkout-summary">

      <h4>Order Summary</h4>

      {items.map(item => (
        <div className="checkout-product" key={item.id}>
          <div>
            <strong>{item.name}</strong>
            <small>
              ₹{Number(item.price).toFixed(2)} × {item.quantity}
            </small>
          </div>

          <strong>
            ₹{(item.price * item.quantity).toFixed(2)}
          </strong>
        </div>
      ))}

      <hr />

      <div className="checkout-total-row">
        <span>Subtotal</span>
        <strong>₹{subtotal.toFixed(2)}</strong>
      </div>

      <div className="checkout-total-row">
        <span>Delivery</span>
        <strong>₹{deliveryCharge.toFixed(2)}</strong>
      </div>

      <div className="checkout-total-row">
        <span>Tax</span>
        <strong>₹{tax.toFixed(2)}</strong>
      </div>

      <hr />

      <div className="checkout-grand-total">
        <span>Total</span>
        <strong>₹{total.toFixed(2)}</strong>
      </div>

      <small className="text-muted">
        Delivery charges and applicable taxes are placeholders.
        Final amounts must be calculated by the backend.
      </small>

    </div>
  );
}

export default CheckoutOrderSummary;
