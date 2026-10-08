"use client";

import { Edit3, Power, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState, ErrorState } from "@/components/shared/PageState";
import RowSkeleton from "@/components/shared/SkeletonSet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types/user";
import { StatusBadge } from "@/components/ui/badge";
import { useAdmins } from "@/lib/hooks/useAdmin";

type AdminsTableProps = {
  onEdit: (admin: User) => void;
  onToggleStatus: (admin: User) => void;
};

const headClass = "uppercase text-xs text-muted-foreground";

const AdminsTable = ({ onEdit, onToggleStatus }: AdminsTableProps) => {
  const { data, isLoading, isError, error } = useAdmins();
  const admins = data?.data ?? [];

  if (isLoading) {
    return <RowSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load admins"
        description={error.message || "Please try again later."}
      />
    );
  }

  if (!admins.length) {
    return (
      <EmptyState
        title="No admins found"
        description="Invite an admin to help manage the platform."
      />
    );
  }

  return (
    <div className="mt-2 overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={headClass}>Admin</TableHead>
            <TableHead className={headClass}>Role</TableHead>
            <TableHead className={headClass}>Contact</TableHead>
            <TableHead className={headClass}>Status</TableHead>
            <TableHead className={`text-right ${headClass}`}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => {
            const isActive = admin.status === "ACTIVE";
            const isSuper = admin.role === "SUPER_ADMIN";

            return (
              <TableRow key={admin.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
                      <UserCog className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {admin.admin.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {admin.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      isSuper
                        ? "bg-secondary-soft text-secondary"
                        : "bg-primary-soft text-primary"
                    }`}
                  >
                    {isSuper ? "Super admin" : "Admin"}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {admin.admin.contactNumber || "N/A"}
                </TableCell>
                <TableCell>
                  <StatusBadge status={admin.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex items-center justify-end gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(admin)}
                      aria-label={`Edit ${admin.admin.name}`}
                    >
                      <Edit3 className="h-4 w-4" aria-hidden="true" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={isActive ? "text-destructive" : undefined}
                      onClick={() => onToggleStatus(admin)}
                      aria-label={`${isActive ? "Deactivate" : "Activate"} ${admin.admin.name}`}
                    >
                      <Power className="h-4 w-4" aria-hidden="true" />
                      {isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminsTable;
