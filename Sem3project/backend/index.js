/import express from 'express';
import connectToMongoDB from './src/config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import petCareRouter from './src/router/petCareRouter.js'; // Your routes for Pet Care
import session from 'express-session';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Setup session for user authentication (store session data)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Store secret securely (use env variable)
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }, // Use secure cookies in production
}));

// Connect to MongoDB
connectToMongoDB();

// Root endpoint for testing the server
app.get('/', (req, res) => {
  res.send("Welcome to the Pet Care Management System");
});

// Use the petCareRouter for all /api routes
app.use('/api', petCareRouter);  // '/api' prefix for all routes defined in petCareRouter

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


