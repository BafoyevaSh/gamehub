import { cn } from "@/lib/utils";

type Status = "pending" | "approved" | "rejected" | "banned";

const statusStyles: Record<Status, string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  approved: "bg-accent/15 text-accent border-accent/30",
  rejected: "bg-destructive/15 text-destructive border-destructive/30",
  banned: "bg-destructive/15 text-destructive border-destructive/30",
};

const statusLabels: Record<Status, string> = {
  pending: "Kutilmoqda",
  approved: "Tasdiqlangan",
  rejected: "Rad etilgan",
  banned: "Bloklangan",
};

interface StatusPillProps {
  status: Status;
  className?: string;
}

const StatusPill = ({ status, className }: StatusPillProps) => (
  <span className={cn(
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
    statusStyles[status],
    className
  )}>
    {statusLabels[status]}
  </span>
);

export default StatusPill;
