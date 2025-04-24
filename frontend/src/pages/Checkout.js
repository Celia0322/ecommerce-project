import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const { cart, checkout } = useContext(CartContext);

  // Store user information from the form
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    paymentMethod: "Credit Card",
  });

  // Store the order summary after checkout
  const [orderSummary, setOrderSummary] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const order = {
      items: [...cart],
      userInfo: { ...userInfo },
      date: new Date().toLocaleString(),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
  
    setOrderSummary(order);
    checkout(userInfo);
  
    // ✅ Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
  };  

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      {orderSummary ? (
        // Show order confirmation after checkout
        <div className="order-confirmation">
          <h2>Thank you for your order, {orderSummary.userInfo.name}!</h2>
          <p>Order placed at: {orderSummary.date}</p>

          <h3>Order Details:</h3>
          <ul>
            {orderSummary.items.map((item, idx) => (
              <li key={idx}>
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>

          <p><strong>Total:</strong> ${orderSummary.total.toFixed(2)}</p>
          <p>Shipping to: {orderSummary.userInfo.address}</p>
          <p>Payment method: {orderSummary.userInfo.paymentMethod}</p>
        </div>
      ) : cart.length === 0 ? (
        // If cart is empty and no order has been made
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        // Show form and order summary before checkout
        <div>
          <h2 className="order-summary">Order Summary</h2>
          <ul className="order-summary-list">
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>

          <h2 className="checkout-details">Enter Your Details</h2>
          <form onSubmit={handleSubmit} className="checkout-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                required
                className="checkout-input"
              />
            </label>
            <br />

            <label>
              Address:
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
                required
                className="checkout-input"
              />
            </label>
            <br />

            <label>
              Payment Method:
              <select
                name="paymentMethod"
                value={userInfo.paymentMethod}
                onChange={handleChange}
                className="checkout-select"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </label>
            <br />

            <button type="submit" className="checkout-btn">Confirm Purchase</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;









