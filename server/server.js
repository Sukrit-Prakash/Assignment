// server.js
require('dotenv').config();
const express    = require('express');
const http       = require('http');
const cors       = require('cors');
const connectDB  = require('./config/db');
const authRoutes = require('./routes/auth');
const wlRoutes   = require('./routes/wishlists');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

// attach io to app
app.set('io', io);

// Socket.io: join wishlist room
io.on('connection', socket => {
  socket.on('joinWishlist', wishlistId => {
    socket.join(wishlistId);
  });
});

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/wishlists', wlRoutes);

// run
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  server.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
});
