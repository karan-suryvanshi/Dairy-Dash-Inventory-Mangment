
import React from "react";

function DeliveryAddress({ register, errors }) {
  return (
    <div className="checkout-card">
      <div className="checkout-card-heading">
        <span className="checkout-step-number">2</span>
        <div>
          <h4>Delivery Address</h4>
          <p>Where should we deliver your order?</p>
        </div>
      </div>

      <div className="row g-3">

        <div className="col-12">
          <label className="form-label">Address *</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="House number, street, area..."
            {...register("address")}
          />

          {errors.address && (
            <small className="text-danger">
              {errors.address.message}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">City *</label>
          <input
            className="form-control"
            placeholder="Enter city"
            {...register("city")}
          />

          {errors.city && (
            <small className="text-danger">
              {errors.city.message}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">State *</label>
          <input
            className="form-control"
            placeholder="Enter state"
            {...register("state")}
          />

          {errors.state && (
            <small className="text-danger">
              {errors.state.message}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">PIN Code *</label>
          <input
            className="form-control"
            placeholder="6-digit PIN code"
            maxLength="6"
            {...register("pincode")}
          />

          {errors.pincode && (
            <small className="text-danger">
              {errors.pincode.message}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Delivery Instructions</label>
          <input
            className="form-control"
            placeholder="Optional instructions"
            {...register("instructions")}
          />
        </div>

      </div>
    </div>
  );
}

export default DeliveryAddress;
