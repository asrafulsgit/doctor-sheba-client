import { Button } from "@/components/ui/button";
import { IDoctor } from "@/types/doctors";
import { MapPin, Stethoscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MyDoctorCard = ({ doctor }: { doctor: IDoctor }) => {
  return (
    <div
      key={doctor.id}
      className="rounded-2xl border border-border bg-card p-5 shadow-soft 
      transition hover:-translate-y-0.1 hover:shadow-elevated"
    >
      <div className="flex items-center gap-3">
        <div
          className="grid h-12 w-12 place-items-center rounded-full 
        "
        >
          {doctor.profilePhoto ? (
            <Image
              src={doctor.profilePhoto ?? ""}
              alt="Profile"
              className="h-full w-full rounded-xl object-cover border border-primary-soft"
              width={48}
              height={48}
            />
          ) : (
            <span className="bg-primary text-base font-semibold text-primary-foreground">
              {doctor.name.split(" ").slice(-1)[0][0]}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-foreground">
            {doctor.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {doctor.doctorSpecialities &&
              doctor?.doctorSpecialities[0]?.specialities.title}{" "}
            · {doctor.experience}+ yrs
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
        <p className="inline-flex items-center gap-1.5">
          <MapPin className="h-3 w-3" />
          {doctor.currentWorkingPlace}
        </p>
      </div>
      <div className="mt-4 flex gap-2">
        <Button asChild size="sm" variant="outline" className="flex-1">
          <Link href={`/doctors/${doctor.id}`}>Profile</Link>
        </Button>
        <Button asChild size="sm" className="flex-1">
          <Link href={`/booking/${doctor.id}`}>
            <Stethoscope className="h-4 w-4" />
            Book
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MyDoctorCard;
