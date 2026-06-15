import React from "react";
import { Reveal, Stagger } from "../shared/Reveal";
import { CalendarCheck2, FileText, Pill, Video } from "lucide-react";

const serviceItems = [
  {
    icon: Video,
    title: "Video Consultation",
    text: "Talk to doctors over secure HD video calls.",
  },
  {
    icon: Pill,
    title: "Digital Prescriptions",
    text: "Receive and refill prescriptions instantly.",
  },
  {
    icon: FileText,
    title: "Medical Records",
    text: "All your reports and history, in one timeline.",
  },
  {
    icon: CalendarCheck2,
    title: "Smart Reminders",
    text: "Never miss an appointment or medication dose.",
  },
];

const Services = () => {
  return (
    <section className="border-b border-border bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need, in one app
          </h2>
          <p className="mt-3 text-muted-foreground">
            A complete suite of digital healthcare services built for modern
            patients.
          </p>
        </Reveal>
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceItems.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft 
                transition-all duration-300 hover:border-primary/40 
                hover:shadow-elevated"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};

export default Services;
