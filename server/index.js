const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const verificationRoutes = require('./routes/verification');
const adminRoutes = require('./routes/admin');
const withdrawRoutes = require('./routes/withdrawal');

const app = express(); // ✅ Must come BEFORE app.use()

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'https://gcasl-philippines.vercel.app'],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // ✅ Auth routes
app.use('/api/verification', verificationRoutes); // ✅ Verification routes
app.use('/api/admin', adminRoutes);

app.use('/api/withdraw', withdrawRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`✅ Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
