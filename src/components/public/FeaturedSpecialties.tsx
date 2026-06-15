import { SPECIALTIES } from "@/constants/public/specialties";
import { Reveal, Stagger } from "../shared/Reveal";
import Link from "next/link";
import { HeartPulse } from "lucide-react";

const FeaturedSpecialties = () => {
  return (
    <section className="border-b border-border bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Care for every specialty
          </h2>
          <p className="mt-3 text-muted-foreground">
            From cardiology to mental health — find the right specialist for
            you.
          </p>
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {SPECIALTIES.slice(0, 10).map((s) => (
            <Link
              key={s.id}
              href="/doctors"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <HeartPulse className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-foreground">
                {s.title}
              </span>
            </Link>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default FeaturedSpecialties;
