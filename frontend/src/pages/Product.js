import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import "./Product.css"; // Make sure to include the CSS file

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state for success message

  useEffect(() => {
    axios.get(`http://localhost:5001/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.log("Error fetching product details", error));
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart(product); // Add the product to cart
    setShowSuccessMessage(true); // Show success message
    setTimeout(() => {
      setShowSuccessMessage(false); // Hide the success message after 3 seconds
    }, 3000);
  };

  return (
    <div className="product-container">
      {product ? (
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">Price: ${product.price}</p>
          <p className="product-description">{product.description}</p>
          <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
            Add to Cart
          </button>
          {showSuccessMessage && (
            <div className="success-message">Item successfully added to the cart!</div> // Success message display
          )}
        </div>
      ) : <p>Loading...</p>}
    </div>
  );
};

export default Product;




