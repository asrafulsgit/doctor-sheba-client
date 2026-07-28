"use client";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button"; 
import {
  ArrowRight,
  Award,
  Briefcase,
  MapPin,
  Phone,
  Star,
  Wallet2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DoctorProfileSkeleton } from "./DoctorProfileSkeleton";
import { EmptyState } from "@/components/shared/PageState";
import { useDoctorDetails } from "@/lib/hooks/UseDoctor";

const DoctorProfile = () => {
  const params = useParams();
  const { data, isLoading, isError, error } = useDoctorDetails(
    params.id as string,
  );
  const doctor = data?.data?.doctor;
  const reviews = data?.data?.reviews;
    
  if (isLoading) {
    return <DoctorProfileSkeleton />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Doctor not found"
        description="We couldn't load this doctor's profile. The profile may have been removed, the link may be incorrect, or there may be a temporary network issue. Please try again later."
      />
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-primary-soft/60 to-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground shadow-elevated">
                {doctor?.name
                  .replace(/^Dr\.?\s+/i, "")
                  .split(" ")
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {doctor?.doctorSpecialities?.map((s) => (
                    <span
                      key={s.specialities.id}
                      className="rounded-full bg-secondary-soft px-2.5 py-0.5 text-xs font-medium text-secondary"
                    >
                      {s.specialities.title}
                    </span>
                  ))}
                </div>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {doctor?.name}
                </h1>
                <p className="mt-1 text-muted-foreground">
                  {doctor?.designation}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                  <span className="inline-flex items-center gap-1 text-warning-foreground">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <strong className="text-foreground">
                      {doctor?.averageRating.toFixed(1)}
                    </strong>
                    <span className="text-muted-foreground">
                      average rating
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Briefcase className="h-4 w-4 text-primary" />
                    {doctor?.experience}+ years
                  </span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    {doctor?.currentWorkingPlace}
                  </span>
                </div>
              </div>
              <Button asChild size="lg">
                <Link href={`/booking/${doctor?.id}`}>
                  Book Appointment
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-10 lg:px-8">
        <div className="space-y-8 lg:col-span-2">
          <Reveal className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-semibold">About</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {doctor?.name} is a {doctor?.designation.toLowerCase()} with over{" "}
              {doctor?.experience} years of clinical experience at{" "}
              {doctor?.currentWorkingPlace}. Trained as {doctor?.qualification},
              the doctor focuses on evidence-based, patient-centered care with
              an emphasis on long-term outcomes.
            </p>
          </Reveal>

          <Reveal className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Credentials</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Award,
                  label: "Qualification",
                  value: doctor?.qualification,
                },
                {
                  icon: Briefcase,
                  label: "Experience",
                  value: `${doctor?.experience} years`,
                },
                {
                  icon: MapPin,
                  label: "Working at",
                  value: doctor?.currentWorkingPlace,
                },
                {
                  icon: Award,
                  label: "Registration",
                  value: doctor?.registrationNumber,
                },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.label}
                    className="flex items-start gap-3 rounded-lg bg-surface p-4"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <dt className="text-xs text-muted-foreground">
                        {c.label}
                      </dt>
                      <dd className="text-sm font-medium text-foreground">
                        {c.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </Reveal>

          <Reveal className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Patient reviews</h2>
              <span className="text-sm text-muted-foreground">
                Showing recent reviews
              </span>
            </div>
            <div className="mt-4 space-y-4">
              {reviews?.length ?  reviews?.map((r) => (
                <div
                  key={r.id}
                  className="rounded-lg border border-border bg-surface p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">
                      {r.patient.name}
                    </p>
                    <div className="flex items-center gap-0.5 text-warning">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < r.rating ? "fill-current" : "opacity-30"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
                </div>
              )) : <p className="mt-4 text-center text-sm text-muted-foreground">No review.</p>}
            </div>
          </Reveal>
        </div>

        <aside className="mt-8 lg:mt-0">
          <Reveal className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-foreground">
                ৳{doctor?.appointmentFee.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">
                consultation
              </span>
            </div>
            <Button asChild className="mt-4 w-full" size="lg">
              <Link href={`/booking/${doctor?.id}`}>Book Appointment</Link>
            </Button>
            <div className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wallet2 className="h-4 w-4 text-primary" />
                Secure online payment
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                Free reschedule up to 2 hours before
              </div>
            </div>
          </Reveal>
        </aside>
      </section>
    </>
  );
};

export default DoctorProfile;

// export const Route = createFileRoute("/doctors/$id")({
//   loader: ({ params }) => {
//     const doctor = getDoctorById(params.id);
//     if (!doctor) throw notFound();
//     return { doctor };
//   },
//   head: ({ loaderData }) => ({
//     meta: loaderData
//       ? [
//           { title: `${loaderData.doctor.name} — DoctorSheba` },
//           {
//             name: "description",
//             content: `${loaderData.doctor.designation} · ${loaderData.doctor.qualification}. Book an appointment on DoctorSheba.`,
//           },
//           { property: "og:title", content: `${loaderData.doctor.name} — DoctorSheba` },
//           {
//             property: "og:description",
//             content: `${loaderData.doctor.designation} at ${loaderData.doctor.currentWorkingPlace}.`,
//           },
//         ]
//       : [{ title: "Doctor — DoctorSheba" }],
//   }),
//   notFoundComponent: () => (
//     <PublicLayout>
//       <div className="mx-auto max-w-2xl px-4 py-24 text-center">
//         <h1 className="text-2xl font-semibold">Doctor not found</h1>
//         <p className="mt-2 text-muted-foreground">
//           This doctor's profile may have been removed.
//         </p>
//         <Button asChild className="mt-6">
//           <Link to="/doctors">Browse all doctors</Link>
//         </Button>
//       </div>
//     </PublicLayout>
//   ),
//   errorComponent: ({ reset }) => (
//     <PublicLayout>
//       <div className="mx-auto max-w-2xl px-4 py-24 text-center">
//         <h1 className="text-2xl font-semibold">Couldn't load this profile</h1>
//         <Button className="mt-6" onClick={reset}>Try again</Button>
//       </div>
//     </PublicLayout>
//   ),
//   component: DoctorDetail,
// });
