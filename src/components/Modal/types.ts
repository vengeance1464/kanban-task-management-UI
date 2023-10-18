import { Task } from "../Task/types";

export interface IBaseModalProps{
    open:boolean,
    handleClose:()=>void
}


export type AddTaskProps ={
    status: string;
} & IBaseModalProps


export type UpdateTaskProps={
     task:Task
} & IBaseModalProps