"use client";
import * as React from "react";
import { UserCog, Plus, MoreHorizontal, Edit3, Power } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormDialog } from "@/components/shared/FormDialog";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminRecord, ADMINS } from "@/constants/patient/data";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { StatusBadge } from "@/components/ui/badge";

// export const Route = createFileRoute("/admin/admins")({
//   head: () => ({ meta: [{ title: "Admins — DoctorSheba" }] }),
//   component: AdminAdmins,
// });

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const AdminAdmins = () => {
  const [create, setCreate] = React.useState(false);
  const [admins, setAdmins] = React.useState<AdminRecord[]>(ADMINS);
  const [edit, setEdit] = React.useState<AdminRecord | null>(null);
  const [toggle, setToggle] = React.useState<AdminRecord | null>(null);

  const upsert = (
    e: React.FormEvent<HTMLFormElement>,
    target: AdminRecord | null,
  ) => {
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const role = String(f.get("role") || "ADMIN") as AdminRecord["role"];
    const contactNumber = String(f.get("phone") || "").trim();
    if (!name || !email) {
      toast.error("Name & email required");
      return;
    }
    if (target) {
      //   set((prev) => prev.map((a) => a.id === target.id ? { ...a, name, email, role, contactNumber } : a));
      toast.success("Admin updated");
    } else {
      //   set((prev) => [{
      //     id: genId("adm"), name, email, role, contactNumber,
      //     lastLogin: new Date().toISOString(), status: "ACTIVE",
      //   }, ...prev]);
      toast.success("Admin invited");
    }
  };
  const doToggle = () => {
    if (!toggle) return;
    const next = toggle.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    // set((prev) => prev.map((a) => a.id === toggle.id ? { ...a, status: next } : a));
    toast.success(
      next === "BLOCKED" ? "Admin deactivated" : "Admin reactivated",
    );
  };

  return (
    <>
      <DashboardHeader
        title="Admins"
        description="Manage platform administrators and roles."
        actions={
          <Button onClick={() => setCreate(true)}>
            <Plus className="h-4 w-4" />
            Invite admin
          </Button>
        }
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Admin</th>
              <th className="px-4 py-3 text-left font-medium">Role</th>
              <th className="px-4 py-3 text-left font-medium">Contact</th>
              <th className="px-4 py-3 text-left font-medium">Last login</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {admins.map((a) => (
              <tr key={a.id} className="hover:bg-surface/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      <UserCog className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${a.role === "SUPER_ADMIN" ? "bg-secondary-soft text-secondary" : "bg-primary-soft text-primary"}`}
                  >
                    {a.role === "SUPER_ADMIN" ? "Super admin" : "Admin"}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {a.contactNumber}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {fmt(a.lastLogin)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={a.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEdit(a)}>
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={
                          a.status === "ACTIVE" ? "text-destructive" : ""
                        }
                        onClick={() => setToggle(a)}
                      >
                        <Power className="h-4 w-4" />
                        {a.status === "ACTIVE" ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FormDialog
        open={create}
        onOpenChange={setCreate}
        title="Invite admin"
        submitLabel="Invite"
        onSubmit={(e) => upsert(e, null)}
      >
        <Fields />
      </FormDialog>
      <FormDialog
        open={!!edit}
        onOpenChange={(o) => !o && setEdit(null)}
        title="Edit admin"
        onSubmit={(e) => upsert(e, edit!)}
      >
        {edit && <Fields defaults={edit} />}
      </FormDialog>
      <ConfirmDialog
        open={!!toggle}
        onOpenChange={(o) => !o && setToggle(null)}
        title={
          toggle?.status === "ACTIVE"
            ? "Deactivate admin?"
            : "Reactivate admin?"
        }
        description={toggle?.name}
        destructive={toggle?.status === "ACTIVE"}
        confirmLabel={toggle?.status === "ACTIVE" ? "Deactivate" : "Activate"}
        onConfirm={doToggle}
      />
    </>
  );
};

function Fields({ defaults }: { defaults?: AdminRecord }) {
  return (
    <div className="grid gap-3">
      <div>
        <Label htmlFor="name">Name</Label>
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
        <Label htmlFor="phone">Contact number</Label>
        <Input id="phone" name="phone" defaultValue={defaults?.contactNumber} />
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          name="role"
          defaultValue={defaults?.role || "ADMIN"}
          className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="ADMIN">Admin</option>
          <option value="SUPER_ADMIN">Super admin</option>
        </select>
      </div>
    </div>
  );
}

export default AdminAdmins;
