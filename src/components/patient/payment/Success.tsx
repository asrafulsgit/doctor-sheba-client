"use client";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Receipt,
  Stethoscope,
  Wallet2,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMyAppointment } from "../../../lib/hooks/useAppointment";
import { format } from "date-fns";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PaymentSuccessSkeleton from "./SuccesSkeleton";
import AppointmentDetailsCard from "./AppointmentDetailsCard";
import PaymentDetailscard from "./PaymentDetailscard";
import { EmptyState } from "@/components/shared/PageState";

const PaymentSuccess = () => {
  const params = useParams();
  const router = useRouter();
  const appointmentId = params.appointmentId as string;
  const paymentId = params.paymentId as string;
  const {
    data,
    isLoading: appointmentLoading,
    isError,
    error
  } = useMyAppointment(appointmentId);
  const appointment = data?.data;
  const payment = appointment?.payments.find((p) => p.id === paymentId);
  if (!appointmentId || !paymentId) {
    router.push("/not-found");
    return null;
  }
  if (appointmentLoading) {
    return <PaymentSuccessSkeleton />;
  }

   if (isError) {
      return (
        <EmptyState
          title={error.message || "Error while getting appointment"}
          description=""
        />
      );
    }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success-soft text-success">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground">
          Payment successful
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your appointment is confirmed. A receipt has been sent to your email.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Stethoscope className="h-4 w-4 text-primary" /> Appointment
          </div>
          {appointment ? (
            <AppointmentDetailsCard appointment={appointment} />
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              Appointment details unavailable.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Receipt className="h-4 w-4 text-primary" /> Payment
          </div>
          {payment ? (
            <PaymentDetailscard payment={payment} />
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              Payment details unavailable.
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Button
          // onClick={downloadReceipt}
          disabled={!payment}
          variant="outline"
        >
          <Download className="h-4 w-4" />
          Download receipt
        </Button>
        <Button asChild>
          <Link href="/patient/appointments">View appointment</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/doctors">Book another</Link>
        </Button>
      </div>
    </section>
  );
};
export function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  );
}
export default PaymentSuccess;
