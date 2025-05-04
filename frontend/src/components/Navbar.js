import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-logo">
        Wishlist
      </Link>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/wishlists" className="navbar-link">
              My Wishlists
            </Link>
            <Link to="/products" className="navbar-link">
              Products
            </Link>
            <button onClick={logout} className="btn btn-secondary">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/signup" className="navbar-link">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
