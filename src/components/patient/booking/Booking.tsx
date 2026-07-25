"use client";
import { useDoctorSchedules } from "@/lib/hooks/schedule";
import {
  Calendar,
  Check,
  ChevronLeft,
  Clock,
  ShieldCheck,
  Wallet2,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BookingStep, { Step } from "./BookingStep";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { getSchedulesByDate } from "@/helpers/getDateSchedules";
import { toast } from "sonner";
import { useBooking } from "@/lib/hooks/useAppointment";
import BookingStep1 from "./BookingStep1";
import BookingSkeleton from "./BookingSkeleton";
import BookingStep2 from "./BookingStep2";
import BookingStep3 from "./BookingStep3";

export type SelectedSlot = {
  id: string;
  startTime: string;
  endTime: string;
  date: string;
};

const Booking = () => {
  const params = useParams();
  
  const doctorId = params.id as string;
  const [step, setStep] = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [slot, setSlot] = useState<SelectedSlot | null>(null);

  const { data, isLoading, isError, error } = useDoctorSchedules(doctorId);

  const doctor = data?.data?.doctor;
  const schedules = data?.data?.doctorSchedules;

  const availableSchedules = useMemo(
    () => getSchedulesByDate(schedules ?? [], selectedDate),
    [schedules, selectedDate],
  );

  const next = () => setStep((s) => Math.min(3, s + 1) as Step);
  const back = () => setStep((s) => Math.max(1, s - 1) as Step);

  if (isLoading) {
    return <BookingSkeleton />;
  }
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href={`/doctors/${doctor?.id}`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to profile
          </Link>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Book an appointment
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            with{" "}
            <span className="font-medium text-foreground">{doctor?.name}</span>{" "}
            · {doctor?.designation}
          </p>

          <BookingStep step={step} />
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            {step === 1 && (
              <BookingStep1
                selectedDate={selectedDate}
                setSelectedDate={(date) => setSelectedDate(date)}
                next={next}
                setSlot={() => setSlot(null)}
              />
            )}

            {step === 2 && (
              <BookingStep2
                selectedDate={selectedDate}
                availableSchedules={availableSchedules}
                slot={slot}
                setSlot={(data) => setSlot(data)}
                next={next}
                back={back}
              />
            )}

            {step === 3 && slot && (
              <BookingStep3
                slot={slot}
                doctorAppointmentFee={doctor?.appointmentFee || 0}
                doctorName={doctor?.name || ""}
                doctorId={doctorId}
                selectedDate={selectedDate}
                back={back}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Booking summary
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                {doctor?.name
                  .replace(/^Dr\.?\s+/i, "")
                  .split(" ")
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {doctor?.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {doctor?.designation}
                </p>
              </div>
            </div>
            <dl className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                {slot
                  ? new Date(slot.startTime).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                    })
                  : "Select a date"}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                {slot
                  ? new Date(slot.startTime).toLocaleTimeString(undefined, {
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : "Select a slot"}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wallet2 className="h-4 w-4 text-primary" />৳
                {doctor?.appointmentFee.toLocaleString()} consultation
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Free reschedule up to 2h before
              </div>
            </dl>
          </div>
        </aside>
      </section>
    </>
  );
};

export default Booking;
