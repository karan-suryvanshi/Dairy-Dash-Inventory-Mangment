
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} from "../features/cart/cartSlice";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

import "../styles/cart.css";

function Cart() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(state => state.cart.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">

      <div className="container py-5">

        <div className="cart-heading">
          <div>
            <span className="section-eyebrow">
              YOUR SHOPPING
            </span>
            <h2>Shopping Cart</h2>
            <p>Review and manage your selected products.</p>
          </div>

          <Link to="/shop" className="btn btn-outline-success">
            <i className="bi bi-arrow-left me-2"></i>
            Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (

          <div className="empty-cart">
            <i className="bi bi-cart-x"></i>
            <h3>Your cart is empty</h3>
            <p>Explore our products and add something fresh.</p>

            <Link to="/shop" className="btn btn-success">
              Explore Products
            </Link>
          </div>

        ) : (

          <div className="row g-4">

            <div className="col-lg-8">

              <div className="cart-items-container">

                {items.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={() =>
                      dispatch(increaseQuantity(item.id))
                    }
                    onDecrease={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                    onRemove={() =>
                      dispatch(removeFromCart(item.id))
                    }
                  />
                ))}

              </div>

            </div>

            <div className="col-lg-4">

              <CartSummary
                subtotal={subtotal}
                onClearCart={() => dispatch(clearCart())}
                onCheckout={handleCheckout}
              />

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Cart;
