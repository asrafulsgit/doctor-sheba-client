"use client";

import { toast } from "sonner";
import { useHealthTip, useUpdateHealthTip } from "@/lib/hooks/useHealthTip";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { FileText, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { healthTipFormSchema, HealthTipFormValues } from "./CreateHealthTip";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import HealthTipForm from "./HealthTipForm";
import { Button } from "@/components/ui/button";
import UpdateHealthTipSkeleton from "./UpdateHealthTipSekeleton";
import { EmptyState } from "@/components/shared/PageState";
import { useEffect } from "react";

const UpdateHealthTip = () => {
  const slug = useParams().slug as string;
  const navigate = useRouter();
  const { data, isLoading, isError, error } = useHealthTip(slug);
  const article = data?.data;
  const { mutate, isPending } = useUpdateHealthTip();
  const form = useForm<HealthTipFormValues>({
    resolver: zodResolver(healthTipFormSchema),
    defaultValues: {
      title: "",
      category: "",
      excerpt: "",
      content: "",
      isPublished: false,
    },
  });

  useEffect(() => {
    if (!article) return;

    form.reset({
      title: article.title ?? "",
      category: article.category ?? "",
      excerpt: article.excerpt ?? "",
      content: article.content ?? "",
      isPublished: article.isPublished ?? false,
    });
  }, [article, form.reset]);

  function onSubmit(values: HealthTipFormValues) {
    if (!article?.slug) return;
    mutate(
      {
        slug: article?.slug,
        data: values,
      },
      {
        onSuccess: () => {
          toast.success("Health tip updated successfully");
          navigate.back();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update health tip");
        },
      },
    );
  }

  if (isLoading) {
    return <UpdateHealthTipSkeleton />;
  }

  if (isError || !article) {
    return (
      <EmptyState
        title={isError ? error.message : "Something went wrong!"}
        description="We couldn't find this health tip. It may have been deleted."
        actionLabel="Back to tips"
        onAction={() => navigate.back()}
      />
    );
  }

  return (
    <>
      <DashboardHeader title="Edit health tip" description={article.title} />
      <div className="mx-auto max-w-4xl">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
        >
          <div className="border-b border-border bg-surface/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Tip details
                </h2>
                <p className="text-xs text-muted-foreground">
                  Fields marked with * are required.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <HealthTipForm form={form} />
          </div>

          <div className="flex items-center justify-between border-t border-border bg-surface/30 px-6 py-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate.push("/doctor/health-tips")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              <Save className="h-4 w-4" />
              {isPending ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateHealthTip;
