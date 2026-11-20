"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import SettingsForm from "./SettingsForm";

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
