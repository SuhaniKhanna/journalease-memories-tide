import mongoose from 'mongoose';

// Journal schema definition
const journalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // The title is required
  },
  content: {
    type: String,
    required: true, // The content is required
  },
  date: {
    type: Date,
    default: Date.now, // If no date is provided, use the current date
  },
});

// Create the Journal model using the schema
const Journal = mongoose.model('Journal', journalSchema);

export default Journal;
