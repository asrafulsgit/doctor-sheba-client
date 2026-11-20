"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/shared/DashboardHeader";
import DoctorsFilter from "./DoctorsFilter";
import DoctorRecordTable from "./DoctorRecordTable";
import Link from "next/link";

const AdminDoctors = () => {
  return (
    <>
      <DashboardHeader
        title="Doctors"
        description="Add, verify, edit or suspend doctors."
        actions={
          <Link href={"/admin/doctors/create"}>
            <Button>
              <Plus className="h-4 w-4" />
              Add doctor
            </Button>
          </Link>
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
