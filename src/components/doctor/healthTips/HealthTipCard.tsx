import { memo } from "react";
import { GridProps } from "./MyHealthTipsGrid";
import { IHealthTip } from "@/types/health-tips";
import { ExternalLink, Eye, Pencil, Trash2 } from "lucide-react";
import { getDate } from "@/helpers/getDate";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CardProps = Omit<GridProps, "tips"> & { tip: IHealthTip };

const HealthTipCard = memo(function HealthTipCard({
  tip,
  onDelete,
  onTogglePublish,
}: CardProps) {
  return (
    <article className="flex min-w-0 flex-col rounded-xl border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-secondary-soft px-2.5 py-1 text-xs font-medium text-secondary">
          {tip.category}
        </span>

        <span
          className={
            tip.isPublished
              ? "rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
              : "rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
          }
        >
          {tip.isPublished ? "Published" : "Draft"}
        </span>

        <span className="ml-auto inline-flex items-center gap-1 text-sm text-muted-foreground">
          <Eye className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Views:</span>
          {tip.views.toLocaleString()}
        </span>
      </div>

      <h3 className="mt-3 font-semibold text-foreground">{tip.title}</h3>

      {tip.excerpt && (
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {tip.excerpt}
        </p>
      )}

      <p className="mt-2 text-xs text-muted-foreground">
        {tip.isPublished && tip.publishedAt
          ? `Published ${getDate(tip.publishedAt, "dd/MM/yyyy")}`
          : `Updated ${getDate(tip.updatedAt, "dd/MM/yyyy")}`}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
        <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
          {/* Controlled by server state: it only flips after the mutation succeeds */}
          <Switch
            checked={tip.isPublished}
            onCheckedChange={(checked) =>
              onTogglePublish({ slug: tip.slug, isPublished: checked })
            }
            aria-label={`${tip.isPublished ? "Move to drafts" : "Publish"}: ${tip.title}`}
            className="cursor-pointer"
          />
          Published
        </label>

        <div className="ml-auto flex items-center gap-1">
          {tip.isPublished && (
            <Button asChild size="icon" variant="ghost">
              <Link
                href={`/health-tips/${tip.slug}`}
                aria-label="View health tip"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          )}

          <Button asChild size="icon" variant="ghost">
            <Link
              href={`/doctor/health-tips/${tip.slug}/update`}
              aria-label="Edit health tip"
            >
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            size="icon"
            variant="ghost"
            aria-label="Delete health tip"
            onClick={() => onDelete(tip.slug)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
    </article>
  );
});

export default HealthTipCard;
