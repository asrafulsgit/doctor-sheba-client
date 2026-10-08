"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import DashboardHeader from "@/components/shared/DashboardHeader";
import {
  useCreateSpecialty,
  useDeleteSpecialty,
  useUpdateSpecialty,
  type SpecialtyInput,
} from "@/lib/hooks/UseSpecialty";
import { Specialty } from "@/types/specialties";

import SpecialtiesTable from "./SpecialtiesTable";
import SpecialtyFormDialog from "./SpecialtyFormDialog";

const AdminSpecialties = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(
    null,
  );
  const [deletingSpecialty, setDeletingSpecialty] = useState<Specialty | null>(
    null,
  );
  const createSpecialty = useCreateSpecialty();
  const updateSpecialty = useUpdateSpecialty();
  const deleteSpecialty = useDeleteSpecialty();

  const handleCreate = async (data: SpecialtyInput) => {
    try {
      await createSpecialty.mutateAsync(data);
      toast.success("Specialty added");
      setCreateOpen(false);
    } catch (error: any) {
      toast.error(error ? error.message : "Unable to add specialty");
    }
  };

  const handleEdit = async (data: SpecialtyInput) => {
    if (!editingSpecialty) return;

    try {
      await updateSpecialty.mutateAsync({ id: editingSpecialty.id, ...data });
      toast.success("Specialty updated");
      setEditingSpecialty(null);
    } catch (error: any) {
      toast.error(error ? error.message : "Unable to update specialty");
    }
  };

  const handleDelete = async () => {
    if (!deletingSpecialty) return;

    try {
      await deleteSpecialty.mutateAsync(deletingSpecialty.id);
      toast.success("Specialty deleted");
      setDeletingSpecialty(null);
    } catch (error: any) {
      toast.error(error ? error.message : "Unable to delete specialty");
      throw error;
    }
  };

  return (
    <>
      <DashboardHeader
        title="Specialties"
        description="Create and update the medical specialties available on the platform."
        actions={
          <Button type="button" onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add specialty
          </Button>
        }
      />

      <SpecialtiesTable
        onEdit={setEditingSpecialty}
        onDelete={setDeletingSpecialty}
      />

      <SpecialtyFormDialog
        key="create-specialty"
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Add specialty"
        description="Add a specialty to the platform."
        submitLabel="Create specialty"
        isPending={createSpecialty.isPending}
        onSubmit={handleCreate}
      />
      <SpecialtyFormDialog
        key={editingSpecialty?.id ?? "edit-specialty"}
        open={!!editingSpecialty}
        onOpenChange={(open) => !open && setEditingSpecialty(null)}
        title="Edit specialty"
        description="Update the specialty details."
        submitLabel="Save changes"
        specialty={editingSpecialty ?? undefined}
        isPending={updateSpecialty.isPending}
        onSubmit={handleEdit}
      />
      <ConfirmDialog
        open={!!deletingSpecialty}
        onOpenChange={(open) => !open && setDeletingSpecialty(null)}
        title="Delete this specialty?"
        description={`This will permanently remove ${deletingSpecialty?.title ?? "this specialty"}.`}
        confirmLabel="Delete"
        destructive = {true}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default AdminSpecialties;
