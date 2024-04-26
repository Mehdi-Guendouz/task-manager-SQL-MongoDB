import { cn } from "@/lib/utils";

type StatusProps = {
  status: string;
};

const Status = ({ status }: StatusProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center py-1 px-2 rounded-2xl bg-red-300 ",
        status === "low"
          ? "bg-green-300"
          : status === "high"
          ? "bg-red-300"
          : "bg-yellow-300"
      )}
    >
      <span className="text-[8px] font-bold ">{status}</span>
    </div>
  );
};

export default Status;
