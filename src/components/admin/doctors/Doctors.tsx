"use client"; 
import {
  Plus,
  Search,
  Star,
  MoreHorizontal,
  Eye,
  Edit3,
  ShieldCheck,
  ShieldOff,
  Power,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormDialog, InfoDialog } from "@/components/shared/FormDialog";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Doctor, IDoctorFilter } from "@/types/doctors";
import { featuredDoctors } from "@/constants/public/doctors";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { StatusBadge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SPECIALTIES } from "@/constants/public/specialties";
import useQueryManager from "@/hooks/UseQueryManager";
import { useDoctors } from "@/lib/hooks/UseDoctor";
import DoctorsFilter from "./DoctorsFilter";
import { useState } from "react";
import DoctorRecordTable from "./DoctorRecordTable";

// export const Route = createFileRoute("/admin/doctors")({
//   head: () => ({ meta: [{ title: "Doctors — Admin — DoctorSheba" }] }),
//   component: AdminDoctors,
// });

const AdminDoctors = () => {
  const [create, setCreate] = useState(false);
  return (
    <>
      <DashboardHeader
        title="Doctors"
        description="Add, verify, edit or suspend doctors."
        actions={
          <Button onClick={() => setCreate(true)}>
            <Plus className="h-4 w-4" />
            Add doctor
          </Button>
        }
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <DoctorsFilter />
      </div>

      <DoctorRecordTable />

      <FormDialog
        open={create}
        onOpenChange={setCreate}
        title="Add doctor"
        onSubmit={(e) => {}}
        submitLabel="Add"
      >
        <DoctorFields specialties={[...SPECIALTIES]} />
      </FormDialog>
      {/* <FormDialog
        open={!!edit}
        onOpenChange={(o) => !o && setEdit(null)}
        title="Edit doctor"
        onSubmit={(e) => {}}
      >
        {edit && (
          <DoctorFields specialties={[...SPECIALTIES]} defaults={edit} />
        )}
      </FormDialog>

      <InfoDialog
        open={!!view}
        onOpenChange={(o) => !o && setView(null)}
        title={view?.name || "Doctor"}
      >
        {view && (
          <div className="space-y-2 text-sm">
            <KV k="Email" v={view.email} />
            <KV k="Contact" v={view.contactNumber || "—"} />
            <KV k="Registration" v={view.registrationNumber} />
            <KV
              k="Specialty"
              v={(view?.specialties && view?.specialties[0]?.title) || "—"}
            />
            <KV k="Qualification" v={view.qualification} />
            <KV k="Hospital" v={view.currentWorkingPlace} />
            <KV k="Experience" v={`${view.experience} years`} />
            <KV k="Fee" v={`৳${view.appointmentFee}`} />
            <KV k="Rating" v={`${view.averageRating} ★`} />
            <KV k="Status" v={"ACTIVE"} />
            <KV k="Verified" v={"Yes"} />
          </div>
        )}
      </InfoDialog>

      <ConfirmDialog
        open={!!suspend}
        onOpenChange={(o) => !o && setSuspend(null)}
        title="Suspend this doctor?"
        description={
          suspend ? `${suspend.name} will be hidden from patients.` : ""
        }
        confirmLabel="Suspend"
        destructive
        onConfirm={() => {
          if (suspend) {
            setStatus(suspend.id, "SUSPENDED");
            toast.success("Doctor suspended");
          }
        }}
      /> */}
    </>
  );
};

function DoctorFields({
  specialties,
  defaults,
}: {
  specialties: { id: string; title: string }[];
  defaults?: Doctor;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div>
        <Label htmlFor="name">Full name</Label>
        <Input id="name" name="name" required defaultValue={defaults?.name} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={defaults?.email}
        />
      </div>
      <div>
        <Label htmlFor="reg">BMDC #</Label>
        <Input
          id="reg"
          name="reg"
          defaultValue={defaults?.registrationNumber}
        />
      </div>
      <div>
        <Label htmlFor="specialty">Specialty</Label>
        <select
          id="specialty"
          name="specialty"
          defaultValue={defaults?.specialties && defaults?.specialties[0]?.id}
          className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          {specialties.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="qualification">Qualification</Label>
        <Input
          id="qualification"
          name="qualification"
          defaultValue={defaults?.qualification}
        />
      </div>
      <div>
        <Label htmlFor="hospital">Hospital</Label>
        <Input
          id="hospital"
          name="hospital"
          defaultValue={defaults?.currentWorkingPlace}
        />
      </div>
      <div>
        <Label htmlFor="experience">Experience (yrs)</Label>
        <Input
          id="experience"
          name="experience"
          type="number"
          min={0}
          defaultValue={defaults?.experience}
        />
      </div>
      <div>
        <Label htmlFor="fee">Fee (৳)</Label>
        <Input
          id="fee"
          name="fee"
          type="number"
          min={0}
          defaultValue={defaults?.appointmentFee}
        />
      </div>
    </div>
  );
}

function KV({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex justify-between rounded-md border border-border px-3 py-2">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}

export default AdminDoctors;
