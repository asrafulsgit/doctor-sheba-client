import { bloodGroupLabels } from "@/constants/patient/data";
import { getDate } from "@/helpers/getDate";
import { SinglePatientRecord } from "@/lib/hooks/UseDoctor"; 
import { Cake, Calendar, Mail, MapPin, Phone, User2 } from "lucide-react";
import Image from "next/image";

const PatientPersonalDetails = ({
  patient
}: {
  patient: SinglePatientRecord;
}) => {
  return (
    <section className="flex flex-wrap items-start gap-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div
        className="grid h-20 w-19 place-items-center overflow-hidden rounded-full
          bg-primary-soft text-2xl font-semibold text-primary"
      >
        {patient?.profilePhoto ? (
          <Image
            src={patient.profilePhoto ?? ""}
            alt="Profile"
            className="h-full w-full object-cover"
            width={75}
            height={80}
          />
        ) : (
          <span>{patient?.name.charAt(0).toUpperCase()}</span>
        )}
      </div>
      <div className="flex-1 min-w-[260px]">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-semibold">{patient?.name}</h2>
          {patient.patientHealthData?.bloodGroup && (
            <span className="rounded-md bg-destructive-soft px-2 py-0.5 text-xs font-medium text-destructive">
              {bloodGroupLabels[patient.patientHealthData?.bloodGroup]}
            </span>
          )}
        </div>
        <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {patient?.email}
          </p>
          {patient?.contactNumber && <p className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {patient?.contactNumber}
          </p>}
          {patient?.address && <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {patient?.address}
          </p>}
          <p className="flex items-center gap-2">
            <User2 className="h-4 w-4" />
            {patient.patientHealthData?.gender === "MALE" ? "Male" : "Female"}
          </p>
          {patient?.patientHealthData?.dateOfBirth && (
            <p className="flex items-center gap-2">
              <Cake className="h-4 w-4" />
              {getDate(patient.patientHealthData.dateOfBirth, "dd MMM yyyy")}
            </p>
          )}
          <p className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Total visits · {patient.totalVisits}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PatientPersonalDetails;
