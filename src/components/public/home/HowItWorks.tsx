import React from "react";
import { Reveal, Stagger } from "../../shared/Reveal";
import { ArrowRight, CalendarCheck2, FileText, Search, Stethoscope } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Find a Doctor",
    text: "Search by specialty, gender, experience or availability.",
  },
  {
    icon: CalendarCheck2,
    title: "Book Appointment",
    text: "Pick a time slot that works for you in a few taps.",
  },
  {
    icon: Stethoscope,
    title: "Visit Doctor",
    text: "Meet your doctor in person or via secure video call.",
  },
  {
    icon: FileText,
    title: "Get Prescription",
    text: "Receive prescriptions digitally in your dashboard.",
  },
];

const HowItWorks = () => {
  return (
    <section className="border-b border-border bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-muted-foreground">
            Four simple steps from finding the right doctor to getting your
            prescription.
          </p>
        </Reveal>
        <Stagger
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          step={0.1}
        >
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                  key={s.title}
                  className="group relative rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-elevated"
                >
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-[-14px] top-10 hidden h-px w-7 bg-gradient-to-r from-primary/40 to-transparent lg:block"
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground transition-colors group-hover:text-primary">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                  <ArrowRight className="mt-4 h-4 w-4 -translate-x-2 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};

export default HowItWorks;
