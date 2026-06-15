import React from "react";
import { Reveal, Stagger } from "../shared/Reveal";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ayesha R.",
    role: "Patient — Dhaka",
    quote:
      "I booked a cardiology appointment in under a minute. The doctor was wonderful and the prescription was on my dashboard instantly.",
  },
  {
    name: "Dr. Imran H.",
    role: "Orthopedic Surgeon",
    quote:
      "Managing my schedule and patient records is finally simple. DoctorSheba just gets out of the way.",
  },
  {
    name: "Mahin K.",
    role: "Patient — Chattogram",
    quote:
      "I used to spend half a day at the hospital. Now everything from booking to prescriptions is on my phone.",
  },
];

const Testimonials = () => {
  return (
    <section className="border-b border-border bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by patients & doctors
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <Quote className="h-5 w-5 text-primary" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                  {t.name.slice(0, 1)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <div className="ml-auto flex items-center gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Testimonials;
