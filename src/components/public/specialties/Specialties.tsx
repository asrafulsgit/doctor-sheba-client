import { PublicPageHeader } from "../PublicPageHeader";
import SpecialtiesGrid from "./SpecialtiesGrid";

const Specialties = () => {
  return (
    <>
      <PublicPageHeader
        eyebrow="Areas of care"
        title="Explore medical specialties"
        description="Start with the type of care you need, then compare doctors who practice in that specialty."
      />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SpecialtiesGrid />
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
