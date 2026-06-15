import React from "react";
import { Reveal, Stagger } from "../../shared/Reveal";
import { Clock, HeartPulse, ShieldCheck } from "lucide-react";

const whyDoctorShebaCardItems = [
  {
    icon: Clock,
    title: "No more waiting",
    text: "Skip queues with online booking and clear time slots.",
  },
  {
    icon: ShieldCheck,
    title: "Secure records",
    text: "Your medical data is encrypted and access-controlled.",
  },
  {
    icon: HeartPulse,
    title: "Centralized care",
    text: "Appointments, prescriptions and reports — one place.",
  },
];

const WhyDoctorSheba = () => {
  return (
    <section className="border-b border-border bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why DoctorSheba
          </h2>
          <p className="mt-3 text-muted-foreground">
            Long hospital queues, manual booking, and scattered records — we
            built a centralized digital healthcare experience that just works.
          </p>
        </Reveal>
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyDoctorShebaCardItems.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-border 
                bg-card p-6 shadow-soft transition-all duration-300  
                hover:border-primary/40 hover:shadow-elevated"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-soft opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
                <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-primary to-primary/0 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};

export default WhyDoctorSheba;
