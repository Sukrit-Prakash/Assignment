import { useState, useEffect, useContext } from 'react';
import api from '../api';
import WishlistCard from '../components/WishlistCard';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/WishlistsPage.css';
export default function WishlistsPage() {
  const [lists, setLists] = useState([]);
  const [name, setName] = useState('');
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    api.get('/wishlists').then(r => setLists(r.data));
  }, []);

  const create = async () => {
    const res = await api.post('/wishlists', { name });
    nav(`/wishlists/${res.data._id}`);
  };

  return (
    <div>
      <h2>Your Wishlists</h2>
      <input
        placeholder="New wishlist name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={create}>Create</button>
      <ul>
        {lists.map(w => (
          <WishlistCard key={w._id} wishlist={w} />
        ))}
      </ul>
    </div>
  );
}
