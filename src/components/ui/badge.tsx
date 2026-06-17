import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { AppointmentStatus } from "@/types/user"
import { PaymentStatus } from "@/types/payment"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}


type Status = AppointmentStatus | PaymentStatus | "ACTIVE" | "BLOCKED";

const styles: Record<Status, string> = {
  SCHEDULED: "bg-info-soft text-info",
  INPROGRESS: "bg-warning-soft text-warning-foreground",
  COMPLETED: "bg-success-soft text-success",
  CANCELED: "bg-destructive-soft text-destructive",
  PAID: "bg-success-soft text-success",
  UNPAID: "bg-warning-soft text-warning-foreground",
  ACTIVE: "bg-success-soft text-success",
  BLOCKED: "bg-destructive-soft text-destructive",
};

const labels: Record<Status, string> = {
  SCHEDULED: "Scheduled",
  INPROGRESS: "In progress",
  COMPLETED: "Completed",
  CANCELED: "Cancelled",
  PAID: "Paid",
  UNPAID: "Unpaid",
  ACTIVE: "Active",
  BLOCKED: "Blocked",
};

function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        styles[status],
        className,
      )}
    >
      {labels[status]}
    </span>
  );
}

export { Badge, badgeVariants,StatusBadge }
