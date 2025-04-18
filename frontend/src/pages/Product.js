import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import "./Product.css"; // Make sure to include the CSS file

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5001/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.log("Error fetching product details", error));
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="product-container">
      {product ? (
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>

          {/* Image Display */}
          <img
            src={product.imageUrl.startsWith("http") ? product.imageUrl : `${process.env.PUBLIC_URL}${product.imageUrl}`}
            alt={product.name}
            className="product-image"
            style={{ maxWidth: '400px', marginBottom: '20px' }}
          />

          <p className="product-price">Price: ${product.price}</p>
          <p className="product-description">{product.description}</p>

          <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
            Add to Cart
          </button>

          {showSuccessMessage && (
            <div className="success-message">Item successfully added to the cart!</div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Product;









