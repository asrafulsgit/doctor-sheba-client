"use client";

import { Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { User } from "@/types/user";
import AdminsTable from "./AdminsTable";
import AdminFormDialog from "./AdminFormDialog";
import {
  useSuspendOrActivateAdmin,
  useUpdateAdmin,
} from "@/lib/hooks/useAdmin";
import UpdateAdminFormDialog, {
  UpateAdminFormValues,
} from "./UpdateAdminFormDialog";
import { AdminInput, useCreateAdmin } from "@/lib/hooks/useUser";

const AdminAdmins = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<User | null>(null);
  const [toggleAdmin, setToggleAdmin] = useState<User | null>(null);

  const { mutate: createAdminMutate, isPending: isCreating } = useCreateAdmin();
  const { mutate: updateAdminMutate, isPending: isUpdating } = useUpdateAdmin();
  const { mutate: suspendOrActivateMutate } = useSuspendOrActivateAdmin();

  const isDeactivating = toggleAdmin?.status === "ACTIVE";

  const handleCreate = useCallback(async (data: AdminInput) => {
    createAdminMutate(data, {
      onSuccess: () => {
        toast.success("Admin invited");
        setCreateOpen(false);
      },
      onError: (err: Error) =>
        toast.error(err.message || "Unable to invite admin"),
    });
  }, [createAdminMutate]);

  const handleEdit = useCallback(async (data: UpateAdminFormValues) => {
    if (!editingAdmin) return;

    updateAdminMutate(
      { id: editingAdmin.id, ...data },
      {
        onSuccess: () => {
          toast.success("Admin updated");
          setEditingAdmin(null);
        },
        onError: (err: Error) =>
          toast.error(err.message || "Unable to update admin"),
      },
    );
  }, [editingAdmin, updateAdminMutate]);

  const handleToggle = useCallback(async () => {
    if (!toggleAdmin?.admin.id) return;

    suspendOrActivateMutate(
      {
        id: toggleAdmin.admin.id,
        isDelete: isDeactivating,
      },
      {
        onSuccess: () => {
          toast.success(
            isDeactivating ? "Admin deactivated" : "Admin reactivated",
          );
          setToggleAdmin(null);
        },
        onError: (error: Error) =>
          toast.error(
            error
              ? error.message
              : `Unable to ${isDeactivating ? "deactivate" : "reactivate"} admin`,
          ),
      },
    );
  }, [isDeactivating, suspendOrActivateMutate, toggleAdmin]);

  const handleEditDialogOpenChange = useCallback((open: boolean) => {
    if (!open) setEditingAdmin(null);
  }, []);

  const handleToggleDialogOpenChange = useCallback((open: boolean) => {
    if (!open) setToggleAdmin(null);
  }, []);

  return (
    <>
      <DashboardHeader
        title="Admins"
        description="Manage platform administrators and their roles."
        actions={
          <Button type="button" onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Invite admin
          </Button>
        }
      />

      <AdminsTable onEdit={setEditingAdmin} onToggleStatus={setToggleAdmin} />

      {createOpen && (
        <AdminFormDialog
          key="create-admin"
          open
          onOpenChange={setCreateOpen}
          title="Invite admin"
          description="Invite a new administrator to the platform."
          submitLabel="Send invite"
          isPending={isCreating}
          onSubmit={handleCreate}
        />
      )}
      {editingAdmin && (
        <UpdateAdminFormDialog
          key={editingAdmin.id}
          open
          onOpenChange={handleEditDialogOpenChange}
          title="Edit admin"
          description="Update the administrator's details."
          submitLabel="Save changes"
          admin={editingAdmin}
          isPending={isUpdating}
          onSubmit={handleEdit}
        />
      )}
      {toggleAdmin && (
        <ConfirmDialog
          open
          onOpenChange={handleToggleDialogOpenChange}
          title={
            isDeactivating ? "Deactivate this admin?" : "Reactivate this admin?"
          }
          description={
            isDeactivating
              ? `${toggleAdmin.admin.name} will lose access to the dashboard.`
              : `${toggleAdmin.admin.name} will regain access to the dashboard.`
          }
          confirmLabel={isDeactivating ? "Deactivate" : "Activate"}
          destructive={isDeactivating}
          onConfirm={handleToggle}
        />
      )}
    </>
  );
};

export default AdminAdmins;
