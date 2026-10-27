"use client";
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  Clock3,
  Eye,
  GraduationCap,
  MapPin,
  Star,
  Stethoscope,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useHealthTip, useRecordHealthTipView } from "@/lib/hooks/useHealthTip";
import { HealthTipDetailSkeleton } from "@/components/shared/SkeletonSet";
import { useEffect } from "react";
import { getDate } from "@/helpers/getDate";
import Image from "next/image";

function ArticleNotFound({ message }: { message?: string }) {
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
  const author = article?.author?.doctor;

  const { mutate: recordView } = useRecordHealthTipView();

  useEffect(() => {
    if (!article?.id) return;

    recordView(article.id);
  }, [article?.id, recordView]);

  if (isLoading) {
    return <HealthTipDetailSkeleton />;
  }

  if (!article || isError) {
    return <ArticleNotFound message={isError ? error.message : undefined} />;
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
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {author && (
              <span className="font-medium text-foreground">{author.name}</span>
            )}
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {getDate(article.publishedAt, "dd MMM yyyy")}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {article.views} views
            </span>
          </div>
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
        <section>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {article.content}
          </p>
        </section>
      </article>

      {author && (
        <div className="mx-auto max-w-4xl mb-10 p-5 rounded-2xl border border-border bg-card  shadow-soft">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            {/* Doctor profile */}
            <div className="flex min-w-0 items-center gap-3 md:w-56 md:shrink-0">
              {author.profilePhoto ? (
                <Image
                  src={author.profilePhoto}
                  alt={author.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-primary/10"
                />
              ) : (
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary-soft text-xl font-semibold text-primary">
                  {author.name.replace(/^Dr\.?\s+/i, "").charAt(0)}
                </div>
              )}

              <div className="min-w-0">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Written by
                </p>
                <p className="truncate font-semibold text-foreground">
                  {author.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {author.designation}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-warning">
                  <Star className="h-3 w-3 fill-current" />
                  {author?.averageRating}
                </span>
              </div>
            </div>

            {/* Doctor details */}
            <div className="min-w-0 flex-1 border-t border-border pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
              <div className="grid grid-cols-1 gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <div className="flex min-w-0 items-start gap-2">
                  <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    {author?.doctorSpecialities
                      ?.map((s) => s?.specialities.title)
                      .join(", ")}
                  </span>
                </div>

                <div className="flex min-w-0 items-start gap-2">
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{author.qualification}</span>
                </div>

                <div className="flex min-w-0 items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{author.currentWorkingPlace}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 shrink-0 text-primary" />
                  <span>{author.experience} years experience</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <Button asChild size="sm" >
              <Link href={`/doctors/${author.id}`}>Profile</Link>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default HealthTipDetails;
