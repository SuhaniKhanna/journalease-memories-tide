
import React, { createContext, useContext, useState, ReactNode } from "react";
import { JournalEntry } from "@/types";

interface JournalContextType {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, "id" | "userId" | "updatedAt">) => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const addEntry = (entry: Omit<JournalEntry, "id" | "userId" | "updatedAt">) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: crypto.randomUUID(),
      userId: "user-1", // Mock user ID
      updatedAt: new Date(),
    };
    
    setEntries(prev => [newEntry, ...prev]);
  };

  return (
    <JournalContext.Provider value={{ entries, addEntry }}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return context;
}
