// routes/wishlists.js
const router = require('express').Router();
const auth = require('../middleware/auth');
const wc   = require('../controllers/wishlistController');
const ic   = require('../controllers/inviteController');
const ac   = require('../controllers/activityController');
const itemsRouter = require('./items');

// Wishlist CRUD
router.post('/', auth, wc.createWishlist);
router.get('/', auth, wc.getWishlists);
router.get('/:wishlistId', auth, wc.getWishlist);
router.patch('/:wishlistId', auth, wc.updateWishlist);
router.delete('/:wishlistId', auth, wc.deleteWishlist);

// Invites
router.post('/:wishlistId/invite', auth, ic.sendInvite);
router.post('/:wishlistId/invite/:token', auth, ic.respondInvite);

// Activities
router.get('/:wishlistId/activities', auth, ac.getActivities);

// Nested items + comments + reactions
router.use('/:wishlistId/items', auth, itemsRouter);

module.exports = router;
