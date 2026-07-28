import { StatusBadge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPatient } from "@/types/patient";
import { Payment, PaymentStatus } from "@/types/payment";
import { format } from "date-fns";

const headers = [
  "Date",
  "Patient",
  "Method",
  "Transaction ID",
  "Status",
  "Amount",
];

type PaymentProp = {
  status: PaymentStatus;
  appointmentId: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  transactionId: string;
  amount: number;
  appointment: {
    patient: IPatient;
  };
  paymentGatewayData: Record<string, any>;
};
const PaymentTable = ({ payments }: { payments: PaymentProp[] }) => {
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
                {format(payment.createdAt, "dd MMM yyyy")}
              </TableCell>
              <TableCell className="font-medium text-foreground">
                {payment.appointment.patient.name}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {payment.transactionId.slice(0,12)}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentTable;
