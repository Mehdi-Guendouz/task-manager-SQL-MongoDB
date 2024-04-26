import AddTaskModal from "@/components/Modal/AddTaskModal";
import Task from "@/components/shared/Task";
import { Separator } from "@/components/ui/separator";

const Home = () => {
  return (
    <div className="py-6 px-4 space-y-4">
      <div>
        <h1 className="font-bold text-3xl ">Home</h1>
      </div>
      <div className="w-full flex items-center justify-between px-2 py-4">
        <h3 className="text-lg font-semibold">Add your task</h3>
        <AddTaskModal />
      </div>
      <Separator />
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Tasks</h3>
        <div className="space-y-3">
          <Task
            id={1}
            title="Task 1"
            description="Description 1"
            status="low"
          />
          <div className="px-5">
            <Separator />
          </div>
          <Task
            id={2}
            title="Task 2"
            description="Description 2"
            status="high"
          />
          <div className="px-5">
            <Separator />
          </div>
          <Task
            id={2}
            title="Task 3"
            description="Description 3"
            status="medium"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
