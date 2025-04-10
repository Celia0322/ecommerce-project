import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";  // Assuming you'll add custom styling here

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {cart.map((item) => (
            <li key={item._id} className="cart-item">
              <div className="item-info">
                <p className="item-name">{item.name}</p>
                <p className="item-price">${item.price}</p>
                <p className="item-quantity">x {item.quantity}</p>
              </div>
              <button 
                className="remove-button" 
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;



