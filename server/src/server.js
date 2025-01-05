require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors'); // Import CORS middleware
const connectDatabase = require('./config/database');
const auth = require("./routes/authRoutes");
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');
const cvAnalyzer = require('./routes/cvAnalyzer')
const rateLimitMiddleware = require('./middlewares/rateLimitMiddleware')
const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors()); // Use CORS middleware

// Middleware
app.use(express.json());
app.use(rateLimitMiddleware())
app.use('/api/auth', auth);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cv', cvAnalyzer)
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