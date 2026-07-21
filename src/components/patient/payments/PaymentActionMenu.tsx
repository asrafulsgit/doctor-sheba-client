"use client";

import { Button } from "@/components/ui/button";
import {
  Banknote,
  CalendarDays,
  Clock,
  CreditCard,
  Download,
  Eye,
  Hash,
  Mail,
  MapPin,
  Phone,
  Receipt,
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
import { Payment, PaymentStatus } from "@/types/payment";
import { useUpdateAppointmentStatus } from "@/lib/hooks/useAppointment";
import { toast } from "sonner";

type PaymentActionMenuProps = {
  payment: Partial<Payment>;
};

const PaymentActionMenu = ({ payment }: PaymentActionMenuProps) => {
  const [isOpenInvoice, setIsOpenInvoice] = useState(false);
  const customer = payment?.paymentGatewayData?.customer_details;
  const address = payment?.paymentGatewayData?.customer_details.address;

  return (
    <>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsOpenInvoice(true)}
        >
          View
        </Button>
        {payment.status === "PAID" ? (
          <Button size="sm" variant="ghost" onClick={() => {}}>
            <Download className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="sm" onClick={() => {}}>
            Pay now
          </Button>
        )}
      </div>

      <CustomDialog
        open={isOpenInvoice}
        onOpenChange={setIsOpenInvoice}
        title="Invoice details"
        contentClassName="sm:max-w-[600px]"
      >
        <div>
          {/* billed to */}
          <div className="rounded-lg border border-border bg-muted/30 px-3.5 py-3">
            <div className="mb-2 flex items-center justify-between">
              <p
                className="text-[11px] font-medium uppercase tracking-wide 
              text-muted-foreground"
              >
                Billed to
              </p>
              <div className="flex gap-1.5">
                <StatusBadge status={payment?.status as PaymentStatus} />
                <StatusBadge
                  status={payment?.appointment?.status as AppointmentStatus}
                />
              </div>
            </div>
            <p className="text-[14px] font-semibold text-foreground">
              {customer?.name}
            </p>
            {customer?.business_name && (
              <p className="text-[13px] text-muted-foreground">
                {customer.business_name}
              </p>
            )}
            <div className="mt-2 space-y-1">
              <p className="flex items-center gap-1.5 text-[12.5px] text-[#12261F]/60">
                <Mail size={12} />
                {customer?.email}
              </p>
              {customer?.phone && (
                <p className="flex items-center gap-1.5 text-[12.5px] text-[#12261F]/60">
                  <Phone size={12} />
                  {customer.phone}
                </p>
              )}
              {address && (
                <p className="flex items-center gap-1.5 text-[12.5px] text-[#12261F]/60">
                  <MapPin size={12} />
                  {`${address.postal_code}, ${address.city}, ${address.state}, ${address.country}`}
                </p>
              )}
            </div>
          </div>

          {/* provider / service */}
          <div className="mt-4 flex items-center gap-2.5 sm:px-3 py-2">
            <Stethoscope size={15} className="text-muted-foreground" />
            <span className="text-[13px] text-muted-foreground">
              Consultation with
            </span>
            <span className="text-[13px] font-medium text-foreground">
              {payment?.appointment?.doctor?.name}
            </span>
          </div>

          {/* details list */}
          <div className=" sm:px-3">
            <Row
              icon={<Hash size={15} />}
              label="Transaction ID"
              value={payment.transactionId as string}
            />
            <Row
              icon={<CreditCard size={15} />}
              label="Payment method"
              value={payment?.paymentGatewayData?.method?.join(", ") || "N/A"}
            />
            <Row
              icon={<Banknote size={15} />}
              label="Amount"
              value={`৳${payment?.amount?.toLocaleString("en-BD")} ${payment?.paymentGatewayData?.currency?.toUpperCase() ?? ""}`.trim()}
              last
            />
          </div>

          {/* total */}
          <div className="sm:mt-2 flex  items-center justify-between border-t border-border px-3 pt-4">
            <span className="text-[14px] font-medium text-foreground">
              Total paid
            </span>
            <span className="text-[18px] font-semibold tabular-nums text-foreground">
              {`৳${payment?.amount?.toLocaleString("en-BD")}`}
            </span>
          </div>
        </div>
      </CustomDialog>
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
      className={`flex flex-col sm:flex-row sm:items-center 
        justify-between gap-1 sm:gap-4 py-1 sm:py-3.5 ${last ? "" : "border-b border-border"}`}
    >
      <span className="flex items-center gap-2 text-[13px] text-muted-foreground">
        {icon}
        {label}
      </span>
      <span
        className="sm:max-w-[60%] truncate sm:text-right 
      text-[14px] font-medium text-foreground tabular-nums"
      >
        {value}
      </span>
    </div>
  );
}
export default PaymentActionMenu;
