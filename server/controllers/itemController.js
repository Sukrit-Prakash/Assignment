// controllers/itemController.js
const axios    = require('axios');
const Wishlist = require('../models/Wishlist');

async function logActivity(wishlist, user, action, itemId) {
  wishlist.activities.push({ user, action, itemId });
  await wishlist.save();
  return wishlist.activities[wishlist.activities.length-1];
}

exports.addItem = async (req, res) => {
  const { productId } = req.body;
  const w = await Wishlist.findById(req.params.wishlistId);
  if (!w) return res.status(404).json({ msg: 'Wishlist not found' });
  // fetch dummyjson
  const { data } = await axios.get(`https://dummyjson.com/products/${productId}`);
  const item = { product: data, addedBy: req.user._id };
  w.items.push(item);
  const saved = await w.save();
  const newItem = saved.items[saved.items.length-1];
  const activity = await logActivity(w, req.user._id, 'item_added', newItem._id);
  // emit via socket.io
  req.app.get('io').to(w._id.toString()).emit('wishlistActivity', activity);
  res.json(newItem);
};

exports.updateItem = async (req, res) => {
  const { wishlistId, itemId } = req.params;
  const w = await Wishlist.findById(wishlistId);
  if (!w) return res.status(404).json({ msg: 'Wishlist not found' });
  const item = w.items.id(itemId);
  if (!item) return res.status(404).json({ msg: 'Item not found' });
  Object.assign(item, req.body, { editedBy: req.user._id });
  await w.save();
  const activity = await logActivity(w, req.user._id, 'item_edited', item._id);
  req.app.get('io').to(w._id.toString()).emit('wishlistActivity', activity);
  res.json(item);
};

exports.deleteItem = async (req, res) => {
  const { wishlistId, itemId } = req.params;
  const w = await Wishlist.findById(wishlistId);
  if (!w) return res.status(404).json({ msg: 'Wishlist not found' });
  w.items.id(itemId).remove();
  await w.save();
  const activity = await logActivity(w, req.user._id, 'item_removed', itemId);
  req.app.get('io').to(w._id.toString()).emit('wishlistActivity', activity);
  res.json({ msg: 'Removed' });
};

exports.getItem = async (req, res) => {
  const w = await Wishlist.findById(req.params.wishlistId);
  const item = w?.items.id(req.params.itemId);
  if (!item) return res.status(404).json({ msg: 'Not found' });
  res.json(item);
};
