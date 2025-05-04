import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function useSocket(wishlistId) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!wishlistId) return;
    const s = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');
    s.emit('joinWishlist', wishlistId);
    setSocket(s);
    return () => s.disconnect();
  }, [wishlistId]);

  return socket;
}
