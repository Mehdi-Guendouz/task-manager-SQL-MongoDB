import { Checkbox } from "../ui/checkbox";
import Status from "./Status";
import AddTaskModal from "../Modal/AddTaskModal";
import AlterModal from "../Modal/AlterModal";

type TaskProps = {
  id: number;
  title: string;
  description: string;
  status: string;
};

const Task = ({ id, title, description, status }: TaskProps) => {
  console.log(id);
  return (
    <div className="flex items-center w-full gap-2">
      <div className="flex items-start">
        <Checkbox />
      </div>
      <div className="w-full max-w-[500px]">
        <div className="flex items-center gap-2">
          <h1 className="text-base">{title}</h1>
          <Status status={status} />
        </div>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      <div className="flex items-center justify-end gap-1  w-full">
        <AddTaskModal edit />

        <AlterModal />
      </div>
    </div>
  );
};

export default Task;
