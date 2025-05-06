// src/components/ViewEntry.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit } from "lucide-react";
import { useJournal } from "@/contexts/journal-context";
import { toast } from "sonner";

const ViewEntry = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEntry } = useJournal();
  const [entry, setEntry] = useState<ReturnType<typeof getEntry>>(undefined);

  useEffect(() => {
    if (id) {
      const journalEntry = getEntry(id);
      if (journalEntry) {
        setEntry(journalEntry);
      } else {
        toast.error("Journal entry not found");
        navigate("/past-entries");
      }
    }
  }, [id, getEntry, navigate]);

  if (!entry) {
    return <div className="flex justify-center p-10">Loading entry...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-row items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate("/past-entries")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Journal Entry</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <CardTitle className="text-2xl">{entry.title}</CardTitle>
            <div className="text-sm text-muted-foreground">
              {new Date(entry.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            {entry.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/past-entries")}>
            Back to Entries
          </Button>
          <Button onClick={() => navigate(`/edit-entry/${entry.id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Entry
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewEntry;