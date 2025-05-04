// src/components/CommentForm.js
import { useState } from 'react';
import api from '../api';
import '../styles/WishlistComponents.css'; // Assuming you have a CSS file for styling

export default function CommentForm({ wishlistId, itemId, onComment }) {
  const [text, setText] = useState('');
  const send = async () => {
    if (!text.trim()) return;
    const res = await api.post(
      `/wishlists/${wishlistId}/items/${itemId}/comments`,
      { text }
    );
    onComment(res.data);
    setText('');
  };

  return (
    <div className="comment-form">
      <input
        className="comment-input"
        placeholder="Add a comment..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button className="comment-btn" onClick={send}>
        Comment
      </button>
    </div>
  );
}
