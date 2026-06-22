import { BriefcaseMedical, CalendarDays, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IDoctor } from "@/types/doctors";
import Link from "next/link";
import Image from "next/image";

export function DoctorCard({ doctor }: { doctor: IDoctor }) {
  return (
    <Card
      className="group h-full overflow-hidden border-border shadow-xs 
    py-0
    transition-[transform,box-shadow] duration-200  hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
        <Image
          src={doctor.profilePhoto as string}
          alt={`Portrait of ${doctor.name}`}
          width={768}
          height={896}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform 
          duration-500 group-hover:scale-[1.025]"
        />
        <span className="absolute left-4 top-4 rounded-full border border-border bg-surface/95 px-3 py-1 text-xs font-medium text-foreground shadow-xs">
          {doctor.available ? "Available to book" : "Next slots soon"}
        </span>
      </div>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-primary">
              {doctor?.specialties
                ?.map((specialty) => specialty.title)
                .join(", ")}
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
              {doctor.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {doctor.designation}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-warning px-2 py-1 text-sm font-semibold text-warning-foreground">
            <Star className="size-3.5 fill-current" aria-hidden="true" />{" "}
            {doctor?.averageRating?.toFixed(1)}
          </span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 border-y border-border py-4 text-sm">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <BriefcaseMedical
              className="size-4 text-primary"
              aria-hidden="true"
            />{" "}
            {doctor.experience} years
          </span>
          <span className="text-right font-semibold text-foreground">
            ৳{doctor?.appointmentFee?.toLocaleString("en-BD")}
          </span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button variant="outline" asChild>
            <Link href={`/doctors/${doctor.id}`}>View profile</Link>
          </Button>
          <Button asChild>
            <Link href={`/doctors/${doctor.id}`}>
              <CalendarDays aria-hidden="true" /> Book
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
