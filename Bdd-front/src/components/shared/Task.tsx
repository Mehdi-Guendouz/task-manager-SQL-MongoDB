import { Checkbox } from "../ui/checkbox";
import Status from "./Status";
import AddTaskModal from "../Modal/AddTaskModal";
import AlterModal from "../Modal/AlterModal";
import { TaskItem } from "@/types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
import { axiosInstance } from "@/api/config";
import { toast } from "sonner";
import { Button } from "../ui/button";

type TaskProps = {
  task: TaskItem;
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
};

const Task = ({ task, setTasks }: TaskProps) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(() => task.completed);
  const [loading, setLoading] = useState<boolean>(false);

  const handleComplete = (checked: CheckedState) => {
    let data: { completed: boolean } = {} as { completed: boolean };
    if (checked) {
      setIsCompleted(true);
      data = {
        completed: true,
      };
    } else {
      setIsCompleted(false);
      data = {
        completed: false,
      };
    }
    setLoading(true);

    axiosInstance
      .put(`/task/${task._id}`, data)
      .then((res) => {
        console.log("response", res.data);
        toast.warning("Task updated ", {
          action: (
            <div className="w-full flex justify-end">
              <Button
                onClick={() => handleUndo(!data.completed)}
                variant={"outline"}
              >
                undo
              </Button>
            </div>
          ),
        });

        setTasks((prev) => prev.filter((t) => t._id !== task._id));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error updating task");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUndo = (checked: boolean) => {
    setIsCompleted(checked);
    setLoading(true);
    axiosInstance
      .put(`/task/${task._id}`, { completed: checked })
      .then((res) => {
        console.log("response", res.data);
        toast.success("Task updated successfully");
        setTasks((prev) => [...prev, res.data.updatedTask]);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error updating task");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className={cn(
        "flex items-center w-full gap-2 ",
        isCompleted && "line-through"
      )}
    >
      <div className="flex items-start">
        <Checkbox
          onCheckedChange={(checked) => handleComplete(checked)}
          checked={isCompleted}
          disabled={loading}
        />
      </div>
      <div className="w-full max-w-[500px]">
        <div className="flex items-center gap-2">
          <h1 className="text-base">{task.title}</h1>
          <Status status={task.importance} />
        </div>
        <p className="text-xs text-gray-500">{task.description}</p>
      </div>

      <div className="flex items-center justify-end gap-1  w-full">
        <AddTaskModal
          setTasks={setTasks}
          task={task}
          edit
          isDisabled={isCompleted}
        />

        <AlterModal
          id={task._id}
          setTasks={setTasks}
          isDisabled={isCompleted}
        />
      </div>
    </div>
  );
};

export default Task;
