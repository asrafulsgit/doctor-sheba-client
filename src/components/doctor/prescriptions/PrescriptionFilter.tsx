import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import useQueryManager from "@/hooks/UseQueryManager";
import { PrescriptionFilters } from "@/lib/query/query-keys";
import { Loader2, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const PrescriptionFilter = () => {
  const { setQuery, getQuery } = useQueryManager();
  const [searchInput, setSearchInput] = useState(getQuery("searchTerm") ?? "");
  const debouncedSearch = useDebounce(searchInput, 1000);
  const isSearching = searchInput !== debouncedSearch;
  useEffect(() => {
    setQuery("searchTerm", debouncedSearch);
  }, [debouncedSearch]);
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <div className="relative max-w-full flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by patient name"
          className="pl-9"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {isSearching && (
          <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>
    </div>
  );
};

export default PrescriptionFilter;
