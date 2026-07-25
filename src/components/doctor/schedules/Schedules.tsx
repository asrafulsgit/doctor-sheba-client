"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { useDoctorAvailableSchedules } from "@/lib/hooks/schedule";
import useQueryManager from "@/hooks/UseQueryManager";
import { DoctorAvailableSchedulesFilters } from "@/lib/query/query-keys";

// seo optimization
// export const Route = createFileRoute("/doctor/schedules")({
//   head: () => ({ meta: [{ title: "Schedules — DoctorSheba" }] }),
//   component: DoctorSchedules,
// });

import { format, parseISO } from "date-fns";
import { ISchedule } from "@/types/schedule";
import { getSchedulesByDay } from "@/helpers/getSchedulesByDay";
import { cn } from "@/lib/utils";
import {
  Calendar,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  Filter,
  Pill,
} from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AvailableSchedules from "./AvailableSchedules";
import ScheduledSchedules from "./ScheduledSchedules";
import SchedulesFilter from "./SchedulesFilter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DoctorSchedules = () => {
  return (
    <>
      <DashboardHeader
        title="Schedules"
        description="Define your weekly availability and time slots."
      />
      <Tabs defaultValue="available">
        <div className="flex  justify-between items-center">
          <TabsList>
            <TabsTrigger value="available">
              <Calendar className="h-4 w-4 mr-1" />
              Available
            </TabsTrigger>
            <TabsTrigger value="scheduled">
              <CalendarDays className="h-4 w-4 mr-1" />
              Scheduled
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2 sm:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size={"icon"}>
                  <Filter />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Filters</DialogTitle>
                </DialogHeader>
                <SchedulesFilter />
              </DialogContent>
            </Dialog>
          </div>

          <div className="hidden sm:flex gap-3">
            <SchedulesFilter />
          </div>
        </div>

        <TabsContent value="available" className="mt-4">
          <AvailableSchedules />
        </TabsContent>

        <TabsContent value="scheduled" className="mt-4">
          <ScheduledSchedules />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default DoctorSchedules;
