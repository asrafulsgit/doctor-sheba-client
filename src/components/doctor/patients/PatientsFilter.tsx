"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import useQueryManager from "@/hooks/UseQueryManager";
import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";

const PatientsFilter = () => {
  const { getQuery, setQuery } = useQueryManager();

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
    </>
  );
};

export default PatientsFilter;
