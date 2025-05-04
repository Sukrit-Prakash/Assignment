// src/components/ReactionList.js
import api from '../api';
import '../styles/WishlistComponents.css'; // Assuming you have a CSS file for styling

export default function ReactionList({
  wishlistId,
  itemId,
  reactions,
  onAdd,
  onRemove
}) {
  const add = async emoji => {
    const res = await api.post(
      `/wishlists/${wishlistId}/items/${itemId}/reactions`,
      { emoji }
    );
    onAdd(res.data);
  };
  const remove = async id => {
    await api.delete(
      `/wishlists/${wishlistId}/items/${itemId}/reactions/${id}`
    );
    onRemove(id);
  };

  return (
    <div className="reaction-list">
      <div className="reaction-buttons">
        {['👍','❤️','😂'].map(e => (
          <button
            key={e}
            className="reaction-btn"
            onClick={() => add(e)}
          >
            {e}
          </button>
        ))}
      </div>

      <ul className="reaction-items">
        {reactions.map(r => (
          <li key={r._id} className="reaction-item">
            <span className="reaction-emoji">{r.emoji}</span>
            <span className="reaction-user">
              by {r.user.username || r.user}
            </span>
            <button
              className="remove-reaction-btn"
              onClick={() => remove(r._id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
