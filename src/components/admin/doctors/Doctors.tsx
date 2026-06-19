import * as React from "react";
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
import { Doctor } from "@/types/doctors";
import { featuredDoctors } from "@/constants/public/doctors";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { StatusBadge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SPECIALTIES } from "@/constants/public/specialties";

// export const Route = createFileRoute("/admin/doctors")({
//   head: () => ({ meta: [{ title: "Doctors — Admin — DoctorSheba" }] }),
//   component: AdminDoctors,
// });

 



const AdminDoctors = () => {
   const [q, setQ] = React.useState("");
  const [doctors, setDoctors] = React.useState<Doctor[]>(featuredDoctors); 
  const [statusFilter, setStatusFilter] = React.useState<
    "" | "ACTIVE" | "SUSPENDED" | "PENDING"
  >("");
  const [edit, setEdit] = React.useState<Doctor | null>(null);
  const [view, setView] = React.useState<Doctor | null>(null);
  const [create, setCreate] = React.useState(false);
  const [suspend, setSuspend] = React.useState<Doctor | null>(null);

  const setStatus = (
    id: string,
    status: "ACTIVE" | "SUSPENDED" | "PENDING",
  ) => {
    // set("doctorStatus", (prev) => ({ ...prev, [id]: status }));
  };
  const setVerified = (id: string, v: boolean) => {
    // set("doctorVerified", (prev) => ({ ...prev, [id]: v }));
  };

  const upsert = (e: React.FormEvent<HTMLFormElement>, target: Doctor | null) => {
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const fee = Number(f.get("fee") || 0);
    const experience = Number(f.get("experience") || 0);
    const registrationNumber = String(f.get("reg") || "").trim();
    const specialtyId = String(f.get("specialty"));
    const qualification = String(f.get("qualification") || "").trim();
    const hospital = String(f.get("hospital") || "").trim();
    if (!name || !email) { toast.error("Name & email required"); return; }
    // const specialty = state.specialties.find((s) => s.id === specialtyId) || state.specialties[0];
    if (target) {
      // set("doctors", (prev) => prev.map((d) => d.id === target.id ? {
      //   ...d, name, email, appointmentFee: fee, experience, registrationNumber,
      //   qualification, currentWorkingPlace: hospital, specialties: [specialty],
      //   updatedAt: new Date().toISOString(),
      // } : d));
      // toast.success("Doctor updated");
    } else {
      // const id = genId("doc");
      // const newDoc: Doctor = {
      //   id, name, email, registrationNumber, experience,
      //   gender: "MALE", appointmentFee: fee, qualification,
      //   currentWorkingPlace: hospital, designation: "Consultant",
      //   isDeleted: false, averageRating: 0,
      //   createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      //   specialties: [specialty],
      // };
      // set("doctors", (prev) => [newDoc, ...prev]);
      // setStatus(id, "ACTIVE");
      // setVerified(id, false);
      toast.success("Doctor added");
    }
  };

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
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search doctors by name or specialty…"
            className="pl-9"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as typeof statusFilter)
          }
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Doctor</th>
              <th className="px-4 py-3 text-left font-medium">Specialty</th>
              <th className="px-4 py-3 text-left font-medium">BMDC #</th>
              <th className="px-4 py-3 text-left font-medium">Hospital</th>
              <th className="px-4 py-3 text-right font-medium">Fee</th>
              <th className="px-4 py-3 text-right font-medium">Rating</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {featuredDoctors.map((d) => {
                // const isVer
                const status : "ACTIVE" | "SUSPENDED" | "PENDING" = 'ACTIVE'
                const verified = true
              return (
                <tr key={d.id} className="hover:bg-surface/60">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setView(d)}
                      className="flex items-center gap-3 text-left"
                    >
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {d.name.split(" ").slice(-1)[0][0]}
                      </div>
                      <div>
                        <p className="flex items-center gap-1 font-medium text-foreground hover:text-primary hover:underline">
                          {d.name}
                          {/* {verified && ( */}
                            <ShieldCheck className="h-3.5 w-3.5 text-success" />
                          {/* )} */}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {d.email}
                        </p>
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {d?.specialties && d?.specialties[0]?.title}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {d.registrationNumber}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {d.currentWorkingPlace}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    ৳{d.appointmentFee}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center gap-0.5 font-medium text-warning-foreground">
                      <Star className="h-3 w-3 fill-current" />
                      {d.averageRating}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {status === "ACTIVE" && <StatusBadge status="ACTIVE" />}
                    {/* {status === "SUSPENDED" && <StatusBadge status="BLOCKED" />}
                    {status === "PENDING" && (
                      <span className="rounded-full bg-warning-soft px-2.5 py-0.5 text-xs font-medium text-warning-foreground">
                        Pending
                      </span>
                    )} */}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setView(d)}>
                          <Eye className="h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEdit(d)}>
                          <Edit3 className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {!verified && (
                          <DropdownMenuItem
                            onClick={() => {
                              setVerified(d.id, true);
                              toast.success("Doctor verified");
                            }}
                          >
                            <ShieldCheck className="h-4 w-4" />
                            Verify
                          </DropdownMenuItem>
                        )}
                        {verified && (
                          <DropdownMenuItem
                            onClick={() => {
                              setVerified(d.id, false);
                              toast.success("Verification revoked");
                            }}
                          >
                            <ShieldOff className="h-4 w-4" />
                            Revoke verification
                          </DropdownMenuItem>
                        )}
                        {status !== "ACTIVE" ? (
                          <DropdownMenuItem
                            onClick={() => {
                              setStatus(d.id, "ACTIVE");
                              toast.success("Doctor activated");
                            }}
                          >
                            <Power className="h-4 w-4" />
                            Activate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setSuspend(d)}
                          >
                            <Power className="h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
            {featuredDoctors.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  No doctors match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      

      <FormDialog
        open={create}
        onOpenChange={setCreate}
        title="Add doctor"
        onSubmit={(e) => {}}
        submitLabel="Add"
      >
        <DoctorFields specialties={[...SPECIALTIES]} />
      </FormDialog>
      <FormDialog
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
            <KV k="Specialty" v={view?.specialties && view?.specialties[0]?.title || "—"} />
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
      />
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
