"use client";

import { Button } from "@/components/ui/button";
import { EmptyState, ErrorState } from "@/components/shared/PageState";
import { useSpecialties } from "@/lib/hooks/UseSpecialty";
import { Specialty } from "@/types/specialties";
import * as LucideIcons from "lucide-react";
import { Edit3, Tags, Trash2, type LucideIcon } from "lucide-react";
import RowSkeleton from "@/components/shared/SkeletonSet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SpecialtiesTableProps = {
  onEdit: (specialty: Specialty) => void;
  onDelete: (specialty: Specialty) => void;
};

const SpecialtiesTable = ({ onEdit, onDelete }: SpecialtiesTableProps) => {
  const { data, isLoading, isError, error } = useSpecialties();
  const specialties = data?.data ?? [];

  if (isLoading) {
    return <RowSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load specialties"
        description={error.message || "Please try again later."}
      />
    );
  }

  if (!specialties.length) {
    return (
      <EmptyState
        title="No specialties found"
        description="Add a specialty to make it available to doctors and patients."
      />
    );
  }

  return (
    <div className="mt-2 overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase text-xs text-muted-foreground">
              Specialty
            </TableHead>
            <TableHead className="uppercase text-xs text-muted-foreground">
              ID
            </TableHead>
            <TableHead className="text-right uppercase text-xs text-muted-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specialties.map((specialty) => {
            const SpecialtyIcon =
              (LucideIcons[
                specialty.icon as keyof typeof LucideIcons
              ] as LucideIcon | undefined) ?? Tags;

            return (
              <TableRow key={specialty.id}>
                <TableCell className="font-medium text-foreground">
                  <span className="inline-flex items-center gap-2">
                    <SpecialtyIcon
                      className="h-4 w-4 text-primary"
                      aria-hidden="true"
                    />
                    {specialty.title}
                  </span>
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {specialty.id}
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex items-center justify-end gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(specialty)}
                      aria-label={`Edit ${specialty.title}`}
                    >
                      <Edit3 className="h-4 w-4" aria-hidden="true" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => onDelete(specialty)}
                      aria-label={`Delete ${specialty.title}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      Delete
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

export default SpecialtiesTable;
