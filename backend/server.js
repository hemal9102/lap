const express = require('express');
const cors = require('cors');
require('dotenv').config();

const laptopRoutes = require('./routes/laptopRoutes');
const leadRoutes = require('./routes/leadRoutes');
const adminRoutes = require('./routes/adminRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const path = require('path');

app.use(cors());
app.use(express.json({ limit: '1mb' })); // Limit JSON payload size to prevent DOS
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Serve static images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Base Route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'Online', message: 'NextTop API Backend is running. Please visit http://localhost:3000 for the website.' });
});

// Use Routes
app.use('/api/laptops', laptopRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/services', serviceRoutes);

// Basic Security for Admin
const adminAuth = (req, res, next) => {
  const apiKey = req.headers['x-admin-api-key'];
  if (apiKey !== (process.env.ADMIN_API_KEY || 'default-secret-key-change-me')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
};
app.use('/api/admin', adminAuth, adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
