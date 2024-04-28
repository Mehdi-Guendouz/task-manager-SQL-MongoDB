import { axiosInstance } from "@/api/config";
import LoaderComponent from "@/components/shared/LoaderComponent";
import { useDebounce } from "use-debounce";
import Task from "@/components/shared/Task";
import { Separator } from "@/components/ui/separator";
import { TaskItem } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { Input } from "@/components/ui/input";

const History = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [value] = useDebounce(text, 1000);
  // getting all tasks
  const getCompletedTasks = (search: string) => {
    setLoading(true);
    axiosInstance
      .get(`/task?completed=true&search=${search}`)
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
    getCompletedTasks(value);
  }, [value]);

  // task/?completed=false
  return (
    <div className="py-6 px-4 space-y-4">
      <Toaster richColors />
      <div>
        <h1 className="font-bold text-3xl ">History</h1>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Tasks Completed</h3>
          <div>
            <Input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Search completed task"
              className="py-2 px-3 w-[300px] rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="space-y-3">
          {loading ? (
            <LoaderComponent />
          ) : tasks.length > 0 ? (
            tasks.map((task) => (
              <Task key={task._id} task={task} setTasks={setTasks} />
            ))
          ) : (
            <div className="flex text-center justify-center py-10">
              <p>
                No completed task,{" "}
                <Link to={"/"} className="underline text-blue-900">
                  complete one now
                </Link>{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
