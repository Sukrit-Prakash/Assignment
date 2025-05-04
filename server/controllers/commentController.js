// controllers/commentController.js
const Wishlist = require('../models/Wishlist');

async function log(w, user, action, itemId) {
  w.activities.push({ user, action, itemId });
  await w.save();
  return w.activities[w.activities.length-1];
}

exports.addComment = async (req, res) => {
  const { wishlistId, itemId } = req.params;
  const w = await Wishlist.findById(wishlistId);
  const item = w?.items.id(itemId);
  if (!item) return res.status(404).json({ msg: 'Not found' });
  const c = { user: req.user._id, text: req.body.text };
  item.comments.push(c);
  await w.save();
  const activity = await log(w, req.user._id, 'item_commented', itemId);
  req.app.get('io').to(w._id.toString()).emit('wishlistActivity', activity);
  res.json(item.comments[item.comments.length-1]);
};

exports.deleteComment = async (req, res) => {
  const { wishlistId, itemId, commentId } = req.params;
  const w = await Wishlist.findById(wishlistId);
  const item = w?.items.id(itemId);
  const comment = item?.comments.id(commentId);
  if (!comment || comment.user.toString() !== req.user._id.toString())
    return res.status(403).json({ msg: 'Not allowed' });
  comment.remove();
  await w.save();
  const activity = await log(w, req.user._id, 'comment_deleted', itemId);
  req.app.get('io').to(w._id.toString()).emit('wishlistActivity', activity);
  res.json({ msg: 'Comment removed' });
};
