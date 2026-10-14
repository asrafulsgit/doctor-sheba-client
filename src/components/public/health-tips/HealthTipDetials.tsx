"use client";
import { ArrowLeft, Clock3, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useHealthTip, useRecordHealthTipView } from "@/lib/hooks/useHealthTip";
import { HealthTipDetailSkeleton } from "@/components/shared/SkeletonSet";
import { useEffect } from "react";

function ArticleNotFound({message} :{message? : string}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
        {message ?? "Health article not found"}
      </h1>
      <Button asChild className="mt-2 md:mt-5">
        <Link href="/health-tips">Browse health tips</Link>
      </Button>
    </main>
  );
}

const HealthTipDetails = () => {
  const slug = useParams().slug as string;
  const { data, isLoading, isError, error } = useHealthTip(slug);
  const article = data?.data;

  const { mutate: recordView } = useRecordHealthTipView();

  useEffect(() => {
    if (!article?.id) return;

    recordView(article.id);
  }, [article?.id, recordView]);

  if (isLoading) {
    return <HealthTipDetailSkeleton />;
  }

  if (!article || isError) {
    return <ArticleNotFound message={isError ? error.message : undefined}/>;
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
