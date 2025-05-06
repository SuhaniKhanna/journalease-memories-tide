import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { DateTimePicker } from "@/components/date-picker";
import { useJournal } from "@/contexts/journal-context";

const JournalEntry = () => {
  const navigate = useNavigate();
  const { addEntry } = useJournal();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a title for your journal entry");
      return;
    }

    if (!content.trim()) {
      toast.error("Please write something in your journal entry");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to context instead of mocking an API call
      addEntry({
        title,
        content,
        createdAt: date,
      });
      
      toast.success("Journal entry saved successfully!");
      
      // Redirect to past entries instead of dashboard to see the saved entry
      navigate("/past-entries");
    } catch (error) {
      toast.error("Failed to save journal entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">New Journal Entry</h1>
        <p className="text-muted-foreground">Document your thoughts and experiences</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <Input
                  type="text"
                  placeholder="Entry Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg font-medium border-none px-0 focus-visible:ring-0"
                />
                <DateTimePicker date={date} setDate={setDate} />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write your thoughts here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] resize-none lined-paper p-4 focus-visible:ring-0 border-none"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Entry"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default JournalEntry;