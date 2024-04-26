import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Edit2 } from "lucide-react";

type AddTaskModalProps = {
  edit?: boolean;
};

const AddTaskModal = ({ edit }: AddTaskModalProps) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "border rounded-sm px-5 py-2 hover:bg-black hover:text-white transition-all duration-200",
          edit ? "border-none p-2" : "text-sm font-medium"
        )}
      >
        {!edit ? "Add A New Task" : <Edit2 className="w-4 h-4" />}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your task
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
