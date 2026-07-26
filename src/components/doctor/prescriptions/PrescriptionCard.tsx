import { Button } from "@/components/ui/button";
import { getDate } from "@/helpers/getDate";
import { IPrescription } from "@/types/prescription";
import { Calendar, Edit3, Pill, Trash2 } from "lucide-react";
import React from "react";

const PrescriptionCard = ({
  prescription,
}: {
  prescription: IPrescription;
}) => {
  return (
    <article
      key={prescription.id}
      className="rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:shadow-elevated"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-primary inline-flex items-center gap-1">
            <Pill className="h-3.5 w-3.5" />
            Rx #{prescription.id.slice(-3)}
          </p>
          <h3 className="mt-1 text-base font-semibold text-foreground">
            {prescription.patient?.name}
          </h3>
          <p className=" flex items-center gap-1 text-sm text-muted-foreground">
            {prescription.diagnosis} · <Calendar className="inline h-3 w-3" />{" "}
            {getDate(prescription.createdAt, "dd MMM yyyy")}
          </p>
        </div>
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={() => {}}>
            <Edit3 className="h-4 w-4" />
            Edit
          </Button>
          <Button size="icon" variant="ghost" onClick={() => {}}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
      <ul className="mt-3 divide-y divide-border rounded-sm border border-border">
        {prescription.medications.map((m, i) => (
          <li
            key={i}
            className="flex items-center justify-between rounded-md bg-surface px-3 py-2
            text-sm"
          >
            <span className="font-medium text-foreground">{m.name}</span>
            <span className="text-muted-foreground">
              {m.frequency} · {m.duration}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default PrescriptionCard;
