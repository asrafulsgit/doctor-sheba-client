import React from 'react'
import { Reveal } from '../../shared/Reveal'
import { Briefcase } from 'lucide-react'
import { Button } from '../../ui/button'
import Link from 'next/link'

const BecomeADoctor = () => {
  return (
   <section className="border-b border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 rounded-3xl border border-border bg-card p-8 shadow-soft lg:grid-cols-5 lg:p-12">
            <Reveal className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
                <Briefcase className="h-3.5 w-3.5" />
                For Doctors
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Grow your practice with DoctorSheba
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Manage schedules, accept online consultations, and reach thousands of patients
                — without the paperwork. Join 500+ verified doctors already on the platform.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/auth/register">Join as a doctor</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/about">Learn more</Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: "500+", l: "Doctors" },
                  { v: "20k+", l: "Patients" },
                  { v: "10000+", l: "Appointments" },
                  { v: "30+", l: "Specialties" },
                ].map((m) => (
                  <div
                    key={m.l}
                    className="rounded-2xl border border-border bg-surface p-5 text-center transition-colors hover:border-primary/40"
                  >
                    <p className="text-2xl font-bold text-primary">{m.v}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{m.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
  )
}

export default BecomeADoctor
