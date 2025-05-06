import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import journalRoutes from './routes/journalRoutes.js';

dotenv.config(); // Load .env file for environment variables

const app = express();
const PORT = process.env.PORT || 5000; // Set port from environment or default to 5000

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

// Mount the journal routes under the '/api/journal' path
app.use('/api/journal', journalRoutes);

// Route to test the backend
app.get('/', (req, res) => {
  res.send('✅ Backend is working!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
