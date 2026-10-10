import { BriefcaseMedical, CalendarDays, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IDoctor } from "@/types/doctors";
import Link from "next/link";
import Image from "next/image";

export function DoctorCard({ doctor }: { doctor: IDoctor }) {
  const defaultImage =
    doctor.gender === "MALE"
      ? "https://png.pngtree.com/png-clipart/20241231/original/pngtree-the-doctor-character-is-cheerful-with-a-flat-design-style-vector-png-image_18358910.png"
      : "https://png.pngtree.com/png-vector/20241225/ourmid/pngtree-doctor-woman-with-stethoscope-and-headset-icon-image-vector-illustration-design-png-image_14818447.png";
  return (
    <Card
      className="group h-full gap-2 rounded-md sm:rounded-lg overflow-hidden border-border shadow-xs py-0
    transition-[transform,box-shadow] duration-200  hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
        <Image
          src={doctor.profilePhoto ?? defaultImage}
          alt={`Portrait of ${doctor.name}`}
          width={1200}
          height={1200}
          loading="lazy"
          className="h-full w-full object-contain transition-transform 
          duration-500 group-hover:scale-[1.025]"
        />
        {/* <span className="absolute left-4 top-4 rounded-full border border-border bg-surface/95 px-3 py-1 text-xs font-medium text-foreground shadow-xs">
          {doctor?.available ? "Available to book" : "Next slots soon"}
        </span> */}
      </div>
      <CardContent className="px-1 sm:px-2 pb-1 sm:pb-2">
        <div>
          <div className="flex justify-between">
            <p className="text-[10px] sm:text-xs font-medium text-primary">
              {doctor?.doctorSpecialities
                ?.map((specialty) => specialty.specialities.title)
                .join(", ")}
            </p>

            <span
              className="inline-flex items-center gap-0.5 rounded-md bg-warning-soft px-1 
          py-0.5 text-[10px] sm:text-xs font-semibold text-warning-foreground"
            >
              <Star className="size-3 fill-current" aria-hidden="true" />{" "}
              {doctor?.averageRating?.toFixed(1)}
            </span>
          </div>

          <h3 className="text-xs sm:text-base font-semibold tracking-tight text-foreground">
            {doctor.name}
          </h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            {doctor.designation}
          </p>
        </div>

        <div className="mt-1 sm:mt-2 grid grid-cols-2 gap-3 border-y border-border py-1 sm:py-2 text-[10px] sm:text-xs">
          <span className="inline-flex items-center gap-1 sm:gap-2 text-muted-foreground">
            <BriefcaseMedical
              className="size-3.5 sm:size-4 text-primary"
              aria-hidden="true"
            />{" "}
            {doctor.experience} years
          </span>
          <span className="text-right font-semibold text-foreground">
            ৳{doctor?.appointmentFee?.toLocaleString("en-BD")}
          </span>
        </div>

        <div className="mt-1 sm:mt-2 grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="h-6 rounded-sm px-2 text-[10px] sm:text-xs sm:h-8 sm:rounded-md sm:px-3"
            asChild
          >
            <Link href={`/doctors/${doctor.id}`}>Profile</Link>
          </Button>

          <Button
            className="h-6 rounded-sm px-2 text-[10px] sm:text-xs sm:h-8 sm:rounded-md sm:px-3"
            asChild
          >
            <Link href={`/doctors/${doctor.id}`}>
             <CalendarDays
  className="hidden sm:block"
  aria-hidden="true"
/>
              Book
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
