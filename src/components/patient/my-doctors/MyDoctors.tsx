"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import MyDoctorCard from "./MyDoctorCard";
import { useMyDoctors } from "@/lib/hooks/UseDoctor";
import useQueryManager from "@/hooks/UseQueryManager";
import { IDoctorFilter } from "@/types/doctors";
import { EmptyState } from "@/components/shared/PageState";
import { MyDoctorCardSkeleton } from "./MyDoctorCardSkeleton";
import MyDoctorsGrid from "./MyDoctorsGrid";

const PatientMyDoctors = () => {
  return (
    <>
      <DashboardHeader
        title="My Doctors"
        description="Doctors you have consulted with."
      />

      <MyDoctorsGrid />
    </>
  );
};

export default PatientMyDoctors;
