// src/contexts/journal-context.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { journalApi, JournalEntry } from '../services/api';

interface JournalContextEntry extends Omit<JournalEntry, '_id'> {
  id: string;
  createdAt: Date;
}

interface JournalContextType {
  entries: JournalContextEntry[];
  loading: boolean;
  addEntry: (entry: Omit<JournalContextEntry, 'id'>) => Promise<void>;
  updateEntry: (id: string, entry: Partial<JournalContextEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  getEntry: (id: string) => JournalContextEntry | undefined;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<JournalContextEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load journal entries on component mount
    const loadEntries = async () => {
      try {
        const data = await journalApi.getEntries();
        // Transform API data to context format
        const formattedEntries = data.journals.map((entry: JournalEntry) => ({
          id: entry._id!,
          title: entry.title,
          content: entry.content,
          createdAt: new Date(entry.date || Date.now()),
        }));
        setEntries(formattedEntries);
      } catch (error) {
        toast.error('Failed to load journal entries');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, []);

  const addEntry = async (entry: Omit<JournalContextEntry, 'id'>) => {
    try {
      const result = await journalApi.createEntry({
        title: entry.title,
        content: entry.content,
        date: entry.createdAt
      });
      
      const newEntry: JournalContextEntry = {
        id: result.journal._id,
        title: result.journal.title,
        content: result.journal.content,
        createdAt: new Date(result.journal.date),
      };
      
      setEntries([newEntry, ...entries]);
      return;
    } catch (error) {
      console.error('Failed to add entry:', error);
      throw error;
    }
  };

  const updateEntry = async (id: string, entryUpdate: Partial<JournalContextEntry>) => {
    try {
      await journalApi.updateEntry(id, {
        title: entryUpdate.title,
        content: entryUpdate.content,
        date: entryUpdate.createdAt
      });
      
      setEntries(entries.map(entry => 
        entry.id === id ? { ...entry, ...entryUpdate } : entry
      ));
    } catch (error) {
      console.error('Failed to update entry:', error);
      throw error;
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      await journalApi.deleteEntry(id);
      setEntries(entries.filter(entry => entry.id !== id));
    } catch (error) {
      console.error('Failed to delete entry:', error);
      throw error;
    }
  };

  const getEntry = (id: string) => {
    return entries.find(entry => entry.id === id);
  };

  return (
    <JournalContext.Provider value={{ 
      entries, 
      loading, 
      addEntry, 
      updateEntry, 
      deleteEntry, 
      getEntry 
    }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};