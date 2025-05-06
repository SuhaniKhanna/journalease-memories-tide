
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Play, Pause } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function VoiceMemoRecorder({ onSave }: { onSave: (audio: Blob, title: string) => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [title, setTitle] = useState("Voice Memo");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        
        // Create audio element for playback
        const audioURL = URL.createObjectURL(audioBlob);
        if (audioPlayerRef.current) {
          audioPlayerRef.current.src = audioURL;
        } else {
          audioPlayerRef.current = new Audio(audioURL);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started");
    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast.error("Cannot access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Recording stopped");
      
      // Stop all tracks on the stream
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const playAudio = () => {
    if (audioPlayerRef.current && !isPlaying) {
      audioPlayerRef.current.play();
      setIsPlaying(true);
      
      audioPlayerRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  const pauseAudio = () => {
    if (audioPlayerRef.current && isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSave = () => {
    if (!audioBlob) {
      toast.error("No recording to save");
      return;
    }
    
    if (!title.trim()) {
      toast.error("Please provide a title for your recording");
      return;
    }
    
    onSave(audioBlob, title);
    
    // Reset state after saving
    setAudioBlob(null);
    setTitle("Voice Memo");
    if (audioPlayerRef.current) {
      audioPlayerRef.current = null;
    }
    toast.success("Voice memo saved");
  };

  return (
    <Card className="glass-card border-journease-purple/10">
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Voice Memo Title"
            className="glass-input border-journease-purple/20"
          />
        </div>
        
        <div className="flex items-center justify-center gap-4 py-6">
          {!isRecording ? (
            <Button
              onClick={startRecording}
              variant="outline"
              size="icon"
              className="h-14 w-14 rounded-full border-2 border-journease-purple bg-white/50 hover:bg-journease-purple/10"
            >
              <Mic className="h-6 w-6 text-journease-purple" />
            </Button>
          ) : (
            <Button
              onClick={stopRecording}
              variant="outline"
              size="icon"
              className="h-14 w-14 rounded-full border-2 border-red-500 bg-white/50 hover:bg-red-500/10"
            >
              <Square className="h-6 w-6 text-red-500" fill="currentColor" />
            </Button>
          )}
          
          {audioBlob && !isPlaying && (
            <Button
              onClick={playAudio}
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border border-journease-purple bg-white/50 hover:bg-journease-purple/10"
            >
              <Play className="h-5 w-5 text-journease-purple" fill="currentColor" />
            </Button>
          )}
          
          {audioBlob && isPlaying && (
            <Button
              onClick={pauseAudio}
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border border-journease-purple bg-white/50 hover:bg-journease-purple/10"
            >
              <Pause className="h-5 w-5 text-journease-purple" fill="currentColor" />
            </Button>
          )}
        </div>
        
        {audioBlob && (
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              className="bg-journease-purple hover:bg-journease-purple-dark transition-colors"
            >
              Save Memo
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function VoiceMemoPlayer({ 
  title,
  audioUrl,
  onDelete,
}: { 
  title: string;
  audioUrl: string;
  onDelete?: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayback = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-journease-purple-light rounded-md">
      <div className="flex items-center gap-2">
        <Button
          onClick={togglePlayback}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/80"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 text-journease-purple-dark" fill="currentColor" />
          ) : (
            <Play className="h-4 w-4 text-journease-purple-dark" fill="currentColor" />
          )}
        </Button>
        <span className="font-medium text-sm">{title}</span>
      </div>
      
      {onDelete && (
        <Button
          onClick={onDelete}
          variant="ghost"
          size="sm"
          className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          Delete
        </Button>
      )}
    </div>
  );
}
