// src/services/api.ts
import axios from 'axios';

// Use a default API URL that can be overridden by environment variables
// For Vite, use import.meta.env instead of process.env
// For Create React App, you would use process.env.REACT_APP_API_URL
const API_URL = import.meta.env?.VITE_API_URL || 
                'http://localhost:5000/api';

export interface JournalEntry {
  _id?: string;
  title: string;
  content: string;
  date?: Date;
}

export const journalApi = {
  // Create a new journal entry
  createEntry: async (entry: Omit<JournalEntry, '_id'>) => {
    const response = await axios.post(`${API_URL}/journals/create`, entry);
    return response.data;
  },

  // Get all journal entries
  getEntries: async () => {
    const response = await axios.get(`${API_URL}/journals`);
    return response.data;
  },

  // Get a single journal entry by ID
  getEntry: async (id: string) => {
    const response = await axios.get(`${API_URL}/journals/${id}`);
    return response.data;
  },

  // Update a journal entry
  updateEntry: async (id: string, entry: Partial<JournalEntry>) => {
    const response = await axios.put(`${API_URL}/journals/${id}`, entry);
    return response.data;
  },

  // Delete a journal entry
  deleteEntry: async (id: string) => {
    const response = await axios.delete(`${API_URL}/journals/${id}`);
    return response.data;
  }
};