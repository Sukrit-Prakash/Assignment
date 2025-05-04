// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let u = await User.findOne({ email });
    if (u) return res.status(400).json({ msg: 'Email in use' });
    const hash = await bcrypt.hash(password, 10);
    u = new User({ username, email, password: hash });
    await u.save();
    const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: u._id, username, email }, token });
  } catch (e) { res.status(500).send(e.message); }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const u = await User.findOne({ email });
    if (!u) return res.status(400).json({ msg: 'No such user' });
    const match = await bcrypt.compare(password, u.password);
    if (!match) return res.status(400).json({ msg: 'Wrong password' });
    const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: u._id, username: u.username, email }, token });
  } catch (e) { res.status(500).send(e.message); }
};

exports.getMe = (req, res) => {
  res.json(req.user);
};
