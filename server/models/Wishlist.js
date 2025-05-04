// models/Wishlist.js
const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

// --- sub‐schemas ---

// track comments on each item
const CommentSchema = new Schema({
  // user:      { type: Types.ObjectId, ref: 'User' },
  user:      { type: Types.ObjectId, ref: 'User', required: true },
  text:      { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// track emoji reactions on each item
const ReactionSchema = new Schema({
  user:      { type: Types.ObjectId, ref: 'User', required: true },
  emoji:     { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// each product in a wishlist
const ItemSchema = new Schema({
  // embed the DummyJSON product as a sub‐document
  product: {
    id:                   Number,
    title:                String,
    description:          String,
    category:             String,
    price:                Number,
    rating:               Number,
//   quantity?: number;
    thumbnail:            String,
    // …and any other fields you want to carry over
  },

  addedBy:    { type: Types.ObjectId, ref: 'User', required: true },
  editedBy:   { type: Types.ObjectId, ref: 'User' },
}, { timestamps: { createdAt: 'addedAt', updatedAt: 'updatedAt' } });

// attach comments + reactions
ItemSchema.add({
  comments:  [CommentSchema],
  reactions: [ReactionSchema]
});

// invitations to join a wishlist
const InviteSchema = new Schema({
  email:        { type: String, required: true },
  token:        { type: String, required: true },    // e.g. a UUID
  status:       { type: String, enum: ['pending','accepted','declined'], default: 'pending' },
  invitedBy:    { type: Types.ObjectId, ref: 'User', required: true },
  invitedAt:    { type: Date, default: Date.now },
  respondedAt:  { type: Date }
});

// capture an activity stream for realtime sync
const ActivitySchema = new Schema({
  user:      { type: Types.ObjectId, ref: 'User', required: true },
  action:    { type: String, required: true },   // e.g. 'item_added', 'item_removed', 'item_commented'
  itemId:    { type: Schema.Types.ObjectId },    // which Item
  timestamp: { type: Date, default: Date.now }
});

// the main Wishlist
const WishlistSchema = new Schema({
  name:        { type: String, required: true },
  description: { type: String },
  owner:       { type: Types.ObjectId, ref: 'User', required: true },
  members:     [{ type: Types.ObjectId, ref: 'User' }],    // users who have joined
  invites:     [InviteSchema],
  items:       [ItemSchema],
  activities:  [ActivitySchema]
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', WishlistSchema);
