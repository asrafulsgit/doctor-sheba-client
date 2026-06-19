import * as React from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  children: React.ReactNode;
  maxWidthClass?: string;
  submitDisabled?: boolean;
}

export function FormDialog({
  open, onOpenChange, title, description,
  submitLabel = "Save", cancelLabel = "Cancel",
  onSubmit, children, maxWidthClass = "sm:max-w-lg", submitDisabled,
}: FormDialogProps) {
  const [loading, setLoading] = React.useState(false);
  const handle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try { await onSubmit(e); onOpenChange(false); }
    finally { setLoading(false); }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={maxWidthClass}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form onSubmit={handle} className="space-y-4">
          {children}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              {cancelLabel}
            </Button>
            <Button type="submit" disabled={loading || submitDisabled}>
              {loading ? "Saving…" : submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/** Generic info dialog (no form). */
export function InfoDialog({
  open, onOpenChange, title, description, children, maxWidthClass = "sm:max-w-2xl",
}: {
  open: boolean; onOpenChange: (open: boolean) => void;
  title: string; description?: React.ReactNode; children: React.ReactNode;
  maxWidthClass?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={maxWidthClass}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
