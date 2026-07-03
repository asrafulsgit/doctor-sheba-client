import { Button } from "@/components/ui/button";
import { IDoctor } from "@/types/doctors";
import { Calendar, MapPin, Stethoscope } from "lucide-react";
import Link from "next/link";

const MyDoctorCard = ({ doctor }: { doctor: IDoctor }) => {
  return (
    <div
      key={doctor.id}
      className="rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-base font-semibold text-primary-foreground">
          {doctor.name.split(" ").slice(-1)[0][0]}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-foreground">
            {doctor.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {doctor.doctorSpecialities && doctor?.doctorSpecialities[0]?.specialities.title}{" "}
            · {doctor.experience}+ yrs
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
        <p className="inline-flex items-center gap-1.5">
          <MapPin className="h-3 w-3" />
          {doctor.currentWorkingPlace}
        </p>
        {/* <p className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  {visits} visit{visits > 1 ? "s" : ""}
                </p> */}
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
