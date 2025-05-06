// src/components/EditEntry.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { DateTimePicker } from "@/components/date-picker";
import { useJournal } from "@/contexts/journal-context";
import { ArrowLeft } from "lucide-react";

const EditEntry = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEntry, updateEntry } = useJournal();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const entry = getEntry(id);
      if (entry) {
        setTitle(entry.title);
        setContent(entry.content);
        setDate(new Date(entry.createdAt));
      } else {
        toast.error("Journal entry not found");
        navigate("/past-entries");
      }
    }
  }, [id, getEntry, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;
    
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
      await updateEntry(id, {
        title,
        content,
        createdAt: date,
      });
      
      toast.success("Journal entry updated successfully!");
      navigate(`/entry/${id}`);
    } catch (error) {
      toast.error("Failed to update journal entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-row items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate(`/entry/${id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Journal Entry</h1>
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
            <Button variant="outline" onClick={() => navigate(`/entry/${id}`)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EditEntry;