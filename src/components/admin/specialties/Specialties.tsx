"use client";
import * as React from "react";
import { Tags, Plus, Edit3, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormDialog } from "@/components/shared/FormDialog";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Specialty } from "@/types/specialties";
import { SPECIALTIES } from "@/constants/public/specialties";
import DashboardHeader from "@/components/shared/DashboardHeader";

// export const Route = createFileRoute("/admin/specialties")({
//   head: () => ({ meta: [{ title: "Specialties — Admin — DoctorSheba" }] }),
//   component: SpecialtiesPage,
// });

const AdminSpecialties = () => {
  const [specialties, setSpecialties] =
    React.useState<Specialty[]>(SPECIALTIES);
  const [edit, setEdit] = React.useState<Specialty | null>(null);
  const [create, setCreate] = React.useState(false);
  const [del, setDel] = React.useState<Specialty | null>(null);

  const onCreate = (e: React.FormEvent<HTMLFormElement>) => {
    const f = new FormData(e.currentTarget);
    const title = String(f.get("title") || "").trim();
    const icon = String(f.get("icon") || "Tag");
    if (!title) {
      toast.error("Title required");
      return;
    }
    // set((prev) => [{ id: genId("sp"), title, icon }, ...prev]);
    toast.success("Specialty added");
  };
  const onEdit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!edit) return;
    const f = new FormData(e.currentTarget);
    const title = String(f.get("title") || "").trim();
    const icon = String(f.get("icon") || edit.icon);
    if (!title) {
      toast.error("Title required");
      return;
    }
    // set((prev) => prev.map((s) => s.id === edit.id ? { ...s, title, icon } : s));
    toast.success("Specialty updated");
  };
  const onDelete = () => {
    if (!del) return;
    // set((prev) => prev.filter((s) => s.id !== del.id));
    toast.success("Specialty deleted");
  };

  return (
    <>
      <DashboardHeader
        title="Specialties"
        description="Create, rename or remove medical specialties."
        actions={
          <Button onClick={() => setCreate(true)}>
            <Plus className="h-4 w-4" />
            Add specialty
          </Button>
        }
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Specialty</th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {specialties.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3 font-medium text-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Tags className="h-4 w-4 text-primary" />
                    {s.title}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {s.id}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm" onClick={() => setEdit(s)}>
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => setDel(s)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FormDialog
        open={create}
        onOpenChange={setCreate}
        title="Add specialty"
        onSubmit={onCreate}
      >
        <Fields />
      </FormDialog>
      <FormDialog
        open={!!edit}
        onOpenChange={(o) => !o && setEdit(null)}
        title="Edit specialty"
        onSubmit={onEdit}
      >
        {edit && <Fields defaults={edit} />}
      </FormDialog>
      <ConfirmDialog
        open={!!del}
        onOpenChange={(o) => !o && setDel(null)}
        title="Delete this specialty?"
        description={del?.title}
        confirmLabel="Delete"
        destructive
        onConfirm={onDelete}
      />
    </>
  );
};

export default AdminSpecialties;

function Fields({ defaults }: { defaults?: Specialty }) {
  return (
    <>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={defaults?.title}
          required
        />
      </div>
      <div>
        <Label htmlFor="icon">Icon name</Label>
        <Input id="icon" name="icon" defaultValue={defaults?.icon || "Tag"} />
      </div>
    </>
  );
}
