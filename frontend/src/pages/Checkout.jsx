
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomerInformation from "../components/checkout/CustomerInformation";
import DeliveryAddress from "../components/checkout/DeliveryAddress";
import PaymentMethod from "../components/checkout/PaymentMethod";
import CheckoutOrderSummary from "../components/checkout/CheckoutOrderSummary";

import "../styles/checkout.css";

const checkoutSchema = z.object({
  customerName: z.string().trim().min(3, "Enter at least 3 characters"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  address: z.string().trim().min(10, "Enter a complete delivery address"),
  city: z.string().trim().min(2, "Enter a valid city"),
  state: z.string().trim().min(2, "Enter a valid state"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
  instructions: z.string().optional(),
  paymentMethod: z.enum(["COD", "RAZORPAY"])
});

function Checkout() {

  const navigate = useNavigate();

  const items = useSelector(state => state.cart.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      instructions: "",
      paymentMethod: "COD"
    }
  });

  const onSubmit = async (data) => {

    const checkoutData = {
      customer: {
        name: data.customerName,
        email: data.email,
        phone: data.phone
      },

      deliveryAddress: {
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        instructions: data.instructions
      },

      paymentMethod: data.paymentMethod,

      items: items.map(item => ({
        productId: item.id,
        quantity: item.quantity
      })),

      displayedSubtotal: subtotal
    };

    console.log("Checkout data:", checkoutData);

    if (data.paymentMethod === "RAZORPAY") {
      alert(
        "Online payment is not connected yet. Razorpay integration will be added after backend order APIs."
      );
      return;
    }

    alert(
      "Checkout details validated successfully. Order placement will be enabled after backend integration."
    );
  };

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-cart-x fs-1 text-muted"></i>
        <h3 className="mt-3">Your cart is empty</h3>
        <Link to="/shop" className="btn btn-success mt-3">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">

      <div className="container py-5">

        <div className="checkout-heading">
          <span className="section-eyebrow">COMPLETE YOUR PURCHASE</span>
          <h2>Checkout</h2>
          <p>Enter your details and review your order.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="row g-4">

            <div className="col-lg-8">

              <CustomerInformation
                register={register}
                errors={errors}
              />

              <DeliveryAddress
                register={register}
                errors={errors}
              />

              <PaymentMethod
                register={register}
                errors={errors}
              />

              <div className="d-flex gap-3 mt-4 flex-wrap">

                <Link
                  to="/cart"
                  className="btn btn-outline-secondary"
                >
                  Back to Cart
                </Link>

                <button
                  type="submit"
                  className="btn btn-success flex-grow-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Continue"}
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>

              </div>

            </div>

            <div className="col-lg-4">
              <CheckoutOrderSummary
                items={items}
                subtotal={subtotal}
              />
            </div>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Checkout;
