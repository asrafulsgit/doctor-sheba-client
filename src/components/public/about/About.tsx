import {
  Building2,
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { PublicPageHeader } from "../PublicPageHeader";
import { Reveal } from "@/components/shared/Reveal";

const aboutItems = [
  {
    icon: HeartHandshake,
    title: "Patient-centered",
    text: "Clear language and accessible journeys for people of all ages.",
  },
  {
    icon: Stethoscope,
    title: "Doctor-connected",
    text: "Discovery that highlights relevant professional information.",
  },
  {
    icon: Building2,
    title: "Care organized",
    text: "One structured platform for the healthcare journey.",
  },
  {
    icon: ShieldCheck,
    title: "Trust by design",
    text: "Role-aware access and purposeful healthcare UX.",
  },
];

// seo optimization
// export const Route = createFileRoute("/about")({
//   head: () => ({
//     meta: [
//       { title: "About DoctorSheba" },
//       {
//         name: "description",
//         content: "Learn about DoctorSheba’s approach to accessible digital healthcare.",
//       },
//       { property: "og:title", content: "About DoctorSheba" },
//       {
//         property: "og:description",
//         content: "Learn about DoctorSheba’s approach to accessible digital healthcare.",
//       },
//       { property: "og:url", content: "/about" },
//     ],
//     links: [{ rel: "canonical", href: "/about" }],
//   }),
//   component: () => (

//   ),
// });

const About = () => {
  return (
    <>
      <PublicPageHeader
        eyebrow="About us"
        title="A clearer path between patients and doctors"
        description="DoctorSheba is designed for Bangladesh’s healthcare ecosystem, bringing doctor discovery and appointment management into one calm, accessible experience."
      />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Our mission
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">
              Make healthcare access simpler and more organized.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              We aim to reduce the friction people face when finding suitable
              doctors, choosing schedules, and keeping consultation journeys
              organized.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Our vision
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">
              A reliable digital healthcare ecosystem.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Our vision is an environment where patients, doctors, and
              healthcare teams can work together with clarity, trust, and
              appropriate access.
            </p>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aboutItems.map((item) => (
            <div key={item.title} className="border-t-2 border-primary py-6">
              <item.icon className="size-6 text-primary" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <section className="mt-16 rounded-2xl bg-surface-muted p-7 sm:p-10">
          <h2 className="text-3xl font-semibold text-foreground">
            Doctors and facilities
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            Doctor profiles surface specialties, experience, qualifications,
            workplace, designation, fees, ratings, and schedules so people can
            make informed choices without unsupported claims.
          </p>
        </section>
      </main>
    </>
  );
};

export default About;
