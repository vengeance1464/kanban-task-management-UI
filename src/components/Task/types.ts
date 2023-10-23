export interface ITaskProps {
  task: Task;
}

export type SubTask = {
  title: string;
  isCompleted: boolean;
  id:number
};
export type Task = {
  id:number;
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
