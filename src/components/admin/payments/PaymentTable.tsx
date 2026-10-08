import { EmptyState } from "@/components/shared/PageState";
import { StatusBadge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDate } from "@/helpers/getDate";
import { Payment } from "@/types/payment";
import Link from "next/link";

const headers = ["Txn ID", "Date", "Patient", "Doctor", "Method", "Status"];
const PaymentTable = ({
  payments,
  isError,
  error,
}: {
  payments: Payment[];
  isError: boolean;
  error: Error | null;
}) => {
  if (isError || payments?.length === 0) {
    return (
      <EmptyState
        title="Nothing here yet"
        description={
          isError
            ? error?.message
            : "When you have payments, they'll show up here."
        }
        className="mt-2"
      />
    );
  }
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
            <TableHead className="uppercase text-xs text-right text-muted-foreground px-2">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {payments?.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="text-xs text-muted-foreground">
                {payment.transactionId}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {getDate(payment.createdAt, "dd MMM yyyy")}
              </TableCell>
              <TableCell>
                <Link
                  href={`/admin/patients/${payment.appointment.patient.id}`}
                  className="font-medium text-foreground hover:text-primary hover:underline"
                >
                  {payment.appointment.patient.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/doctors/${payment.appointment.doctor.id}`}
                  className="font-medium text-foreground hover:text-primary hover:underline"
                >
                  {payment.appointment.doctor.name}
                </Link>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {payment.paymentGatewayData?.method[0]}
              </TableCell>
              <TableCell className="">
                <StatusBadge status={payment.status} />
              </TableCell>
              <TableCell className="text-right font-semibold">
                ৳{payment.amount.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentTable;
