import { healthTips } from "@/constants/public/health-tips";
import { PublicPageHeader } from "../PublicPageHeader";
import { Reveal } from "@/components/shared/Reveal";
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import Link from "next/link";
import HealthTipCard from "./HealthTipCard";

// seo optimization
// export const Route = createFileRoute("/health-tips/")({
//   head: () => ({
//     meta: [
//       { title: "Health Tips | DoctorSheba" },
//       {
//         name: "description",
//         content: "Read practical health guidance from DoctorSheba.",
//       },
//       { property: "og:title", content: "Health Tips | DoctorSheba" },
//       {
//         property: "og:description",
//         content: "Read practical health guidance from DoctorSheba.",
//       },
//       { property: "og:url", content: "/health-tips" },
//     ],
//     links: [{ rel: "canonical", href: "/health-tips" }],
//   }),
// });

const HealthTips = () => {
  return (
    <>
      <PublicPageHeader
        eyebrow="Health guidance"
        title="Practical health tips for informed care"
        description="Review general health information and prepare better questions for your doctor. Articles do not replace professional diagnosis or treatment."
      />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {healthTips.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.07} className="h-full">
              <HealthTipCard article={article} key={article.slug} />
            </Reveal>
          ))}
        </div>
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
