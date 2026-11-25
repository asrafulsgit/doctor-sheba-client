import { StatusBadge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IRefund } from "@/types/payment";
import { format } from "date-fns";

const headers = ["Date", "Refund ID", "Payment ID", "Reason", "Status", "Amount"];

const RefundTable = ({ refunds }: { refunds: IRefund[] }) => {
  return (
    <div className="mt-2 overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead
                key={header}
                className="px-2 text-xs uppercase text-muted-foreground"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {refunds.map((refund) => (
            <TableRow key={refund.id}>
              <TableCell className="text-muted-foreground">
                {format(new Date(refund.createdAt), "dd MMM yyyy")}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {refund.stripeRefundId || refund.id}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {refund.paymentId}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {refund.reason || refund.failureReason || "—"}
              </TableCell>
              <TableCell>
                <StatusBadge status={refund.status} />
              </TableCell>
              <TableCell className="font-semibold text-foreground">
                {`৳${refund.amount.toLocaleString()}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RefundTable;
