// src/components/ItemCard.js
import { useState } from 'react';
import api from '../api';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import ReactionList from './ReactionList';
import '../styles/ItemCard.css'; // Assuming you have a CSS file for styling

export default function ItemCard({ wishlistId, item }) {
  {console.log(item)}
  const [comments, setComments] = useState(item.comments);
  const [reactions, setReactions] = useState(item.reactions);

  const del = async () => {
    await api.delete(`/wishlists/${wishlistId}/items/${item._id}`);
    alert('Item deleted!');
    // Ideally notify parent to remove
  };

  return (
    <div className="item-card">
      <div className="item-header">
        <img src={item.product?.thumbnail} alt={item.product.title} className="item-image" />
        <div className="item-details">
          <h4 className="item-title">{item.product?.title}</h4>
          <p className="item-price">${item.product?.price}</p>
          <p className="item-addedby">Added by: {item.addedBy?.username || item.addedBy}</p>
        </div>
        <button onClick={del} className="delete-btn">✕</button>
      </div>

      <ReactionList
        wishlistId={wishlistId}
        itemId={item._id}
        reactions={reactions}
        onAdd={r => setReactions([...reactions, r])}
        onRemove={id =>
          setReactions(reactions.filter(r => r._id !== id))
        }
      />

      <CommentList comments={comments} />
      <CommentForm
        wishlistId={wishlistId}
        itemId={item._id}
        onComment={c => setComments([...comments, c])}
      />
    </div>
  );
}
