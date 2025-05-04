// src/components/CommentList.js
import '../styles/WishlistComponents.css'; // Assuming you have a CSS file for styling
export default function CommentList({ comments }) {
  return (
    <ul className="comment-list">
      {console.log(comments)}
      {comments.map(c => (
        <li key={c._id} className="comment-item">
          <span className="comment-user">
            {c.user.username}:
          </span>
          <span className="comment-text">{c.text}</span>
        </li>
      ))}
    </ul>
  );
}
