"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";

import DoctorSchedulesFilter from "../doctors/DoctorSchedulesFilter";
import SchedulesTable from "./SchedulesTable";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomDialog } from "@/hooks/useDialog";
import CreateSchedule from "./CreateSchedule";

const AdminSchedules = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DashboardHeader
        title="Schedules"
        description="Overview of all schedules."
      />

      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-3 ">
          <DoctorSchedulesFilter />
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-1 h-4 w-4" /> Create schedules
        </Button>
      </div>

      <SchedulesTable />

      <CustomDialog
        open={open}
        onOpenChange={setOpen}
        title="Appointment details"
      >
        <CreateSchedule setOpen={() => setOpen(false)} />
      </CustomDialog>
    </>
  );
};

export default AdminSchedules;
