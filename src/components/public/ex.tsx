export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DoctorSheba — Digital Healthcare Made Simple" },
      {
        name: "description",
        content:
          "Find qualified doctors in Bangladesh, book appointments in minutes, and manage prescriptions and medical records — all in one secure place.",
      },
      {
        property: "og:title",
        content: "DoctorSheba — Digital Healthcare Made Simple",
      },
      {
        property: "og:description",
        content:
          "A trusted healthcare platform connecting patients and doctors across Bangladesh.",
      },
    ],
  }),
  component: HomePage,
});

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

function HomePage() {
  const featured = DOCTORS.slice(0, 4);
  return (
    <PublicLayout>
      {/* HERO */}

      {/* WHY */}
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
            {[
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
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
                </div>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* HOW IT WORKS */}
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
                  className="relative rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      Step {i + 1}
                    </span>
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

      {/* TOP DOCTORS */}
      <section className="border-b border-border bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Top doctors this week
              </h2>
              <p className="mt-2 text-muted-foreground">
                Highly rated professionals available right now.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/doctors">
                Browse all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </Stagger>
        </div>
      </section>

      {/* SPECIALTIES */}
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
                to="/doctors"
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

      {/* STATS */}
      <section className="border-b border-border bg-primary py-16 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 text-center sm:grid-cols-4 sm:px-6 lg:px-8">
          {[
            { value: 500, suffix: "+", label: "Verified Doctors" },
            { value: 20000, suffix: "+", label: "Active Patients" },
            { value: 100000, suffix: "+", label: "Appointments" },
            { value: 30, suffix: "+", label: "Specialties" },
          ].map((s) => (
            <div key={s.label}>
              <CountUp
                to={s.value}
                suffix={s.suffix}
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              />
              <p className="mt-1 text-sm text-primary-foreground/80">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
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

      {/* FAQ teaser */}
      <section className="border-b border-border bg-surface py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Common questions
            </h2>
          </Reveal>
          <div className="mt-10 rounded-2xl border border-border bg-card p-2 shadow-soft">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.slice(0, 4).map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="px-4 text-left">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* EMERGENCY + CTA */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <Reveal className="rounded-3xl border border-destructive/20 bg-destructive-soft p-8 lg:col-span-1">
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
                Join DoctorSheba today and book your first appointment in under
                a minute.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/auth/register">Create your account</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Link to="/doctors">Browse doctors</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}