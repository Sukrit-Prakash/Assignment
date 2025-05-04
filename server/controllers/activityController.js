// controllers/activityController.js
const Wishlist = require('../models/Wishlist');

exports.getActivities = async (req, res) => {
  const w = await Wishlist.findById(req.params.wishlistId)
    .populate('activities.user');
  if (!w) return res.status(404).json({ msg: 'Not found' });
  res.json(w.activities);
};
