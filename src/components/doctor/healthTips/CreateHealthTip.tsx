"use client";

import { useCreateHealthTip } from "@/lib/hooks/useHealthTip";
import { toast } from "sonner";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Save } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import HealthTipForm from "./HealthTipForm";

export const healthTipFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  category: z.string().trim().min(1, "Category is required"),
  excerpt: z.string().trim(),
  content: z.string().trim().min(1, "Content is required"),
  isPublished: z.boolean(),
});

export type HealthTipFormValues = z.infer<typeof healthTipFormSchema>;

const CreateHealthTip = () => {
  const navigate = useRouter();
  const { mutate, isPending } = useCreateHealthTip();
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

  function onSubmit(values: HealthTipFormValues) {
    mutate(values, {
      onSuccess: () => {
        toast.success("Health tip created successfully");
        form.reset()
        navigate.push("/docto/health-tips")
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create health tip");
      },
    });
  }

  return (
    <>
      <DashboardHeader
        title="Post a health tip"
        description="Write helpful health advice. Published tips appear on the public Health Tips page."
        actions={
          <Button variant="outline" onClick={() => navigate.back()}>
            <ArrowLeft className="h-4 w-4" />
            Back to tips
          </Button>
        }
      />
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
              {isPending
                ? "Saving…"
                : form.watch("isPublished")
                  ? "Publish tip"
                  : "Save draft"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateHealthTip;
