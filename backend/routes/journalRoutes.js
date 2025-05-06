// routes/journalRoutes.js
import express from 'express';
import Journal from '../models/Journal.js';

const router = express.Router();

// Create a new journal entry
router.post('/create', async (req, res) => {
  try {
    const { title, content, date } = req.body;

    const newJournal = new Journal({
      title,
      content,
      date: date || Date.now(),
    });

    const savedJournal = await newJournal.save();

    res.status(201).json({
      message: 'Journal entry created successfully',
      journal: savedJournal,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create journal entry',
      error: error.message,
    });
  }
});

// Get all journal entries
router.get('/', async (req, res) => {
  try {
    const journals = await Journal.find().sort({ date: -1 });
    
    res.status(200).json({
      message: 'Journals retrieved successfully',
      journals,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve journal entries',
      error: error.message,
    });
  }
});

// Get a single journal entry
router.get('/:id', async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    
    if (!journal) {
      return res.status(404).json({
        message: 'Journal entry not found',
      });
    }
    
    res.status(200).json({
      message: 'Journal entry retrieved successfully',
      journal,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve journal entry',
      error: error.message,
    });
  }
});

// Update a journal entry
router.put('/:id', async (req, res) => {
  try {
    const { title, content, date } = req.body;
    
    const updatedJournal = await Journal.findByIdAndUpdate(
      req.params.id,
      { title, content, date },
      { new: true, runValidators: true }
    );
    
    if (!updatedJournal) {
      return res.status(404).json({
        message: 'Journal entry not found',
      });
    }
    
    res.status(200).json({
      message: 'Journal entry updated successfully',
      journal: updatedJournal,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update journal entry',
      error: error.message,
    });
  }
});

// Delete a journal entry
router.delete('/:id', async (req, res) => {
  try {
    const deletedJournal = await Journal.findByIdAndDelete(req.params.id);
    
    if (!deletedJournal) {
      return res.status(404).json({
        message: 'Journal entry not found',
      });
    }
    
    res.status(200).json({
      message: 'Journal entry deleted successfully',
      journal: deletedJournal,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete journal entry',
      error: error.message,
    });
  }
});

export default router;