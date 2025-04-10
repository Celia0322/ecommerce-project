import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Log to check if product._id is being passed correctly
      console.log("Adding to cart:", product);
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        // If the item exists, increase its quantity
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // If the item doesn't exist, add it to the cart with quantity 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    console.log("Cart after removing:", cart);
  };

  const checkout = async (userInfo) => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5001/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInfo, items: cart }),
      });
  
      if (!response.ok) {
        throw new Error("Checkout failed");
      }
  
      alert("Order placed successfully!");
      setCart([]); // Clear cart after checkout
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};






