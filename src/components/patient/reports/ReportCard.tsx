"use client";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CustomAlertDialog } from "@/hooks/useDialog";
import { useDeleteMedicalReport } from "@/lib/hooks/useMedicalReport";
import { IMedicalReport } from "@/types/medical-report";
import { format } from "date-fns";
import { Download, FlaskConical, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ReportCard = ({ report }: { report: IMedicalReport }) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const { mutate: deleteReport, isPending } = useDeleteMedicalReport();

  const handleDelete = (reportId: string) => {
    deleteReport(
      { reportId },
      {
        onSuccess: () => {
          toast.success("Report deleted");
          setIsOpenDelete(false);
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to delete report.");
        },
      },
    );
  };

  return (
    <>
      <div
        key={report.id}
        className="rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
      >
        <div
          className={`grid h-11 w-11 place-items-center rounded-lg bg-info-soft text-info-one`}
        >
          <FlaskConical className="h-5 w-5" />
        </div>
        <p className="mt-3 text-sm font-semibold text-foreground">
          {report.reportName}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(report.createdAt), "dd MMM yyyy")}
        </p>
        <div className="mt-3 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => {}}
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsOpenDelete(true)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
      {isOpenDelete && (
        <CustomAlertDialog
          open={isOpenDelete}
          onOpenChange={setIsOpenDelete}
          isLoading={isPending}
          title="Delete this report?"
          description={report?.reportName}
          cancelLabel="Cancel"
        >
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete(report.id as string);
            }}
            disabled={isPending}
            variant={"destructive"}
          >
            {isPending ? "Deleting…" : "Yes, Delete"}
          </AlertDialogAction>
        </CustomAlertDialog>
      )}
    </>
  );
};

export default ReportCard;
