import { Reveal } from "../../shared/Reveal";
import { PhoneCall } from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const EmergencyCta = () => {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal
            className="rounded-3xl border border-destructive/20 
            bg-destructive-soft p-8 lg:col-span-1"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-destructive text-destructive-foreground">
                <PhoneCall className="h-5 w-5" />
              </span>
              <p className="text-sm font-medium text-destructive">
                24/7 Emergency
              </p>
            </div>
            <p className="mt-3 text-2xl font-bold tracking-tight text-foreground">
              Call 10666
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Immediate response for critical medical emergencies anywhere in
              Bangladesh.
            </p>
          </Reveal>

          <Reveal
            delay={0.1}
            className="rounded-3xl border border-border bg-primary p-10 text-primary-foreground lg:col-span-2"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to take charge of your health?
            </h2>
            <p className="mt-3 max-w-xl text-primary-foreground/85">
              Join DoctorSheba today and book your first appointment in under a
              minute.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className={cn(
                  "",
                  "bg-secondary text-white shadow-sm hover:bg-secondary/80",
                )}
              >
                <Link href="/auth/register">Create your account</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href="/doctors">Browse doctors</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default EmergencyCta;
