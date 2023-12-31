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
  boardId:number;
};

export interface ITaskColumnProps {
  tasks: Task[];
  updateTaskColumn: any;
  status:string;
}

export interface ITaskStateProps {
  taskState: string;
  taskCount: number;
  color: string;
}
