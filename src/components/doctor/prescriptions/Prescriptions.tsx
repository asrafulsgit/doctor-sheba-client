"use client";
import * as React from "react";
import { Plus, Pill, Calendar, Edit3, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PrescriptionRecord, PRESCRIPTIONS } from "@/constants/patient/data";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { FormDialog } from "@/components/shared/FormDialog";
import { EmptyState } from "@/components/shared/PageState";

// export const Route = createFileRoute("/doctor/prescriptions")({
//   head: () => ({ meta: [{ title: "Prescriptions — DoctorSheba" }] }),
//   component: DoctorPrescriptions,
// });

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

type Med = PrescriptionRecord["medications"][number];
const blankMed = (): Med => ({
  name: "",
  dosage: "",
  frequency: "",
  duration: "",
});

const DoctorPrescriptions = () => {
  // const { items, set } = useEntity("prescriptions");
  const [prescriptions, setPrescriptions] = React.useState<
    PrescriptionRecord[]
  >(PRESCRIPTIONS);
  const [edit, setEdit] = React.useState<PrescriptionRecord | null>(null);
  const [create, setCreate] = React.useState(false);
  const [del, setDel] = React.useState<PrescriptionRecord | null>(null);

  const upsert = (data: PrescriptionRecord, isNew: boolean) => {
    if (isNew) setPrescriptions((prev) => [data, ...prev]);
    else
      setPrescriptions((prev) =>
        prev.map((r) => (r.id === data.id ? data : r)),
      );
    toast.success(isNew ? "Prescription created" : "Prescription updated");
  };

  const remove = () => {
    if (!del) return;
    setPrescriptions((prev) => prev.filter((r) => r.id !== del.id));
    toast.success("Prescription deleted");
  };

  return (
    <>
      <DashboardHeader
        title="Prescriptions"
        description="Prescriptions you've issued."
        actions={
          <Button onClick={() => setCreate(true)}>
            <Plus className="h-4 w-4" />
            New prescription
          </Button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {prescriptions.map((rx) => (
          <article
            key={rx.id}
            className="rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:shadow-elevated"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-primary inline-flex items-center gap-1">
                  <Pill className="h-3.5 w-3.5" />
                  Rx #{rx.id.slice(-3)}
                </p>
                <h3 className="mt-1 text-base font-semibold text-foreground">
                  {rx.patientName}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {rx.diagnosis} · <Calendar className="inline h-3 w-3" />{" "}
                  {fmt(rx.date)}
                </p>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" onClick={() => setEdit(rx)}>
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Button>
                <Button size="icon" variant="ghost" onClick={() => setDel(rx)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5">
              {rx.medications.map((m, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-md bg-surface px-3 py-2 text-xs"
                >
                  <span className="font-medium text-foreground">{m.name}</span>
                  <span className="text-muted-foreground">
                    {m.frequency} · {m.duration}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      {prescriptions.length === 0 && (
        <EmptyState title="No prescriptions issued." />
      )}

      <Editor
        open={create}
        onOpenChange={setCreate}
        onSave={(data) => upsert(data, true)}
      />
      <Editor
        open={!!edit}
        onOpenChange={(o) => !o && setEdit(null)}
        rx={edit}
        onSave={(data) => upsert(data, false)}
      />

      <ConfirmDialog
        open={!!del}
        onOpenChange={(o) => !o && setDel(null)}
        title="Delete prescription?"
        confirmLabel="Delete"
        destructive
        onConfirm={remove}
      />
    </>
  );
};

function Editor({
  open,
  onOpenChange,
  rx,
  onSave,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  rx?: PrescriptionRecord | null;
  onSave?: (data: PrescriptionRecord) => void;
}) {
  const [meds, setMeds] = React.useState<Med[]>([blankMed()]);
  const [patientName, setPatientName] = React.useState("");
  const [diagnosis, setDiagnosis] = React.useState("");
  const [instructions, setInstructions] = React.useState("");
  const [followUp, setFollowUp] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setMeds(
        rx?.medications.length
          ? rx.medications.map((m) => ({ ...m }))
          : [blankMed()],
      );
      setPatientName(rx?.patientName || "");
      setDiagnosis(rx?.diagnosis || "");
      setInstructions(rx?.instructions || "");
      setFollowUp(rx?.followUpDate ? rx.followUpDate.slice(0, 10) : "");
    }
  }, [open, rx]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!patientName.trim() || !diagnosis.trim()) {
      toast.error("Patient & diagnosis required");
      return;
    }
    if (!meds.length || meds.some((m) => !m.name.trim())) {
      toast.error("Add at least one medication");
      return;
    }
    // const data: PrescriptionRecord = {
    //   id: rx?.id,
    //   appointmentId: rx?.appointmentId || "",
    //   patientId: rx?.patientId || "",
    //   patientName,
    //   doctorId: rx?.doctorId || "doc-001",
    //   doctorName: rx?.doctorName || "Dr. Tahmid Rahman",
    //   date: rx?.date || new Date().toISOString(),
    //   diagnosis,
    //   instructions,
    //   medications: meds,
    //   followUpDate: followUp ? new Date(followUp).toISOString() : undefined,
    // };
    // onSave(data);
    onOpenChange(false);
  };

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={rx ? "Edit prescription" : "New prescription"}
      onSubmit={onSubmit}
      maxWidthClass="sm:max-w-2xl"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="patient">Patient name</Label>
          <Input
            id="patient"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="diag">Diagnosis</Label>
          <Input
            id="diag"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label>Medications</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setMeds((p) => [...p, blankMed()])}
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
        <div className="space-y-2">
          {meds.map((m, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-2 rounded-md border border-border p-2"
            >
              <Input
                className="col-span-4"
                placeholder="Name"
                value={m.name}
                onChange={(e) =>
                  setMeds((p) =>
                    p.map((x, idx) =>
                      idx === i ? { ...x, name: e.target.value } : x,
                    ),
                  )
                }
              />
              <Input
                className="col-span-2"
                placeholder="Dosage"
                value={m.dosage}
                onChange={(e) =>
                  setMeds((p) =>
                    p.map((x, idx) =>
                      idx === i ? { ...x, dosage: e.target.value } : x,
                    ),
                  )
                }
              />
              <Input
                className="col-span-3"
                placeholder="Frequency"
                value={m.frequency}
                onChange={(e) =>
                  setMeds((p) =>
                    p.map((x, idx) =>
                      idx === i ? { ...x, frequency: e.target.value } : x,
                    ),
                  )
                }
              />
              <Input
                className="col-span-2"
                placeholder="Duration"
                value={m.duration}
                onChange={(e) =>
                  setMeds((p) =>
                    p.map((x, idx) =>
                      idx === i ? { ...x, duration: e.target.value } : x,
                    ),
                  )
                }
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="col-span-1"
                onClick={() => setMeds((p) => p.filter((_, idx) => idx !== i))}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="ins">Instructions</Label>
        <Textarea
          id="ins"
          rows={3}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="fu">Follow-up date</Label>
        <Input
          id="fu"
          type="date"
          value={followUp}
          onChange={(e) => setFollowUp(e.target.value)}
        />
      </div>
    </FormDialog>
  );
}

export default DoctorPrescriptions;
