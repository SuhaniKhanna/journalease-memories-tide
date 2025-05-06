
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/date-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { JournalEntry } from "@/types";
import { Save } from "lucide-react";
import { toast } from "sonner";

interface JournalEditorProps {
  existingEntry?: JournalEntry;
  onSave: (entry: Omit<JournalEntry, "id" | "userId">) => void;
}

export function JournalEditor({ existingEntry, onSave }: JournalEditorProps) {
  const [title, setTitle] = useState(existingEntry?.title || "");
  const [content, setContent] = useState(existingEntry?.content || "");
  const [reminder, setReminder] = useState(existingEntry?.reminder || "");
  const [date, setDate] = useState<Date>(
    existingEntry?.createdAt || new Date()
  );

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Please add a title for your entry");
      return;
    }

    const entry = {
      title,
      content,
      reminder,
      createdAt: date,
      updatedAt: new Date(),
    };

    onSave(entry);
  };

  return (
    <Card className="glass-card border-journease-purple/10 animate-fade-in">
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="title" className="text-lg font-medium">
              Title
            </Label>
            <DateTimePicker date={date} setDate={(newDate) => setDate(newDate || new Date())} />
          </div>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entry title"
            className="glass-input border-journease-purple/20 text-lg placeholder:text-muted-foreground/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content" className="text-lg font-medium">
            Journal Entry
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your journal entry here..."
            className="glass-input border-journease-purple/20 min-h-[400px] lined-paper resize-none placeholder:text-muted-foreground/50 focus-within:border-journease-purple/40"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reminder" className="text-lg font-medium">
            Reminder Note
          </Label>
          <Input
            id="reminder"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            placeholder="Add a reminder or note for yourself"
            className="glass-input border-journease-purple/20 placeholder:text-muted-foreground/50"
          />
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleSave} 
            className="bg-journease-purple hover:bg-journease-purple-dark transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Entry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
