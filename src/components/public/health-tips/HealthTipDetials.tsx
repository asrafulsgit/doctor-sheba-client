"use client";
import { ArrowLeft, Clock3, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useHealthTip } from "@/lib/hooks/useHealthTip";
import { HealthTipDetailSkeleton } from "@/components/shared/SkeletonSet";

function ArticleNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
        Health article not found
      </h1>
      <Button asChild className="mt-2 md:mt-5">
        <Link href="/health-tips">Browse health tips</Link>
      </Button>
    </main>
  );
}
// export const Route = createFileRoute("/health-tips/$slug")({
//   loader: ({ params }) => {
//     const article = healthTips.find((item) => item.slug === params.slug);
//     if (!article) throw notFound();
//     return article;
//   },
//   head: ({ loaderData, params }) => ({
//     meta: [
//       { title: `${loaderData?.title ?? "Health guidance"} | DoctorSheba` },
//       {
//         name: "description",
//         content: loaderData?.excerpt ?? "General health guidance from DoctorSheba.",
//       },
//       { property: "og:title", content: `${loaderData?.title ?? "Health guidance"} | DoctorSheba` },
//       {
//         property: "og:description",
//         content: loaderData?.excerpt ?? "General health guidance from DoctorSheba.",
//       },
//       { property: "og:type", content: "article" },
//       { property: "og:url", content: `/health-tips/${params.slug}` },
//     ],
//     links: [{ rel: "canonical", href: `/health-tips/${params.slug}` }],
//     scripts: loaderData
//       ? [
//           {
//             type: "application/ld+json",
//             children: JSON.stringify({
//               "@context": "https://schema.org",
//               "@type": "Article",
//               headline: loaderData.title,
//               description: loaderData.excerpt,
//               author: { "@type": "Organization", name: "DoctorSheba" },
//             }),
//           },
//         ]
//       : [],
//   }),
//   component: ArticlePage,
//   notFoundComponent: ArticleNotFound,
// });

const HealthTipDetails = () => {
  const slug = useParams().slug as string;
  const { data, isLoading, isError, error } = useHealthTip(slug);
  const article =data?.data;

  if (isLoading) {
    return <HealthTipDetailSkeleton />;
  }
  
  if (!article || isError) {
    return <ArticleNotFound />;
  }
  return (
    <main>
      <header className="border-b border-border bg-surface-muted">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <Button asChild variant="ghost" className="-ml-3">
            <Link href="/health-tips">
              <ArrowLeft /> All health tips
            </Link>
          </Button>
          <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-primary">
            {article.category}
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl  font-semibold tracking-tight text-foreground">
            {article.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {article.excerpt}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Clock3 className="size-4" /> {article.views}
          </p>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-10 flex gap-3 rounded-xl border border-warning-border bg-warning p-5 text-warning-foreground">
          <TriangleAlert className="mt-0.5 size-5 shrink-0" />
          <p className="text-sm leading-6">
            <strong>General information only.</strong> This article does not
            diagnose or treat a condition. Consult a qualified healthcare
            professional for advice specific to you.
          </p>
        </div>
        <section className="mb-10">
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {article.content}
          </p>
        </section>
      </article>
    </main>
  );
};

export default HealthTipDetails;
