import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import useQueryManager from "@/hooks/UseQueryManager";
import { Loader, Search } from "lucide-react";
import { useEffect, useState } from "react";

const HealthTipFilter = () => {
  const { getQuery, setQuery } = useQueryManager();
  const [searchInput, setSearchInput] = useState(getQuery("searchTerm") ?? "");
  const debouncedSearch = useDebounce(searchInput, 1000);
  const isSearching = searchInput !== debouncedSearch;
  useEffect(() => {
    setQuery("searchTerm", debouncedSearch);
  }, [debouncedSearch]);
  return (
    <div className="relative mt-7 max-w-2xl">
      <Search
        className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        aria-label="Search tips by title, description, excerpt..."
        placeholder="Search by tips title, description, excerpt..."
        value={searchInput ?? ""}
        onChange={(e) => setSearchInput(e.target.value)}
        className="h-13 bg-surface pl-12 pr-12 text-base"
      />

      {isSearching && (
        <Loader className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
};

export default HealthTipFilter;
