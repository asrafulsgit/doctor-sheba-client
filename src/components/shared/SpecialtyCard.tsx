import { ISpecialty } from "@/types/specialties";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
export type IconType = React.FC<LucideIcons.LucideProps>;

const SpecialtyCard = ({ specialty }: { specialty: ISpecialty }) => {
  const Icon = LucideIcons[specialty.icon as keyof typeof LucideIcons] as
    | IconType
    | undefined;
  return (
    <>
      <Link
        key={specialty.id}
        href={`/doctors?specialty=${specialty.title}`}
        className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center shadow-soft transition-transform hover:-translate-y-0.5"
      >
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {Icon ? <Icon className="h-5 w-5" /> : null}
        </span>
        <span className="text-sm font-medium text-foreground">
          {specialty.title}
        </span>
      </Link>
    </>
  );
};

export default SpecialtyCard;
