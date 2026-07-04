"use client";
import { useDoctorSchedules } from "@/lib/hooks/schedule";
import {
  Calendar,
  ChevronLeft,
  Clock,
  ShieldCheck,
  Wallet2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BookingStep, { Step } from "./BookingStep";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSchedulesByDate } from "@/helpers/getDateSchedules";
import { toast } from "sonner";
interface SelectedSlot {
  id: string;
  startTime: string;
  endTime: string;
  date: string;
}


const Booking = () => {
  const params = useParams();

  const [step, setStep] = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [slot, setSlot] = useState<SelectedSlot | null>(null);


  const { data, isLoading, isError, error } = useDoctorSchedules(
    params.id as string,
  );

  const doctor = data?.data?.doctor;
  const schedules = data?.data?.doctorSchedules;
  
  const availableSchedules = useMemo(
    () => getSchedulesByDate(schedules ?? [], selectedDate),
    [schedules, selectedDate],
  );
   
  const next = () => setStep((s) => Math.min(4, s + 1) as Step);
  const back = () => setStep((s) => Math.max(1, s - 1) as Step);

  if (isLoading) {
    return;
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
              <div>
                <h2 className="text-lg font-semibold">Choose a date</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pick a day in the next 14 days.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                  {Array.from({ length: 14 }).map((_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() + i);

                    const selected =
                      d.toDateString() === selectedDate.toDateString();

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setSelectedDate(d);
                          // setSlot(null);
                        }}
                        className={cn(
                          "flex flex-col items-center rounded-lg border px-3 py-3 text-sm transition-colors",
                          selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:border-primary/40",
                        )}
                      >
                        <span className="text-xs opacity-80">
                          {d.toLocaleDateString(undefined, {
                            weekday: "short",
                          })}
                        </span>

                        <span className="mt-1 text-lg font-semibold">
                          {d.getDate()}
                        </span>

                        <span className="text-xs opacity-80">
                          {d.toLocaleDateString(undefined, {
                            month: "short",
                          })}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={next}>Continue</Button>
                </div>
              </div>
            )}

           {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold">Pick a time slot</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Available slots for{" "}
                  {new Date(selectedDate).toLocaleDateString(undefined, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                  .
                </p>
                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {availableSchedules.length ? availableSchedules.map((s) => {
                    const start = new Date(s.startTime);
                    const selected = slot?.id === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        disabled={s.isBooked}
                        onClick={() =>
                          setSlot({
                            id: s.id,
                            startTime: s.startTime,
                            endTime: s.endTime,
                            date: selectedDate.toString(),
                          })
                        }
                        className={cn(
                          "rounded-lg border px-3 py-3 text-sm font-medium transition-all",
                          s.isBooked
                            ? "border-border bg-muted text-muted-foreground line-through opacity-60"
                            : selected
                              ? "border-primary bg-primary text-primary-foreground scale-[1.02]"
                              : "border-border bg-background text-foreground hover:border-primary/40",
                        )}
                      >
                        {start.toLocaleTimeString(undefined, {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </button>
                    );
                  }) : 
                       <p>No Slot available</p> 
                  }
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <Button variant="ghost" onClick={back}>
                    Back
                  </Button>
                  <Button onClick={next} disabled={!slot}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* {step === 3 && slot && (
              <div>
                <h2 className="text-lg font-semibold">Review & confirm</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Please review your appointment details.
                </p>
                <dl className="mt-5 grid gap-3 rounded-xl bg-surface p-4 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Doctor</dt>
                    <dd className="font-medium text-foreground">
                      {doctor.name}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Date</dt>
                    <dd className="font-medium text-foreground">
                      {new Date(slot.startTime).toLocaleDateString(undefined, {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Time</dt>
                    <dd className="font-medium text-foreground">
                      {new Date(slot.startTime).toLocaleTimeString(undefined, {
                        hour: "numeric",
                        minute: "2-digit",
                      })}{" "}
                      –{" "}
                      {new Date(slot.endTime).toLocaleTimeString(undefined, {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Fee</dt>
                    <dd className="font-medium text-foreground">
                      ৳{doctor.appointmentFee.toLocaleString()}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 space-y-3">
                  {!isAuthenticated && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="patient">Your name</Label>
                        <Input
                          id="patient"
                          required
                          className="mt-1.5"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          required
                          className="mt-1.5"
                          placeholder="+8801…"
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <Label htmlFor="reason">Reason for visit (optional)</Label>
                    <Textarea
                      id="reason"
                      rows={3}
                      placeholder="Briefly describe your symptoms or reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Button variant="ghost" onClick={back}>
                    Back
                  </Button>
                  <Button onClick={confirm} disabled={confirming}>
                    {confirming
                      ? "Confirming…"
                      : `Confirm — ৳${doctor.appointmentFee.toLocaleString()}`}
                  </Button>
                </div>
              </div>
            )} */}

            {/* {step === 4 && confirmedId && slot && (
              <div className="text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success-soft text-success">
                  <Check className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                  Appointment confirmed
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Confirmation ID{" "}
                  <span className="font-mono text-foreground">
                    {confirmedId}
                  </span>
                  . We've added it to your patient dashboard.
                </p>
                <div className="mx-auto mt-6 flex max-w-sm flex-wrap justify-center gap-2">
                  <Button asChild>
                    <Link
                      to={
                        user?.role === "PATIENT" ? "/patient/appointments" : "/"
                      }
                    >
                      View in dashboard
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/doctors">Book another</Link>
                  </Button>
                </div>
              </div>
            )}  */}
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
                {/* {slot
                  ? new Date(slot.startTime).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                    })
                  : "Select a date"} */}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                {/* {slot
                  ? new Date(slot.startTime).toLocaleTimeString(undefined, {
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : "Select a slot"} */}
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

// export const Route = createFileRoute("/booking/$doctorId")({
//   loader: ({ params }) => {
//     const doctor = getDoctorById(params.doctorId);
//     if (!doctor) throw notFound();
//     return { doctor };
//   },
//   head: ({ loaderData }) => ({
//     meta: [
//       {
//         title: loaderData ? `Book ${loaderData.doctor.name} — DoctorSheba` : "Book — DoctorSheba",
//       },
//       { name: "description", content: "Select a time slot and confirm your appointment." },
//     ],
//   }),
//   notFoundComponent: () => (
//     <PublicLayout>
//       <div className="mx-auto max-w-xl px-4 py-24 text-center">
//         <h1 className="text-2xl font-semibold">Doctor not found</h1>
//         <Button asChild className="mt-6">
//           <Link to="/doctors">Find another doctor</Link>
//         </Button>
//       </div>
//     </PublicLayout>
//   ),
//   component: BookingFlow,
// });

interface SelectedSlot {
  id: string;
  startTime: string;
  endTime: string;
  date: string;
}

// function BookingFlow() {
//   const { doctor } = Route.useLoaderData();
//   const { user, isAuthenticated } = useAuth();
//   const { set: setAppts } = useEntity("appointments");
//   const navigate = useNavigate();
//   const [step, setStep] = React.useState<Step>(1);
//   const [dayOffset, setDayOffset] = React.useState(0);
//   const [slot, setSlot] = React.useState<SelectedSlot | null>(null);
//   const [reason, setReason] = React.useState("");
//   const [confirming, setConfirming] = React.useState(false);
//   const [confirmedId, setConfirmedId] = React.useState<string | null>(null);

//   const dayGroup = React.useMemo(
//     () => getDoctorSchedule(doctor.id, dayOffset),
//     [doctor.id, dayOffset],
//   );

//   const steps = [
//     { n: 1, label: "Date" },
//     { n: 2, label: "Time" },
//     { n: 3, label: "Review" },
//     { n: 4, label: "Done" },
//   ];

//   const next = () => setStep((s) => Math.min(4, s + 1) as Step);
//   const back = () => setStep((s) => Math.max(1, s - 1) as Step);

//   const confirm = async () => {
//     if (!isAuthenticated) {
//       toast.info("Please sign in to confirm your appointment.");
//       navigate({
//         to: "/auth/login",
//         search: { redirect: window.location.pathname },
//       });
//       return;
//     }
//     if (!slot) return;
//     setConfirming(true);
//     setTimeout(() => {
//       const id = genId("apt");
//       const startTime = new Date(slot.startTime).toLocaleTimeString("en-GB", {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       const endTime = new Date(slot.endTime).toLocaleTimeString("en-GB", {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       setAppts((prev) => [
//         {
//           id,
//           patientId: user?.id || "guest",
//           patientName: user?.name || "You",
//           doctorId: doctor.id,
//           doctorName: doctor.name,
//           specialty: doctor.specialties[0]?.title || "General",
//           date: slot.startTime,
//           startTime,
//           endTime,
//           status: "SCHEDULED",
//           paymentStatus: "PAID",
//           fee: doctor.appointmentFee,
//           mode: "VIDEO",
//           reason: reason || "Consultation",
//         },
//         ...prev,
//       ]);
//       setConfirming(false);
//       setConfirmedId(id);
//       setStep(4);
//       toast.success("Appointment confirmed.");
//     }, 700);
//   };

//   return <PublicLayout></PublicLayout>;
// }
