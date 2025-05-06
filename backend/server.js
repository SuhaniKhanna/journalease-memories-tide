import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import journalRoutes from './routes/journalRoutes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS for frontend requests
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Mount journal routes
app.use('/api/journals', journalRoutes);

// Get MongoDB URI from environment or fallback to local
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/journal_app';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
