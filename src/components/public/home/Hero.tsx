import { Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "../../shared/Reveal";
import Link from "next/link";

import heroImage from "@/assets/hero-image.png";
import Image from "next/image";

const stats = [
  { label: "Doctors", v: "500+" },
  { label: "Specialties", v: "30+" },
  { label: "Rating", v: "4.8★" },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b 
    from-primary-soft/30 to-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Trusted by 500+ doctors across Bangladesh
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Digital healthcare,
            <br />
            <span className="text-primary">made simple.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Find qualified doctors, book appointments in minutes, and keep all
            your prescriptions and medical records in one secure place.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/doctors">
                <Search className="h-4 w-4" />
                Find a Doctor
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/auth/register">Book Appointment</Link>
            </Button>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="mt-1 text-xl font-semibold text-foreground">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface-muted shadow-lg">
            <Image
              src={heroImage}
              alt="Bangladeshi doctor in a modern clinic"
              width={1536}
              height={1024}
              fetchPriority="high"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-4 rounded-xl border border-border bg-surface p-4 shadow-md sm:left-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Simple path to care
            </p>
            <p className="mt-1 font-semibold text-foreground">
              Search → schedule → consult
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
