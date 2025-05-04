// controllers/reactionController.js
const Wishlist = require('../models/Wishlist');

async function log(w, user, action, itemId) {
  w.activities.push({ user, action, itemId });
  await w.save();
  return w.activities[w.activities.length-1];
}

exports.addReaction = async (req, res) => {
  const { wishlistId, itemId } = req.params;
  const w = await Wishlist.findById(wishlistId);
  const item = w?.items.id(itemId);
  if (!item) return res.status(404).json({ msg: 'Not found' });
  const r = { user: req.user._id, emoji: req.body.emoji };
  item.reactions.push(r);
  await w.save();
  const activity = await log(w, req.user._id, 'reaction_added', itemId);
  req.app.get('io').to(w._id.toString()).emit('wishlistActivity', activity);
  res.json(item.reactions[item.reactions.length-1]);
};

exports.deleteReaction = async (req, res) => {
  const { wishlistId, itemId, reactionId } = req.params;
  const w = await Wishlist.findById(wishlistId);
  const item = w?.items.id(itemId);
  const reaction = item?.reactions.id(reactionId);
  if (!reaction || reaction.user.toString() !== req.user._id.toString())
    return res.status(403).json({ msg: 'Not allowed' });
  reaction.remove();
  await w.save();
  const activity = await log(w, req.user._id, 'reaction_removed', itemId);
  req.app.get('io').to(w._id.toString()).emit('wishlistActivity', activity);
  res.json({ msg: 'Reaction removed' });
};
