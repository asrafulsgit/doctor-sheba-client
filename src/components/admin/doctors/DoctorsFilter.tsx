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
import useQueryManager from "@/hooks/UseQueryManager";
import { useSpecialties } from "@/lib/hooks/UseSpecialty";
import { Search } from "lucide-react";
import React from "react";

const DoctorsFilter = () => {
  const { getQuery, setQuery, clearQuery } = useQueryManager();
  const { data, isLoading, isError, error } = useSpecialties();
  const specialties = data?.data;
  const searchTerm = getQuery("searchTerm");
  const gender = getQuery("gender");
  return (
    <>
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search doctors by name or specialty…"
          className="pl-9"
          value={searchTerm ?? ""}
          onChange={(event) => setQuery("searchTerm", event.target.value)}
        />
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
          className="w-full"
        />
      )}

      <Select
        value={gender ?? "all"}
        onValueChange={(value) => setQuery("gender", value)}
      >
        <SelectTrigger id="gender">
          <SelectValue placeholder="Any gender" />
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
        className="w-full"
      />

      <Button variant="outline" className="w-full" onClick={clearQuery}>
        Reset Filters
      </Button>
    </>
  );
};

export default DoctorsFilter;
