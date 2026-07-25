"use client";
import { EmptyState } from "@/components/shared/PageState";
import { bloodGroupLabels } from "@/constants/patient/data";
import { getDate } from "@/helpers/getDate";
import { usePatientRecord } from "@/lib/hooks/UseDoctor";
import {
  Cake,
  Calendar,
  FileText,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Pill,
  User2,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import PatientPersonalDetails from "./PatientPersonalDetails";
import HealthDetails from "./HealthDetails";
import { IHealthProfile } from "@/types/patient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Prescriptions from "./Prescriptions";
import Reports from "./Reports";
import PatientDetailsSkeleton from "./PatientDetailsSkeleton";

const PatientDetails = () => {
  const params = useParams();

  const patientId = params.id as string;
  const { data, isLoading, isError, error } = usePatientRecord(patientId);
  const patient = data?.data;
  const prescriptions = patient?.prescriptions;
  const healthData = patient?.patientHealthData;
  const reports = patient?.medicalReport;
  if (isLoading) {
    return <PatientDetailsSkeleton />;
  }
  if (isError || !patient) {
    return (
      <EmptyState
        title="Something went wrong"
        description={
          isError ? error.message : "We couldn't find this patient record."
        }
      />
    );
  }
  return (
    <>
      <PatientPersonalDetails patient={patient} />
      {healthData && (
        <HealthDetails
          health={healthData}
          lastConsutant={patient.lastConsultant}
          lastVisit={patient.lastVisit}
        />
      )}

      <section className="mt-6 min-h-50">
        <Tabs defaultValue="prescriptions">
          <TabsList>
            <TabsTrigger value="prescriptions">
              <Pill className="h-4 w-4" />
              Prescriptions ({prescriptions?.length ?? 0})
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileText className="h-4 w-4" />
              Reports ({reports?.length ?? 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions" className="mt-4">
            {prescriptions?.length ? (
              <Prescriptions prescriptions={prescriptions} />
            ) : (
              <Empty text="No prescriptions on record." />
            )}
          </TabsContent>

          <TabsContent value="reports" className="mt-4">
            {reports?.length ? (
              <Reports reports={reports} />
            ) : (
              <Empty text="No medical reports uploaded." />
            )}
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

function Empty({ text }: { text: string }) {
  return (
    <p className="rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center text-sm text-muted-foreground">
      {text}
    </p>
  );
}

export default PatientDetails;
