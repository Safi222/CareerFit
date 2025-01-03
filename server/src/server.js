require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDatabase = require('./config/database');
const auth = require("./routes/authRoutes")
const jobRoutes = require('./routes/jobRoutes')
const userRoutes = require('./routes/userRoutes')
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use('/api/auth', auth)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)
// Connect to MongoDB
connectDatabase();

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server running on http://localhost:${PORT}`);
  }
});
