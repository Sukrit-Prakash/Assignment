import { useState } from 'react';
import api from '../api';

export default function AddItemForm({ wishlistId, onAdd }) {
  const [productId, setProductId] = useState('');

  const add = async () => {
    // backend will fetch from https://dummyjson.com/products/{productId}
    const res = await api.post(`/wishlists/${wishlistId}/items`, { productId });
    onAdd(res.data);
    setProductId('');
  };

  return (
    <div>
      <input
        placeholder="DummyJSON product ID"
        value={productId}
        onChange={e => setProductId(e.target.value)}
        type="number"
      />
      <button onClick={add}>Add Item</button>
    </div>
  );
}
