import { Checkbox } from "../ui/checkbox";
import Status from "./Status";
import AddTaskModal from "../Modal/AddTaskModal";
import AlterModal from "../Modal/AlterModal";
import { TaskItem } from "@/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

type TaskProps = {
  task: TaskItem;
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
};

const Task = ({ task, setTasks }: TaskProps) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div
      className={cn(
        "flex items-center w-full gap-2 ",
        isCompleted && "line-through"
      )}
    >
      <div className="flex items-start">
        <Checkbox onCheckedChange={handleComplete} />
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
