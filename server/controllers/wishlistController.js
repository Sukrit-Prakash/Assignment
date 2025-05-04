// controllers/wishlistController.js
const Wishlist = require('../models/Wishlist');

exports.createWishlist = async (req, res) => {
  const { name, description } = req.body;
  const w = new Wishlist({
    name, description,
    owner: req.user._id,
    members: [req.user._id]
  });
  await w.save();
  res.json(w);
};

exports.getWishlists = async (req, res) => {
  try {
    const list = await Wishlist.find({
      $or: [
        { owner: req.user._id },
        { members: req.user._id },
        { 'invites.email': req.user.email }
      ]
    }).select('name description owner createdAt members items');
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};
// Wishlist.findById(id)
  // .populate([
  //   { path: 'owner' },
  //   { path: 'members' },
  //   { path: 'items.addedBy' },
  //   { path: 'items.editedBy' },
  //   { path: 'items.comments.user' },
  //   { path: 'items.reactions.user' },
  //   { path: 'activities.user' }
  // ])
  // .exec();

exports.getWishlist = async (req, res) => {
  const w = await Wishlist.findById(req.params.wishlistId) .populate([
    { path: 'owner' },
    { path: 'members' },
    { path: 'items.addedBy' },
    { path: 'items.editedBy' },
    { path: 'items.comments.user' },
    { path: 'items.reactions.user' },
    { path: 'activities.user' }
  ])
  .exec();
    // .populate('owner members activities.user items.addedBy items.editedBy comments.user reactions.user invites.invitedBy');
  if (!w) return res.status(404).json({ msg: 'Not found' });
  res.json(w);
};

exports.updateWishlist = async (req, res) => {
  const w = await Wishlist.findOneAndUpdate(
    { _id: req.params.wishlistId, owner: req.user._id },
    { $set: req.body },
    { new: true }
  );
  if (!w) return res.status(403).json({ msg: 'Not allowed' });
  res.json(w);
};

exports.deleteWishlist = async (req, res) => {
  const w = await Wishlist.findOneAndDelete({ _id: req.params.wishlistId, owner: req.user._id });
  if (!w) return res.status(403).json({ msg: 'Not allowed' });
  res.json({ msg: 'Deleted' });
};
