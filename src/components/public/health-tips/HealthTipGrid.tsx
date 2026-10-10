"use client";
import { EmptyState } from "@/components/shared/PageState";
import { Reveal } from "@/components/shared/Reveal";
import { HealthTipCardSkeleton } from "@/components/shared/SkeletonSet";
import { useHealthTips } from "@/lib/hooks/useHealthTip";
import HealthTipCard from "./HealthTipCard";
import useQueryManager from "@/hooks/UseQueryManager";
import { IHealthTipFilter } from "@/types/health-tips";

const HealthTipGrid = () => {
  const { getAllQueries } = useQueryManager();
  const allQueries: IHealthTipFilter = getAllQueries();
  const { data, isLoading, isError, error } = useHealthTips(allQueries);
  const healthTips = data?.data ?? [];
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <HealthTipCardSkeleton rows={3} />
      </div>
    );
  }

  if (healthTips.length === 0) {
    return (
      <EmptyState
        title="No tips match these filters"
        description={
          isError
            ? error.message
            : "Try removing a filter or searching with a different tip."
        }
      />
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {healthTips.map((article, index) => (
        <Reveal key={article.slug} delay={index * 0.07} className="h-full">
          <HealthTipCard article={article} key={article.slug} />
        </Reveal>
      ))}
    </div>
  );
};

export default HealthTipGrid;
