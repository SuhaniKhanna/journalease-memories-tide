import express from 'express';
import Journal from '../models/Journal.js';

const router = express.Router();

// Create a new journal entry
router.post('/create', async (req, res) => {
  try {
    const { title, content } = req.body; // Extract title and content from the request body

    // Create a new journal entry instance
    const newJournal = new Journal({
      title,
      content,
    });

    // Save the journal entry to the database
    const savedJournal = await newJournal.save();

    // Respond with the saved journal entry and success message
    res.status(201).json({
      message: 'Journal entry created successfully',
      journal: savedJournal,
    });
  } catch (error) {
    // If an error occurs, return an error response
    res.status(500).json({
      message: 'Failed to create journal entry',
      error: error.message,
    });
  }
});

export default router;
