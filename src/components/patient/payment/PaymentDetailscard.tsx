import { IPayment } from "@/types/payment";
import { Row } from "./Success";
import { StatusBadge } from "@/components/ui/badge";
import { Wallet2 } from "lucide-react";

const PaymentDetailscard = ({ payment }: { payment: IPayment }) => {
  return (
    <dl className="mt-4 space-y-3 text-sm">
      <Row
        label="Payment ID"
        value={<span className="font-mono">{payment.id}</span>}
      />
      <Row
        label="Transaction ID"
        value={<span className="font-mono">{payment.transactionId}</span>}
      />
      <Row label="Status" value={<StatusBadge status={payment.status} />} />
      <Row
        label="Paid on"
        value={new Date(payment.updatedAt).toLocaleString()}
      />
      <Row
        label="Amount"
        value={
          <span className="inline-flex items-center gap-1.5 text-base font-semibold text-foreground">
            <Wallet2 className="h-4 w-4 text-primary" />৳
            {payment.amount.toLocaleString()}
          </span>
        }
      />
    </dl>
  );
};

export default PaymentDetailscard;
