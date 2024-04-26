import { axiosInstance } from "@/api/config";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TaskItem } from "@/types";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type AlterModalProps = {
  id: string;
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
  isDisabled?: boolean;
};

const AlterModal = ({ id, setTasks, isDisabled }: AlterModalProps) => {
  const handleDelete = () => {
    console.log(id);
    // delete the task
    axiosInstance
      .delete(`/task/${id}`)
      .then((res) => {
        console.log(res.data);
        setTasks((prev) => prev.filter((t) => t._id !== id));
        toast.success("Task deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting task");
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={
          "rounded-sm p-2 hover:bg-red-600 hover:text-white transition-all duration-200"
        }
        disabled={isDisabled}
      >
        <Trash2 className="w-4 h-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-400"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlterModal;
