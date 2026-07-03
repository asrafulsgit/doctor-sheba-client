"use client";

import { Button } from "@/components/ui/button";
import {
  Banknote,
  CalendarDays,
  Clock,
  Eye,
  Stethoscope,
  Video,
  X,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { IAppointment } from "@/types/appointment";
import { CustomAlertDialog, CustomDialog } from "@/hooks/useDialog";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { StatusBadge } from "@/components/ui/badge";
import { AppointmentStatus } from "@/types/user";
import { PaymentStatus } from "@/types/payment";
import { useUpdateAppointmentStatus } from "@/lib/hooks/useAppointment";
import { toast } from "sonner";

type AppointmentActionMenuProps = {
  appointment: Partial<IAppointment>;
};

export const AppointmentActionMenu = ({
  appointment,
}: AppointmentActionMenuProps) => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const appointmentDate = appointment?.schedule?.startDateTime;
  const formattedAppointmentDate = appointmentDate
    ? format(new Date(appointmentDate), "dd MMM yyyy hh:mm a")
    : "Unknown date";

  const { mutate: cancelAppointment, isPending } = useUpdateAppointmentStatus();
  const handleCancel = (appointmentId: string) => {
    cancelAppointment(
      { appointmentId, status: "CANCELED" },
      {
        onSuccess: () => {
          toast.success("Appointment cancelled successfully.");
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to cancel appointment.");
        },
      },
    );
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          size="xs"
          variant="outline"
          onClick={() => setIsOpenDetails(true)}
        >
          <Eye className="h-4 w-4" />
        </Button>
        {appointment.status === "SCHEDULED" && (
          <Button
            variant="destructive"
            size={"xs"}
            onClick={() => setIsOpenCancel(true)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <CustomDialog
        open={isOpenDetails}
        onOpenChange={setIsOpenDetails}
        title="Appointment details"
      >
        <div>
          <div className="pb-5">
            <div className="flex items-start gap-3.5">
              <div className="bg-primary-soft flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold text-[#F1F4F0]">
                {appointment.doctor?.name}
              </div>
              <div className="min-w-0 pt-0.5">
                <h2 className="truncate text-xl font-semibold leading-tight">
                  {appointment.doctor?.name}
                </h2>
                <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-[#12261F]/60">
                  <Stethoscope size={13} strokeWidth={2} />
                  {appointment.doctor?.designation}
                </p>
              </div>
            </div>

            {/* stamps */}
            <div className="mt-5 flex gap-2.5">
              <StatusBadge status={appointment.status as AppointmentStatus} />
              <StatusBadge
                status={appointment.paymentStatus as PaymentStatus}
              />
            </div>
          </div>

          {/* details list */}
          <div className="px-3">
            <Row
              icon={<CalendarDays size={15} />}
              label="Date"
              value={
                appointment.schedule?.startDateTime
                  ? format(
                      new Date(appointment?.schedule?.startDateTime),
                      "dd MMM yyyy",
                    )
                  : "N/A"
              }
            />
            <Row
              icon={<Clock size={15} />}
              label="Time"
              value={
                appointment.schedule?.startDateTime &&
                appointment.schedule?.endDateTime
                  ? `${format(new Date(appointment?.schedule?.startDateTime), "hh:mm")} – ${format(new Date(appointment?.schedule?.endDateTime), "hh:mm")}`
                  : `N/A`
              }
            />
            <Row icon={<Video size={15} />} label="Mode" value={"Video call"} />
            <Row
              icon={<Banknote size={15} />}
              label="Fee"
              value={`৳${appointment.doctor?.appointmentFee.toLocaleString("en-BD")}`}
              last
            />
          </div>
        </div>
      </CustomDialog>

      <CustomAlertDialog
        open={isOpenCancel}
        onOpenChange={setIsOpenCancel}
        title="Cancel this appointment?"
        isLoading={isPending}
        description={`${appointment.doctor?.name} · ${formattedAppointmentDate}. Refund processed in 5–7 days.`}
        cancelLabel="Cancel"
      >
        <AlertDialogAction
          onClick={(e) => {
            e.preventDefault();
            handleCancel(appointment.id as string);
            setIsOpenCancel(false);
          }}
          disabled={isPending}
          variant={"destructive"}
        >
          {isPending ? "Canceling…" : "Yes, cancel"}
        </AlertDialogAction>
      </CustomAlertDialog>
    </>
  );
};

type propTypes = {
  icon: ReactNode;
  label: string;
  value: string | number;
  last?: boolean;
};

function Row({ icon, label, value, last = false }: propTypes) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-3.5 ${last ? "" : "border-b border-border"}`}
    >
      <span className="flex items-center gap-2 text-[13px] text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className="text-[14px] font-medium text-foreground tabular-nums">
        {value}
      </span>
    </div>
  );
}

export default AppointmentActionMenu;
