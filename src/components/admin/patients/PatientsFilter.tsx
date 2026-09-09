"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import useQueryManager from "@/hooks/UseQueryManager";
import { Loader2, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const PatientsFilter = () => {
  const { getQuery, setQuery, clearQuery } = useQueryManager();
  const isDeleted = getQuery("isDeleted");

  const [searchInput, setSearchInput] = useState(getQuery("searchTerm") ?? "");
  const debouncedSearch = useDebounce(searchInput, 1000);
  const isSearching = searchInput !== debouncedSearch;
  useEffect(() => {
    setQuery("searchTerm", debouncedSearch);
  }, [debouncedSearch]);

  return (
    <>
      <div className="relative min-w-50 max-w-md flex-1">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 
        text-muted-foreground"
        />
        <Input
          placeholder="Search doctors by name or specialty…"
          className="pl-9"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {isSearching && (
          <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      <Select
        value={isDeleted ?? "all"}
        onValueChange={(value) => setQuery("isDeleted", value)}
      >
        <SelectTrigger className="w-30" id="isDeleted">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" disabled>
            All
          </SelectItem>
          <SelectItem value="true">Deleted</SelectItem>
          <SelectItem value="false">Active</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={clearQuery}>
        Reset Filters
      </Button>
    </>
  );
};

export default PatientsFilter;
