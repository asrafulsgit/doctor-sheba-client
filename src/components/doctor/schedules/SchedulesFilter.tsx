import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDate } from "@/helpers/getDate";
import useQueryManager from "@/hooks/UseQueryManager";
import { useState } from "react";

const SchedulesFilter = () => {
  const { setQuery, getQuery, clearQuery } = useQueryManager();
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  return (
    <>
      <div className="flex gap-3 w-full">
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-muted-foreground w-full">
            Start Date
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-62">
          <Calendar
            mode="single"
            defaultMonth={startDate}
            selected={startDate}
            onSelect={(selectedDate) => {
              setQuery("startDate", getDate(selectedDate, "yyyy-MM-dd"));
              setStartDate(selectedDate);
            }}
            disabled={startDate ? { before: startDate } : undefined}
            showWeekNumber
          />
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-muted-foreground w-full">
            End Date
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-62">
          <Calendar
            mode="single"
            defaultMonth={endDate}
            selected={endDate}
            onSelect={(selectedDate) => {
              setQuery("endDate", getDate(selectedDate, "yyyy-MM-dd"));
              setEndDate(selectedDate);
            }}
            disabled={startDate ? { before: startDate } : undefined}
            showWeekNumber
          />
        </DropdownMenuContent>
      </DropdownMenu>
      </div>

      <Select
        defaultValue={getQuery("limit") ?? ""}
        onValueChange={(v) => setQuery("limit", v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Limit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
          <SelectItem value="150">150</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={clearQuery} className="self-start">
        Reset Filters
      </Button>
    </>
  );
};

export default SchedulesFilter;
