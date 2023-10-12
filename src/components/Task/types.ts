export interface ITaskProps {
  task: Task;
}

export type SubTask = {
  title: string;
  isCompleted: boolean;
};
export type Task = {
  title: string;
  description: string;
  status: string;
  subtasks: SubTask[];
};

export interface ITaskColumnProps {
  tasks: Task[];
  updateTaskColumn: any;
}

export interface ITaskStateProps {
  taskState: string;
  taskCount: number;
  color: string;
}
