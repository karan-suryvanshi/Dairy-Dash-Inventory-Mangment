
import React from "react";

function PaymentMethod({ register, errors }) {
  return (
    <div className="checkout-card">
      <div className="checkout-card-heading">
        <span className="checkout-step-number">3</span>
        <div>
          <h4>Payment Method</h4>
          <p>Select your preferred payment method</p>
        </div>
      </div>

      <div className="payment-option">
        <input
          type="radio"
          id="cod"
          value="COD"
          {...register("paymentMethod")}
        />

        <label htmlFor="cod">
          <i className="bi bi-cash-stack"></i>
          <span>
            <strong>Cash on Delivery</strong>
            <small>Pay when your order is delivered</small>
          </span>
        </label>
      </div>

      <div className="payment-option">
        <input
          type="radio"
          id="razorpay"
          value="RAZORPAY"
          {...register("paymentMethod")}
        />

        <label htmlFor="razorpay">
          <i className="bi bi-credit-card"></i>
          <span>
            <strong>Online Payment</strong>
            <small>Credit card, debit card, UPI and more</small>
          </span>
        </label>
      </div>

      {errors.paymentMethod && (
        <small className="text-danger">
          {errors.paymentMethod.message}
        </small>
      )}

      <div className="alert alert-info mt-3 mb-0">
        Online payment will be enabled after Razorpay backend
        integration. No payment is processed by this UI yet.
      </div>
    </div>
  );
}

export default PaymentMethod;
