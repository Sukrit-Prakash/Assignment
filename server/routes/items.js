// routes/items.js
const router = require('express').Router({ mergeParams: true });
const itemC    = require('../controllers/itemController');
const commentC = require('../controllers/commentController');
const reactC   = require('../controllers/reactionController');

// Items
router.post('/', itemC.addItem);
router.get('/:itemId', itemC.getItem);
router.patch('/:itemId', itemC.updateItem);
router.delete('/:itemId', itemC.deleteItem);

// Comments
router.post('/:itemId/comments', commentC.addComment);
router.delete('/:itemId/comments/:commentId', commentC.deleteComment);

// Reactions
router.post('/:itemId/reactions', reactC.addReaction);
router.delete('/:itemId/reactions/:reactionId', reactC.deleteReaction);

module.exports = router;
