
import React from "react";

function CustomerInformation({ register, errors }) {
  return (
    <div className="checkout-card">
      <div className="checkout-card-heading">
        <span className="checkout-step-number">1</span>
        <div>
          <h4>Customer Information</h4>
          <p>Enter your contact details</p>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Full Name *</label>
          <input
            className="form-control"
            placeholder="Enter your full name"
            {...register("customerName")}
          />
          {errors.customerName && (
            <small className="text-danger">
              {errors.customerName.message}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Email Address *</label>
          <input
            type="email"
            className="form-control"
            placeholder="example@email.com"
            {...register("email")}
          />
          {errors.email && (
            <small className="text-danger">
              {errors.email.message}
            </small>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Mobile Number *</label>
          <input
            type="tel"
            className="form-control"
            placeholder="10-digit mobile number"
            {...register("phone")}
          />
          {errors.phone && (
            <small className="text-danger">
              {errors.phone.message}
            </small>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerInformation;
