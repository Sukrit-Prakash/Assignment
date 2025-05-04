import { Link } from 'react-router-dom';

export default function WishlistCard({ wishlist }) {
  return (
    <div className="wishlist-card-container">
      <div className="wishlist-card-header">
        <h2 className="wishlist-card-title">{wishlist.name}</h2>
        <div className="wishlist-card-actions">
          <Link
            to={`/wishlists/${wishlist._id}`}
            className="btn btn-primary"
          >
            View
          </Link>
        </div>
      </div>
      <p className="wishlist-description">{wishlist.description}</p>
      <div className="wishlist-stats">
        {/* {console.log(wishlist)} */}
        <span>{wishlist.items?.length || 0} items</span>
        <span>{wishlist.members?.length || 0} followers</span>
      </div>
    </div>
  );
}
