export interface tasksResponse {
  message: string;
  tasks: TaskItem[];
}

export interface TaskItem {
  _id: string;
  user_id: string;
  title: string;
  importance: "low" | "medium" | "high";
  completed: boolean;
  description: string;
  created_at: string;
  __v: number;
}
