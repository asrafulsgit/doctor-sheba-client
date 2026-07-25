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
import { IMedicalReport } from "@/types/medical-report";
import { Eye } from "lucide-react";
import Link from "next/link";

const headers = ["NAME", "DATE", "ACTION"];

const Reports = ({ reports }: { reports: IMedicalReport[] }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((h) => (
              <TableHead
                key={h}
                className="uppercase text-xs text-muted-foreground px-2"
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.reportName}</TableCell>
              <TableCell className="font-medium">
                {getDate(report.updatedAt, "dd MMM yyyy")}
              </TableCell>
              <TableCell>
                <Link
                  href={report.reportLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Reports;
