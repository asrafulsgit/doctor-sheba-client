import { IDoctor } from "@/types/doctors";
import { Star } from "lucide-react";

const TopDoctors = ({ doctors }: { doctors: IDoctor[] }) => {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h2 className="text-base font-semibold text-foreground">
        Top performing doctors
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {doctors.map((d) => (
          <div
            key={d.id}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3"
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {d.name.split(" ").slice(-1)[0][0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {d.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {d?.doctorSpecialities &&
                  d?.doctorSpecialities[0]?.specialities.title}
              </p>
            </div>
            <div className="text-right">
              <p className="inline-flex items-center gap-0.5 text-sm font-semibold text-warning-foreground">
                <Star className="h-3.5 w-3.5 fill-current" />
                {d.averageRating}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {d.experience}+ yrs
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDoctors;
