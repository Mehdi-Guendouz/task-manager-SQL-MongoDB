import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { axiosInstance } from "@/api/config";
import { TaskItem } from "@/types";

type AddTaskModalProps = {
  edit?: boolean;
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
  task?: TaskItem;
  isDisabled?: boolean;
};

const AddTaskModal = ({
  edit,
  setTasks,
  task,
  isDisabled = false,
}: AddTaskModalProps) => {
  const [title, setTitle] = useState(() => task?.title || "");
  const [description, setDescription] = useState(() => task?.description || "");
  const [importance, setImportance] = useState<"low" | "medium" | "high">(
    () => task?.importance || "low"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // handle the modal firing manually
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (task) {
      console.log(task);
      axiosInstance
        .put(`/task/${task._id}`, {
          title,
          description,
          importance,
          completed: false,
        })
        .then((res) => {
          console.log(res.data);
          setTasks((prev) =>
            prev.map((t) => (t._id === task._id ? res.data.task : t))
          ); // update the tasks
          setTitle("");
          setDescription("");
          setImportance("low");
          setError("");
          handleClose();
        })
        .catch((err) => {
          setError(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      axiosInstance
        .post("/task", { title, description, importance, completed: false })
        .then((res) => {
          console.log(res.data);
          setTasks((prev) => [...prev, res.data.task]); // update the tasks
          setTitle("");
          setDescription("");
          setImportance("low");
          setError("");
          handleClose();
        })
        .catch((err) => {
          setError(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={cn(
          "border rounded-sm px-5 py-2 hover:bg-black hover:text-white transition-all duration-200",
          edit ? "border-none p-2" : "text-sm font-medium"
        )}
        disabled={isDisabled}
      >
        {!edit ? "Add A New Task" : <Edit2 className="w-4 h-4" />}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="py-4 text-xl font-bold capitalize">
            Add a task
          </DialogTitle>
          <form action="" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label
                className="text-black capitalize text-base"
                htmlFor="title"
              >
                title
              </Label>
              <Input
                id="title"
                type="title"
                placeholder="Do the laundry"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label
                className="text-black capitalize text-base"
                htmlFor="Description"
              >
                Description
              </Label>
              <Textarea
                id="Description"
                placeholder="Write something..."
                required
                value={description}
                className="resize-none"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label
                className="text-black capitalize text-base"
                htmlFor="importance"
              >
                importance
              </Label>
              <Select
                onValueChange={(value: "low" | "medium" | "high") =>
                  setImportance(value)
                }
                value={importance}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Importance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <div className="py-4">
              <Button type="submit" className="w-full" disabled={loading}>
                Add Task
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
