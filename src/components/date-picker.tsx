
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  showTime?: boolean;
  className?: string;
}

export function DateTimePicker({ 
  date, 
  setDate, 
  showTime = true,
  className 
}: DateTimePickerProps) {
  // Time handling
  const [selectedHour, setSelectedHour] = React.useState<string>(
    date ? format(date, "HH") : format(new Date(), "HH")
  );
  const [selectedMinute, setSelectedMinute] = React.useState<string>(
    date ? format(date, "mm") : format(new Date(), "mm")
  );

  // Update the time of the selected date
  const updateDateTime = React.useCallback(() => {
    if (date) {
      const newDate = new Date(date);
      newDate.setHours(parseInt(selectedHour, 10));
      newDate.setMinutes(parseInt(selectedMinute, 10));
      setDate(newDate);
    }
  }, [date, selectedHour, selectedMinute, setDate]);

  // Update time when hour or minute changes
  React.useEffect(() => {
    updateDateTime();
  }, [selectedHour, selectedMinute, updateDateTime]);

  // Hours and minutes for select
  const hours = Array.from({ length: 24 }, (_, i) => 
    i.toString().padStart(2, "0")
  );
  
  const minutes = Array.from({ length: 60 }, (_, i) => 
    i.toString().padStart(2, "0")
  );

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "justify-start text-left font-normal border-dashed",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        {showTime && (
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedHour} onValueChange={setSelectedHour}>
              <SelectTrigger className="w-[4rem]">
                <SelectValue placeholder={selectedHour} />
              </SelectTrigger>
              <SelectContent className="max-h-[10rem]">
                {hours.map((hour) => (
                  <SelectItem key={hour} value={hour}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm">:</span>
            <Select value={selectedMinute} onValueChange={setSelectedMinute}>
              <SelectTrigger className="w-[4rem]">
                <SelectValue placeholder={selectedMinute} />
              </SelectTrigger>
              <SelectContent className="max-h-[10rem]">
                {minutes.map((minute) => (
                  <SelectItem key={minute} value={minute}>
                    {minute}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}
