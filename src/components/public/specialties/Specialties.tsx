// seo optimization
// export const Route = createFileRoute("/specialties")({
//   head: () => ({
//     meta: [
//       { title: "Medical Specialties | DoctorSheba" },
//       { name: "description", content: "Explore medical specialties and find relevant doctors." },
//       { property: "og:title", content: "Medical Specialties | DoctorSheba" },
//       {
//         property: "og:description",
//         content: "Explore medical specialties and find relevant doctors.",
//       },
//       { property: "og:url", content: "/specialties" },
//     ],
//     links: [{ rel: "canonical", href: "/specialties" }],
//   })
// });

import { StaggerGroup, StaggerItem } from "@/components/shared/Reveal";
import { PublicPageHeader } from "../PublicPageHeader";
import { SPECIALTIES } from "@/constants/public/specialties";
import SpecialtyCard from "@/components/shared/SpecialtyCard";

const Specialties = () => {
  return (
    <>
      <PublicPageHeader
        eyebrow="Areas of care"
        title="Explore medical specialties"
        description="Start with the type of care you need, then compare doctors who practice in that specialty."
      />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIALTIES.map((specialty) => (
            <StaggerItem key={specialty.id}>
              <SpecialtyCard specialty={specialty} />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <section className="mt-14 border-l-2 border-primary bg-info p-6">
          <h2 className="text-xl font-semibold text-info-foreground">
            Not sure which specialty to choose?
          </h2>
          <p className="mt-2 max-w-3xl leading-7 text-info-foreground">
            Use the directory to review each area of care. If symptoms are
            severe or urgent, contact emergency services rather than waiting for
            an online appointment.
          </p>
        </section>
      </main>
    </>
  );
};

export default Specialties;
