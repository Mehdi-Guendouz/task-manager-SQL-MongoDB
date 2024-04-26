import { axiosInstance } from "@/api/config";
import AddTaskModal from "@/components/Modal/AddTaskModal";
import LoaderComponent from "@/components/shared/LoaderComponent";
import Task from "@/components/shared/Task";
import { Separator } from "@/components/ui/separator";
import { TaskItem } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // getting all tasks
  const getTasks = () => {
    setLoading(true);
    axiosInstance
      .get("/task")
      .then((res) => {
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
    getTasks();
  }, []);

  return (
    <div className="py-6 px-4 space-y-4">
      <div>
        <h1 className="font-bold text-3xl ">Home</h1>
      </div>
      <div className="w-full flex items-center justify-between px-2 py-4">
        <h3 className="text-lg font-semibold">Add your task</h3>
        <AddTaskModal setTasks={setTasks} />
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
