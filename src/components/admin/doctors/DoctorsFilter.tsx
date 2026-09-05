import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DOCTOR_DESIGNATIONS } from "@/constants/doctor/data";
import { useDebounce } from "@/hooks/useDebounce";
import useQueryManager from "@/hooks/UseQueryManager";
import { useSpecialties } from "@/lib/hooks/UseSpecialty";
import { Loader2, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const DoctorsFilter = () => {
  const { getQuery, setQuery, clearQuery } = useQueryManager();
  const { data, isLoading, isError, error } = useSpecialties();
  const specialties = data?.data;
  const gender = getQuery("gender");

  const [searchInput, setSearchInput] = useState(getQuery("searchTerm") ?? "");
  const debouncedSearch = useDebounce(searchInput, 1000);
  const isSearching = searchInput !== debouncedSearch;
  useEffect(() => {
    setQuery("searchTerm", debouncedSearch);
  }, [debouncedSearch]);

  return (
    <>
      <div className="relative min-w-50 max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 
        text-muted-foreground" />
        <Input
          placeholder="Search doctors by name or specialty…"
          className="pl-9"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {isSearching && (
          <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {specialties?.length && (
        <Combobox
          options={
            specialties?.map((s) => ({
              value: s?.title,
              label: s?.title,
            })) ?? []
          }
          value={getQuery("specialty") as string}
          onChange={(id) => setQuery("specialty", id)}
          placeholder="Select Specialty"
        />
      )}

      <Select
        value={gender ?? "all"}
        onValueChange={(value) => setQuery("gender", value)}
      >
        <SelectTrigger className="w-30" id="gender">
          <SelectValue  placeholder="Any gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" disabled>
            Any gender
          </SelectItem>
          <SelectItem value="FEMALE">Female</SelectItem>
          <SelectItem value="MALE">Male</SelectItem>
        </SelectContent>
      </Select>

      <Combobox
        options={
          DOCTOR_DESIGNATIONS?.map((d) => ({
            value: d,
            label: d,
          })) ?? []
        }
        value={getQuery("designation") as string}
        onChange={(id) => setQuery("designation", id)}
        placeholder="Select designation"
        className="w-50"
      />

      <Button variant="outline" onClick={clearQuery}>
        Reset Filters
      </Button>
    </>
  );
};

export default DoctorsFilter;
