import React, { useEffect, useState } from "react";
import "./OrderHistory.css"; // Optional styling

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="order-history-container">
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No previous orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h3>Order #{index + 1}</h3>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Name:</strong> {order.userInfo.name}</p>
            <p><strong>Address:</strong> {order.userInfo.address}</p>
            <p><strong>Payment:</strong> {order.userInfo.paymentMethod}</p>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} - ${item.price} × {item.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;




