"use client";

import { Plus } from "lucide-react";
import { useCallback, useState } from "react";
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
  const { mutate: createSpecialty, isPending: isCreating } =
    useCreateSpecialty();
  const { mutate: updateSpecialty, isPending: isUpdating } =
    useUpdateSpecialty();
  const { mutate: deleteSpecialty } = useDeleteSpecialty();

  const handleCreate = useCallback(
    async (data: SpecialtyInput) => {
      createSpecialty(data, {
        onSuccess: () => {
          toast.success("Specialty added");
          setCreateOpen(false);
        },
        onError: (error: Error) =>
          toast.error(error ? error.message : "Unable to add specialty"),
      });
    },
    [createSpecialty],
  );

  const handleEdit = useCallback(
    async (data: SpecialtyInput) => {
      if (!editingSpecialty) return;

      updateSpecialty(
        { id: editingSpecialty.id, ...data },
        {
          onSuccess: () => {
            toast.success("Specialty updated");
            setEditingSpecialty(null);
          },
          onError: (error: Error) =>
            toast.error(error ? error.message : "Unable to update specialty"),
        },
      );
    },
    [editingSpecialty, updateSpecialty],
  );

  const handleDelete = useCallback(async () => {
    if (!deletingSpecialty) return;

    deleteSpecialty(deletingSpecialty.id, {
      onSuccess: () => {
        toast.success("Specialty deleted");
        setDeletingSpecialty(null);
      },
      onError: (error: Error) =>
        toast.error(error ? error.message : "Unable to delete specialty"),
    });
  }, [deleteSpecialty, deletingSpecialty]);

  const handleEditDialogOpenChange = useCallback((open: boolean) => {
    if (!open) setEditingSpecialty(null);
  }, []);

  const handleDeleteDialogOpenChange = useCallback((open: boolean) => {
    if (!open) setDeletingSpecialty(null);
  }, []);

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

      {createOpen && (
        <SpecialtyFormDialog
          key="create-specialty"
          open
          onOpenChange={setCreateOpen}
          title="Add specialty"
          description="Add a specialty to the platform."
          submitLabel="Create specialty"
          isPending={isCreating}
          onSubmit={handleCreate}
        />
      )}
      {editingSpecialty && (
        <SpecialtyFormDialog
          key={editingSpecialty.id}
          open
          onOpenChange={handleEditDialogOpenChange}
          title="Edit specialty"
          description="Update the specialty details."
          submitLabel="Save changes"
          specialty={editingSpecialty}
          isPending={isUpdating}
          onSubmit={handleEdit}
        />
      )}
      {deletingSpecialty && (
        <ConfirmDialog
          open
          onOpenChange={handleDeleteDialogOpenChange}
          title="Delete this specialty?"
          description={`This will permanently remove ${deletingSpecialty.title}.`}
          confirmLabel="Delete"
          destructive
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default AdminSpecialties;
