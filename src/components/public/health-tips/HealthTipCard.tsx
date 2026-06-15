import { HealthTip } from "@/types/health-tips";
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import Link from "next/link";

const HealthTipCard = ({ article }: { article: HealthTip }) => {
  return (
    <article
      className="group flex h-full flex-col rounded-xl border 
              border-border bg-surface p-6 transition-all duration-300 hover:border-primary hover:shadow-elevated
              "
    >
      <span
        className="grid size-11 place-items-center rounded-xl bg-info 
                text-info-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
      >
        <BookOpen className="size-5" />
      </span>
      <p className="mt-6 text-sm font-semibold text-primary">
        {article.category}
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        {article.title}
      </h2>
      <p className="mt-4 flex-1 leading-7 text-muted-foreground">
        {article.excerpt}
      </p>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Clock3 className="size-4" />
          {article.readTime}
        </span>
        <Link
          href={`/health-tips/${article.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          Read article{" "}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

export default HealthTipCard;
