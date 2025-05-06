
export type User = {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
};

export type JournalEntry = {
  id: string;
  title: string;
  content: string;
  reminder?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type VoiceMemo = {
  id: string;
  title: string;
  audioUrl: string;
  duration: number;
  createdAt: Date;
  userId: string;
  journalEntryId?: string;
};

export type Streak = {
  current: number;
  longest: number;
  lastEntryDate: Date | null;
};

export type Progress = {
  totalEntries: number;
  weeklyEntries: number;
  monthlyEntries: number;
  streak: Streak;
};
