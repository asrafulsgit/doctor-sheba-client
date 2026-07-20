import { StatusBadge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Payment } from "@/types/payment";
import { format } from "date-fns";
import PaymentActionMenu from "./PaymentActionMenu";

const headers = [
  "Date",
  "Doctor",
  "Method",
  "Transaction ID",
  "Status",
  "Amount",
  "Action",
];
const PaymentTable = ({ payments }: { payments: Payment[] }) => {
  return (
    <div className="mt-2 overflow-hidden rounded-lg border">
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
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="text-muted-foreground">
                {format(payment.createdAt,"dd MMM yyyy")}
              </TableCell>
              <TableCell className="font-medium text-foreground">
                 {payment.appointment.doctor.name}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {payment.transactionId}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {payment.paymentGatewayData?.method[0]}
              </TableCell>

              <TableCell>
                <StatusBadge status={payment.status} />
              </TableCell>

              <TableCell className="font-semibold text-foreground">
                {`৳${payment.amount.toLocaleString()}`}
              </TableCell>
              <TableCell className="font-semibold text-foreground">
                <PaymentActionMenu payment={payment} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentTable;
