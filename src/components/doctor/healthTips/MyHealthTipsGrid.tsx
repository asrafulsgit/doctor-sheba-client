import { Button } from "@/components/ui/button";
import { IHealthTip } from "@/types/health-tips";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";
import HealthTipCard from "./HealthTipCard";

export type PublishTarget = { slug: string; isPublished: boolean };

export type GridProps = {
  tips: IHealthTip[];
  onDelete: (slug: string) => void;
  onTogglePublish: (target: PublishTarget) => void;
};

const MyHealthTipsGrid = ({ tips, onDelete, onTogglePublish }: GridProps) => {
  if (tips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed px-5 py-12 text-center">
        <div className="mb-4 rounded-full bg-muted p-4">
          <FileText className="h-7 w-7 text-muted-foreground" />
        </div>

        <h3 className="font-semibold">No health tips yet</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Share useful health advice with your patients by publishing your first
          health tip.
        </p>

        <Button asChild className="mt-5">
          <Link href="/doctor/health-tips/create">
            <Plus className="mr-2 h-4 w-4" />
            Create your first tip
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {tips.map((tip) => (
        <HealthTipCard
          key={tip.id}
          tip={tip}
          onDelete={onDelete}
          onTogglePublish={onTogglePublish}
        />
      ))}
    </div>
  );
};

export default MyHealthTipsGrid;
