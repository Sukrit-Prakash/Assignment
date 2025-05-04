// src/pages/WishlistPage.js
import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../contexts/AuthContext';
import useSocket from '../hooks/useSocket';
import AddItemForm from '../components/AddItemForm';
import ItemCard from '../components/ItemCard';
import InviteFormModal from '../components/InviteFormModal';
import InviteList from '../components/InviteList';
import ActivityFeed from '../components/ActivityFeed';
import  '../styles/WishlistPage.css'; // Assuming you have a CSS file for styling

export default function WishlistPage({ params }) {
  const { user } = useContext(AuthContext);
  const wishlistId = params?.id || window.location.pathname.split('/').pop();
  const [wl, setWl] = useState(null);
  const socket = useSocket(wishlistId);

  useEffect(() => {
    api.get(`/wishlists/${wishlistId}`).then(r => setWl(r.data));
  }, [wishlistId]);

  useEffect(() => {
    if (!socket) return;
    socket.on('wishlistActivity', activity => {
      setWl(w => ({ ...w, activities: [...w.activities, activity] }));
    });
  }, [socket]);

  if (!wl) return <div className="loading">Loading…</div>;

  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <div>
          <h2 className="wishlist-title">{wl.name}</h2>
          <p className="wishlist-desc">{wl.description}</p>
        </div>
        {user && (
          <InviteFormModal
            wishlistId={wishlistId}
            onInvite={inv => setWl(w => ({ ...w, invites: [...w.invites, inv] }))}
          />
        )}
      </header>

      {wl.invites.length > 0 && (
        <section className="section invites-section">
          <h3>Invited Users</h3>
          <InviteList invites={wl.invites} />
        </section>
      )}

      <section className="section add-item-section">
        <h3>Add an Item</h3>
        <AddItemForm
          wishlistId={wishlistId}
          onAdd={item => setWl(w => ({ ...w, items: [...w.items, item] }))}
        />
      </section>

      <section className="section items-grid">
        {wl.items.map(item => (
          <ItemCard key={item._id} wishlistId={wishlistId} item={item} />
        ))}
      </section>

      <section className="section activity-section">
        <h3>Activity Feed</h3>
        <ActivityFeed activities={wl.activities} />
      </section>
    </div>
  );
}
