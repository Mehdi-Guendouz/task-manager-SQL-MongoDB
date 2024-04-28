import { axiosInstance } from "@/api/config";
import AddTaskModal from "@/components/Modal/AddTaskModal";
import LoaderComponent from "@/components/shared/LoaderComponent";
import Task from "@/components/shared/Task";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TaskItem } from "@/types";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { useDebounce } from "use-debounce";

const Home = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [value] = useDebounce(text, 1000);

  // getting all tasks
  const getTasks = (search: string) => {
    setLoading(true);
    axiosInstance
      .get(`/task?completed=false&search=${search}`)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error getting tasks");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getTasks(value);
  }, [value]);

  return (
    <div className="py-6 px-4 space-y-4">
      <Toaster richColors />
      <div>
        <h1 className="font-bold text-3xl ">Home</h1>
      </div>
      <div className="w-full flex items-center justify-between px-2 py-4">
        <h3 className="text-lg font-semibold">Add your task</h3>
        <AddTaskModal setTasks={setTasks} />
      </div>
      <div className="px-4">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search task"
          className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <Separator />
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Tasks</h3>
        <div className="space-y-3">
          {loading ? (
            <LoaderComponent />
          ) : tasks.length > 0 ? (
            tasks.map((task) => (
              <Task key={task._id} task={task} setTasks={setTasks} />
            ))
          ) : (
            <div className="flex text-center justify-center py-10">
              <p>No tasks available, add a task!!!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
