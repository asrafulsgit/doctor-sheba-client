"use client";
import { PublicPageHeader } from "../PublicPageHeader";
import HealthTipGrid from "./HealthTipGrid";
import HealthTipFilter from "./HealthTipFilter";

const HealthTips = () => {
  return (
    <>
      <PublicPageHeader
        eyebrow="Health guidance"
        title="Practical health tips for informed care"
        description="Review general health information and prepare better questions for your doctor. Articles do not replace professional diagnosis or treatment."
      >
        <HealthTipFilter />
      </PublicPageHeader>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <HealthTipGrid />
        <aside className="mt-12 border-l-2 border-warning-border bg-warning p-5 text-warning-foreground">
          <strong>Medical information notice:</strong> This content is general
          education only. Seek qualified medical advice for symptoms, diagnoses,
          medicines, or treatment decisions.
        </aside>
      </main>
    </>
  );
};

export default HealthTips;
