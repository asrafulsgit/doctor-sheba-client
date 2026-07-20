"use client";

import { memo, type ReactNode, type ComponentType } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type CustomDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  icon?: ComponentType<{ className?: string }>;
  titleClassName?: string;
  contentClassName?: string;
  children: ReactNode;
};

function UseCustomDialog({
  open,
  onOpenChange,
  title,
  icon: Icon,
  titleClassName,
  contentClassName,
  children,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[420px]", contentClassName)}>
        <DialogHeader>
          <DialogTitle
            className={cn(
              "flex items-center gap-2 text-base font-bold",
              titleClassName,
            )}
          >
            {Icon && <Icon className="size-5" />}
            {title}
          </DialogTitle>
        </DialogHeader>
        {open && children}
      </DialogContent>
    </Dialog>
  );
}

type CustomAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;   
  description?: string;
  isLoading: boolean;
  cancelLabel: string;
  children: ReactNode;
};
function UseCustomAlertDialog({
  open,
  onOpenChange,
  title,  
  description,
  isLoading,
  cancelLabel,
  children,
}: CustomAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {cancelLabel}
          </AlertDialogCancel>
          {open && children}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const CustomDialog = memo(UseCustomDialog);
export const CustomAlertDialog = memo(UseCustomAlertDialog);
