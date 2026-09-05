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
    </>
  );
};

export default AdminDoctors;
