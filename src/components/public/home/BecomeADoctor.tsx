import React from 'react'
import { Reveal } from '../../shared/Reveal'
import { Briefcase } from 'lucide-react'
import { Button } from '../../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ApplicationMeta } from '@/lib/api/api-client'

interface BecomeADoctorProps {
  metadata: ApplicationMeta | null;
}

const BecomeADoctor = ({ metadata }: BecomeADoctorProps) => {

  const stats = [
    { value: metadata?.doctorsCount ?? 0, label: "Doctors" },
    { value: metadata?.patientsCount ?? 0, label: "Patients" },
    { value: metadata?.appointmentsCount ?? 0, label: "Appointments" },
    { value: metadata?.specialtiesCount ?? 0, label: "Specialties" },
  ];
  return (
   <section className="bg-surface py-10 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 sm:gap-10 rounded-3xl border border-border 
          bg-card p-5 sm:p-8 shadow-soft lg:grid-cols-5 lg:p-12">
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
                — without the paperwork. Join {metadata?.doctorsCount ?? 0}+ verified doctors already on the platform.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className={cn("px-6 sm:px-8")} >
                  <Link href="/auth/register">Join as a doctor</Link>
                </Button>
                <Button asChild size="lg" className={cn("px-6 sm:px-8")} variant="outline">
                  <Link href="/about">Learn more</Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-border bg-surface p-5 text-center transition-colors hover:border-primary/40"
                  >
                    <p className="text-2xl font-bold text-primary">{m.value.toLocaleString()}+</p>
                    <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
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
