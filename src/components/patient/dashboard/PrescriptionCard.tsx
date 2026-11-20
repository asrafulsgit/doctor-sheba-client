import { Pill } from "lucide-react";
import { format } from "date-fns";

interface PrescriptionCardProps {
  prescription: {
    id: string;
    diagnosis: string;
    doctorName: string;
    date: string | Date;
    medications: {
      name: string;
      frequency: string;
    }[];
  };
}

const PrescriptionCard = ({ prescription }: PrescriptionCardProps) => {
  return (
    <article className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center gap-2 text-xs font-medium text-primary">
        <Pill className="h-3.5 w-3.5" />
        Prescription
      </div>

      <p className="mt-2 line-clamp-2 text-sm font-semibold text-foreground">
        {prescription.diagnosis}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        {prescription.doctorName} ·{" "}
        {format(new Date(prescription.date), "dd MMM yyyy")}
      </p>

      {prescription.medications.length > 0 && (
        <ul className="mt-3 space-y-1">
          {prescription.medications.slice(0, 2).map((medication, index) => (
            <li
              key={`${medication.name}-${index}`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">{medication.name}</span>·{" "}
              {medication.frequency}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default PrescriptionCard;
