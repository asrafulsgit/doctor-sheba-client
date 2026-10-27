"use client";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  ExternalLink,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import DashboardHeader from "@/components/shared/DashboardHeader";
import type { IHealthTip } from "@/types/health-tips";
import {
  useDeleteHealthTip,
  useMyHealthTips,
  useUpdateHealthTip,
} from "@/lib/hooks/useHealthTip";
import { EmptyState } from "@/components/shared/PageState";
import MyHealthTipSkeleton from "./MyHealthTipSkeleton";

import MyHealthTipsGrid, { type PublishTarget } from "./MyHealthTipsGrid";

const MyHealthTips = () => {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [publishTarget, setPublishTarget] = useState<PublishTarget | null>(
    null,
  );

  const { data, isLoading, isError } = useMyHealthTips();
  const { mutate: updateTip, isPending: isUpdating } = useUpdateHealthTip();
  const { mutate: deleteTip, isPending } = useDeleteHealthTip();
  const tips = data?.data?.tips;
  const stats = data?.data?.stats;

  const handleDelete = () => {
    if (!deleting) return;

    deleteTip(
      { slug: deleting },
      {
        onSuccess: () => {
          toast.success("Health tip deleted");
          setDeleting(null);
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to delete health tip.");
        },
      },
    );
  };

  const confirmPublishToggle = () => {
    if (!publishTarget) return;

    const { slug, isPublished } = publishTarget; // isPublished = NEXT state

    updateTip(
      { slug, data: { isPublished } },
      {
        onSuccess: () => {
          toast.success(
            isPublished ? "Health tip published" : "Health tip moved to drafts",
          );
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update publication");
        },
        onSettled: () => setPublishTarget(null),
      },
    );
  };

  if (isLoading) return <MyHealthTipSkeleton />;

  if (isError) {
    return <EmptyState title="Failed to load your health tips." />;
  }

  return (
    <>
      <DashboardHeader
        title="My Health Tips"
        description="Create and manage health advice for your patients."
        actions={
          <Link href={"/doctor/health-tips/create"}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Post a tip
            </Button>
          </Link>
        }
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Your tips" value={stats?.tipsCount ?? 0} />
        <StatCard label="Published" value={stats?.publishedTips ?? 0} />
        <StatCard label="Total views" value={stats?.totalViews ?? 0} />
      </div>

      <MyHealthTipsGrid
        tips={tips ?? []}
        onDelete={setDeleting}
        onTogglePublish={setPublishTarget}
      />

      {publishTarget && (
        <ConfirmDialog
          open
          onOpenChange={(open) => {
            if (!open && !isUpdating) setPublishTarget(null);
          }}
          title={
            publishTarget.isPublished
              ? "Publish this health tip?"
              : "Move this health tip to drafts?"
          }
          description={
            publishTarget.isPublished
              ? "Patients will be able to see and read it right away."
              : "It will be hidden from patients until you publish it again."
          }
          confirmLabel={
            publishTarget.isPublished ? "Publish" : "Move to drafts"
          }
          onConfirm={confirmPublishToggle}
        />
      )}

      {deleting && (
        <ConfirmDialog
          open
          onOpenChange={(open) => {
            if (!open) setDeleting(null);
          }}
          title="Delete this health tip?"
          description="This action cannot be undone."
          confirmLabel="Delete"
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default MyHealthTips;

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold tabular-nums">
        {value.toLocaleString()}
      </p>
    </div>
  );
}
