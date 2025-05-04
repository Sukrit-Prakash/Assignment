import { useState } from 'react';
import api from '../api';

export default function InviteFormModal({ wishlistId, onInvite }) {
  const [email, setEmail] = useState('');
  const send = async () => {
    await api.post(`/wishlists/${wishlistId}/invite`, { email });
    onInvite({ email, status: 'pending' });
    setEmail('');
  };
  return (
    <div>
      <input
        placeholder="Invite email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={send}>Invite</button>
    </div>
  );
}
