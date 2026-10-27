import { IHealthTip } from "@/types/health-tips";
import { ArrowRight, Eye } from "lucide-react";
import Link from "next/link";

const HealthTipCard = ({ article }: { article: IHealthTip }) => {
  const author = article?.author?.doctor;
  return (
    <Link
      key={article.id}
      href={`/health-tips/${article.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-primary/40"
    >
      <span className="inline-block w-fit rounded-full bg-secondary-soft px-2.5 py-0.5 text-xs font-medium text-secondary">
        {article.category}
      </span>
      <h2 className="mt-4 text-lg font-semibold text-foreground group-hover:text-primary">
        {article.title}
      </h2>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">
        {article.excerpt}
      </p>
      <div className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
        <span className="truncate font-medium text-foreground">
          {author?.name ?? "DoctorSheba"}
        </span>
        <span className="ml-auto inline-flex items-center gap-1">
          <Eye className="h-3.5 w-3.5" />
          {article.views}
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-primary transition group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
};

export default HealthTipCard;
