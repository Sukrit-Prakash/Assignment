// controllers/inviteController.js
const { v4: uuidv4 } = require('uuid');
const Wishlist        = require('../models/Wishlist');
const mailer          = require('../utils/mailer');

async function log(w, user, action) {
  w.activities.push({ user, action });
  await w.save();
  return w.activities[w.activities.length-1];
}

exports.sendInvite = async (req, res) => {
  const { wishlistId } = req.params;
  const { email } = req.body;
  const w = await Wishlist.findById(wishlistId);
  if (!w) return res.status(404).json({ msg: 'Wishlist not found' });
  const token = uuidv4();
  w.invites.push({ email, token, invitedBy: req.user._id });
  await w.save();
  mailer.sendInviteEmail(email, token, wishlistId);
  const activity = await log(w, req.user._id, 'invite_sent');
  req.app.get('io').to(w._id.toString()).emit('wishlistActivity', activity);
  res.json({ msg: 'Invite sent' });
};

exports.respondInvite = async (req, res) => {
  const { wishlistId, token } = req.params;
  const { action } = req.body; // accept|decline
  const w = await Wishlist.findById(wishlistId);
  const inv = w.invites.find(i => i.token === token);
  if (!inv) return res.status(400).json({ msg: 'Invalid token' });
  inv.status = action;
  inv.respondedAt = Date.now();
  if (action === 'accept') w.members.push(req.user._id);
  await w.save();
  const activity = await log(w, req.user._id, `invite_${action}`);
  req.app.get('io').to(w._id.toString()).emit('wishlistActivity', activity);
  res.json({ msg: `Invite ${action}ed` });
};
