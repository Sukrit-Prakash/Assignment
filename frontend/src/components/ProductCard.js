// src/components/ProductCard.js
import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css'; // Assuming you have a CSS file for styling

export default function ProductCard({ product }) {
  const { user } = useContext(AuthContext);
  const [wishlists, setWishlists] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (user) {
      api.get('/wishlists').then(r => setWishlists(r.data));
    }
  }, [user]);

  const addToWishlist = async (wishlistId) => {
    try {
      await api.post(`/wishlists/${wishlistId}/items`, { productId: product.id });
      setShowDropdown(false);
      alert(`Added "${product.title}" to your wishlist!`);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add to wishlist. Please try again.');
    }
  };

  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.title} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <div className="product-buttons">
          <Link to={`/products/${product.id}`} className="btn primary-btn">
            View Details
          </Link>
          {user && (
            <div className="wishlist-wrapper">
              <button onClick={() => setShowDropdown(!showDropdown)} className="btn secondary-btn">
                Add to Wishlist
              </button>
              {showDropdown && (
                <ul className="">
                  {wishlists.map(wl => (
                    <li key={wl._id}>
                      <button onClick={() => addToWishlist(wl._id)} className="dropdown-item">
                        {wl.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
