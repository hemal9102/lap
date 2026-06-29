const express = require('express');
const cors = require('cors');
require('dotenv').config();

const laptopRoutes = require('./routes/laptopRoutes');
const leadRoutes = require('./routes/leadRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Base Route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'Online', message: 'NextTop API Backend is running. Please visit http://localhost:3000 for the website.' });
});

// Use Routes
app.use('/api/laptops', laptopRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
