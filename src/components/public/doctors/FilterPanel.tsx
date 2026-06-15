import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SPECIALTIES } from "@/constants/public/specialties";

export type DoctorSearch = {
  q?: string;
  specialty?: string;
  gender?: "MALE" | "FEMALE";
  experience?: string;
  available?: boolean;
};

const FilterPanel = ({
  search,
  update,
}: {
  search: DoctorSearch;
  update: (patch: Partial<DoctorSearch>) => void;
}) => {
  return (
    <div className="grid gap-6">
      <div>
        <Label htmlFor="specialty">Specialty</Label>
        <Select
          value={search.specialty ?? "all"}
          onValueChange={(value) =>
            update({ specialty: value === "all" ? undefined : value })
          }
        >
          <SelectTrigger id="specialty" className="mt-2 h-11">
            <SelectValue placeholder="All specialties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" >All specialties</SelectItem>
            {SPECIALTIES.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Select
          value={search.gender ?? "all"}
          onValueChange={(value) =>
            update({
              gender:
                value === "all" ? undefined : (value as "MALE" | "FEMALE"),
            })
          }
        >
          <SelectTrigger id="gender" className="mt-2 h-11">
            <SelectValue placeholder="Any gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any gender</SelectItem>
            <SelectItem value="FEMALE">Female</SelectItem>
            <SelectItem value="MALE">Male</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="experience">Experience</Label>
        <Select
          value={search.experience ?? "all"}
          onValueChange={(value) =>
            update({ experience: value === "all" ? undefined : value })
          }
        >
          <SelectTrigger id="experience" className="mt-2 h-11">
            <SelectValue placeholder="Any experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any experience</SelectItem>
            <SelectItem value="5">5+ years</SelectItem>
            <SelectItem value="10">10+ years</SelectItem>
            <SelectItem value="15">15+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox
          id="available"
          checked={search.available ?? false}
          onCheckedChange={(checked) =>
            update({ available: checked === true ? true : undefined })
          }
        />
        <Label htmlFor="available" className="cursor-pointer">
          Available to book
        </Label>
      </div>
    </div>
  );
};

export default FilterPanel;
