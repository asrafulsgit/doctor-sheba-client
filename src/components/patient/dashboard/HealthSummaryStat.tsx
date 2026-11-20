
interface HealthSummaryStatProps {
  label: string;
  value: string;
}

const HealthSummaryStat = ({
  label,
  value,
}: HealthSummaryStatProps) => {
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
};

export default HealthSummaryStat;
