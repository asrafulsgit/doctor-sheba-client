"use client";
import * as React from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { activatedDashboard } from "@/constants/public/user";
import DashboardHeader from "@/components/shared/DashboardHeader";
import SettingsForm from "./SettingsForm";

// export const Route = createFileRoute("/doctor/settings")({
//   head: () => ({ meta: [{ title: "Settings — DoctorSheba" }] }),
//   component: SettingsPage,
// });

const DoctorSettings = () => {
  return (
    <>
      <DashboardHeader
        title="Settings"
        description="Profile, credentials and notifications."
      />
      <SettingsForm />
    </>
  );
};

export default DoctorSettings;
