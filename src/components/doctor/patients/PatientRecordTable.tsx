"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { IPatient } from "@/types/patient";
import { bloodGroupLabels } from "@/constants/patient/data";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const headers = ["PATIENT", "DOB / GENDER", "BLOOD", "CONTACT", "ACTION"];

const PatientRecordTable = ({ patients }: { patients: IPatient[] }) => {
  return (
    <div className="mt-2 overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((h) => (
              <TableHead
                key={h}
                className="uppercase text-xs text-muted-foreground px-4"
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell className="flex gap-2">
                <Link
                  href={`/doctor/patients/${patient.id}`}
                  className="flex items-center gap-3 text-left"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                    {patient.profilePhoto ? (
                      <Image
                        src={patient.profilePhoto ?? ""}
                        alt="Profile"
                        className="h-full w-full rounded-2xl object-cover"
                        width={10}
                        height={10}
                      />
                    ) : (
                      <span>{patient.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground hover:text-primary hover:underline">
                      {patient.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {patient.email}
                    </p>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {patient?.patientHealthData?.dateOfBirth || "N/A"} ·{" "}
                {patient?.patientHealthData?.gender === "MALE"? "Male" : "Female"}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {patient?.patientHealthData?.bloodGroup &&
                  bloodGroupLabels[patient.patientHealthData.bloodGroup]}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {patient.contactNumber}
              </TableCell>

              <TableCell className="text-center">
                <Link href={`/doctor/patients/${patient.id}`}>
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientRecordTable;
