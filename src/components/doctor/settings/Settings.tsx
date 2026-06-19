"use client"
import * as React from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { activatedDashboard } from "@/constants/public/user";
import DashboardHeader from "@/components/shared/DashboardHeader";

// export const Route = createFileRoute("/doctor/settings")({
//   head: () => ({ meta: [{ title: "Settings — DoctorSheba" }] }),
//   component: SettingsPage,
// });

const DoctorSettings = () => {
  const [form, setForm] = React.useState(activatedDashboard);
  const [dirty, setDirty] = React.useState(false);
  const update = (patch: Partial<typeof form>) => {
    setForm({ ...form, ...patch });
    setDirty(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // set("doctorProfile", form);
    setDirty(false);
    toast.success("Profile saved");
  };

  return (
    <>
      <DashboardHeader
        title="Settings"
        description="Profile, credentials and notifications."
      />
      <form
        onSubmit={onSubmit}
        className="grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft sm:grid-cols-2"
      >
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            value={"name"}
            onChange={(e) => update({})}
            className="mt-1.5"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update({ email: e.target.value })}
            className="mt-1.5"
            required
          />
        </div>
        <div>
          <Label htmlFor="reg">Registration number</Label>
          <Input
            id="reg"
            placeholder="BMDC-A-…"
            value={"form"}
            onChange={(e) => update({})}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="fee">Appointment fee (৳)</Label>
          <Input
            id="fee"
            type="number"
            min={0}
            value={""}
            onChange={(e) => update({})}
            className="mt-1.5"
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="bio">Professional bio</Label>
          <Textarea
            id="bio"
            rows={4}
            value={""}
            onChange={(e) => update({})}
            className="mt-1.5"
          />
        </div>
        <div className="sm:col-span-2 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={!dirty}
            onClick={() => {
              //   setForm(state.doctorProfile);
              //   setDirty(false);
            }}
          >
            Discard
          </Button>
          <Button type="submit" disabled={!dirty}>
            Save profile
          </Button>
        </div>
      </form>
    </>
  );
};

export default DoctorSettings;
