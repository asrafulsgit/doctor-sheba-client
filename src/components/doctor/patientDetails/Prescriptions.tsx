import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDate } from "@/helpers/getDate";
import { IPrescription } from "@/types/prescription";

const headers = ["Medication", "Dosage", "Frequency", "Duration"];

const Prescriptions = ({
  prescriptions,
}: {
  prescriptions: IPrescription[];
}) => {
  return (
    <div className="space-y-3">
      {prescriptions.map((prescription) => (
        <div
          key={prescription.id}
          className="rounded-2xl border border-border bg-card p-5 shadow-soft"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold">{prescription.diagnosis}</p>
              <p className="text-xs text-muted-foreground">
                {getDate(prescription.createdAt, "dd MMM yyyy")} ·{" "}
                {prescription?.doctor?.name}
                {prescription.followUpDate && (
                  <>
                    {" "}
                    · Follow-up{" "}
                    {getDate(prescription.followUpDate, "dd MMM yyyy")}
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="mt-3 overflow-hidden rounded-lg border border-border">
            <Table className="bg-surface">
              <TableHeader>
                <TableRow>
                  {headers.map((h) => (
                    <TableHead
                      key={h}
                      className="uppercase text-sm text-muted-foreground px-2"
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody className="text-sm">
                {prescription?.medications?.map((m, i) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {m.dosage}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {m.frequency}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {m.duration}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {prescription.instructions && (
            <p className="mt-3 rounded-lg bg-surface p-3 text-sm">
              <span className="font-medium">Instructions: </span>
              <span className="text-muted-foreground">
                {prescription.instructions}
              </span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Prescriptions;
