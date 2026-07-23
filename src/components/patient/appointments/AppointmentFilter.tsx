"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDate } from "@/helpers/getDate";
import { useDebounce } from "@/hooks/useDebounce";
import useQueryManager from "@/hooks/UseQueryManager";
import { Filter, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const AppointmentFilter = () => {
  const { setQuery, getQuery } = useQueryManager();

  const [searchInput, setSearchInput] = useState(getQuery("searchTerm") ?? "");
  const debouncedSearch = useDebounce(searchInput, 1000);
  const isSearching = searchInput !== debouncedSearch;
  useEffect(() => {
    setQuery("searchTerm", debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex gap-3 relative w-full md:max-w-sm">
          <Input
            placeholder="Search by name..."
            value={searchInput ?? ""}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {isSearching && (
            <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
          <div className="flex gap-2 md:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size={"icon"}>
                  <Filter />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Filters</DialogTitle>
                </DialogHeader>
                <FilterContent />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div
          className="hidden md:flex md:items-center 
        md:gap-3"
        >
          <FilterContent />
        </div>
      </div>
    </div>
  );
};

const FilterContent = () => {
  const { setQuery, getQuery, clearQuery } = useQueryManager();
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="flex flex-col md:flex-row gap-3">
        <Select
          defaultValue={getQuery("status") ?? ""}
          onValueChange={(v) => setQuery("status", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SCHEDULED">Scheduled</SelectItem>
            <SelectItem value="INPROGRESS">Inprogress</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELED">Canceled</SelectItem>
          </SelectContent>
        </Select>
        <Select
          defaultValue={getQuery("paymentStatus") ?? ""}
          onValueChange={(v) => setQuery("paymentStatus", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PAID">Paid</SelectItem>
            <SelectItem value="UNPAID">Unpaid</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-muted-foreground">
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
                showWeekNumber
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-muted-foreground">
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
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
            <SelectItem value="150">150</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline" onClick={clearQuery} className="self-start">
        Reset Filters
      </Button>
    </div>
  );
};

export default AppointmentFilter;
