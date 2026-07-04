import { useMyAppointment } from "@/lib/hooks/useAppointment";
import {
  Calendar,
  Receipt,
  RefreshCw,
  Stethoscope,
  XCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import PaymentSuccessSkeleton from "./SuccesSkeleton";
import { Row } from "./Success";
import { format } from "date-fns";
import AppointmentDetailsCard from "./AppointmentDetailsCard";
import PaymentDetailscard from "./PaymentDetailscard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EmptyState } from "@/components/shared/PageState";

const PaymentCancel = () => {
  const params = useParams();
  const router = useRouter();
  const appointmentId = params.appointmentId as string;
  const paymentId = params.paymentId as string;
  const {
    data,
    isLoading: appointmentLoading,
    isError,
    error,
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
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-destructive-soft text-destructive">
          <XCircle className="h-8 w-8" />
        </div>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground">
          Payment cancelled
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your payment was not completed. The appointment slot has been released
          — you can try again anytime.
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
              No appointment was created.
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
              No payment was captured.
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-warning/30 bg-warning-soft px-4 py-3 text-sm text-warning-foreground">
        Common reasons: insufficient balance, network issue, or manual cancel.
        No amount has been charged.
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {appointment?.doctorId ? (
          <Button asChild>
            <Link href={`/booking/${appointment.id}`}>
              <RefreshCw className="h-4 w-4" />
              Retry booking
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/doctors">Find a doctor</Link>
          </Button>
        )}
        <Button asChild variant="outline">
          <Link href="/patient/appointments">My appointments</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </section>
  );
};

export default PaymentCancel;
