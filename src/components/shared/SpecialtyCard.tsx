import { Specialty } from "@/types/specialties";
import { HeartPulse } from "lucide-react";
import Link from "next/link";

const SpecialtyCard = ({ specialty }: { specialty: Specialty }) => {
  return (
    <>
      <Link
        key={specialty.id}
        href="/doctors"
        className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center shadow-soft transition-transform hover:-translate-y-0.5"
      >
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <HeartPulse className="h-5 w-5" />
        </span>
        <span className="text-sm font-medium text-foreground">{specialty.title}</span>
      </Link>
    </>
  );
};

export default SpecialtyCard;
