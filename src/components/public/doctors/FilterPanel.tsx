"use client";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
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

const FilterPanel = () => {
  const { getQuery, setQuery, clearQuery } = useQueryManager();
  const { data, isLoading, isError, error } = useSpecialties();
  const specialties = data?.data;
  const gender = getQuery("gender");
  return (
    <div className="grid gap-6">
      <div>
        <Label htmlFor="specialty" className="pb-2">
          Specialty
        </Label>
        {specialties?.length && (
          <Combobox
            options={
              specialties?.map((s) => ({
                value: s.title,
                label: s.title,
              })) ?? []
            }
            value={getQuery("specialty") as string}
            onChange={(id) => setQuery("specialty", id)}
            placeholder="Select Specialty"
            className="w-full"
          />
        )}
      </div>
      <div>
        <Label htmlFor="gender" className="pb-2">
          Gender
        </Label>
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
      </div>
      <div>
        <Label htmlFor="designation" className="pb-2">
          Designation
        </Label>
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
      </div>
      <Button variant="outline" className="w-full" onClick={clearQuery}>
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterPanel;
