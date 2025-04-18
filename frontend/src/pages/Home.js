import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/products") // Update to your VM IP in production
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="home-container">
      {/* Title */}
      <h1 className="home-title">Products</h1>

      {/* Product Grid */}
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img
              src={product.imageUrl.startsWith('http') ? product.imageUrl : `${process.env.PUBLIC_URL}${product.imageUrl}`}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <Link to={`/product/${product._id}`} className="details-link">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;



















