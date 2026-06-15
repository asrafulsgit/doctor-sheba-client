import { Reveal } from "../../shared/Reveal";
import { BadgeCheck, Lock, ShieldCheck } from "lucide-react";

const TrustedAndSafety = () => {
  return (
    <section className="border-b border-border bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-primary">
              <Lock className="h-3.5 w-3.5" />
              Trust & Safety
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Your health data is private, encrypted, and yours.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every doctor on DoctorSheba is BMDC-verified. Every record is
              encrypted in transit and at rest, with strict role-based access
              controls.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                { icon: BadgeCheck, t: "BMDC-verified doctors only" },
                { icon: Lock, t: "End-to-end encryption" },
                { icon: ShieldCheck, t: "Role-based access controls" },
              ].map((i) => {
                const Icon = i.icon;
                return (
                  <li
                    key={i.t}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    {i.t}
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Verified Doctors", value: "100%" },
                { label: "Uptime SLA", value: "99.9%" },
                { label: "Avg Response", value: "<2 min" },
                { label: "Data Centers", value: "ISO 27001" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated"
                >
                  <p className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {m.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default TrustedAndSafety;
