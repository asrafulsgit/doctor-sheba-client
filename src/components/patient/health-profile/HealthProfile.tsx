import { HeartPulse } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { Switch } from "@/components/ui/switch";

// seo optimization
// export const Route = createFileRoute("/patient/health-profile")({
//   head: () => ({ meta: [{ title: "Health Profile — DoctorSheba" }] }),
//   component: HealthProfilePage,
// });

const PatientHealthProfile = () => {
  return (
    <>
      <DashboardHeader
        title="Health Profile"
        description="Help your doctors give you the best care. All fields are private and encrypted."
      />
      <form className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
              <HeartPulse className="h-4 w-4" />
            </span>
            <h2 className="text-base font-semibold">Personal health</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="dob">Date of birth</Label>
              <Input id="dob" type="date" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="blood">Blood group</Label>
              <select
                id="blood"
                className="mt-1.5 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">Select</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>
            <div>
              <Label htmlFor="height">Height</Label>
              <Input id="height" placeholder="e.g. 170 cm" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="weight">Weight</Label>
              <Input id="weight" placeholder="e.g. 68 kg" className="mt-1.5" />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-base font-semibold">Medical history</h2>
          <div className="mt-5 space-y-4">
            {[
              { id: "allergies", label: "Has allergies" },
              { id: "diabetes", label: "Has diabetes" },
              { id: "smoking", label: "Smokes regularly" },
              { id: "surgeries", label: "Past surgeries" },
            ].map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between rounded-lg bg-surface px-3 py-2.5"
              >
                <Label htmlFor={f.id} className="cursor-pointer">
                  {f.label}
                </Label>
                <Switch id={f.id} />
              </div>
            ))}
          </div>
        </section>

        <div className="lg:col-span-2 flex justify-end">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </>
  );
};

export default PatientHealthProfile;
