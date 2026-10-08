import { Input } from "@/components/ui/input";
import useQueryManager from "@/hooks/UseQueryManager";
import { Search } from "lucide-react";

const SearchDoctors = () => {
  const { getQuery, setQuery } = useQueryManager();

  const searchTerm = getQuery("searchTerm");
  return (
    <div className="relative mt-7 max-w-2xl">
      <Search
        className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        aria-label="Search doctors by name"
        placeholder="Search by doctor name"
        value={searchTerm ?? ""}
        onChange={(event) => setQuery("searchTerm", event.target.value)}
        className="h-13 bg-surface pl-12 pr-12 text-base"
      />
    </div>
  );
};

export default SearchDoctors;
