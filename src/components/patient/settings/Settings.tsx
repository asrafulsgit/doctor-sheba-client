import DashboardHeader from "@/components/shared/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { user } from "@/constants/public/user";

// seo optimization
// export const Route = createFileRoute("/patient/settings")({
//   head: () => ({ meta: [{ title: "Settings — DoctorSheba" }] }),
//   component: SettingsPage,
// });

const PatientSettings = () => {
  return (
    <>
      <DashboardHeader
        title="Settings"
        description="Account, security and notifications."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-base font-semibold">Profile</h2>
          <div className="mt-5 grid gap-4">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                defaultValue={user?.email.split("@")[0]}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user?.email}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="phone">Contact number</Label>
              <Input id="phone" placeholder="+8801…" className="mt-1.5" />
            </div>
            <Button className="w-fit">Save profile</Button>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-base font-semibold">Security</h2>
          <div className="mt-5 grid gap-4">
            <div>
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" className="mt-1.5" />
            </div>
            <Button className="w-fit" variant="outline">
              Update password
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default PatientSettings;
