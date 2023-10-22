import { Task } from "../Task/types";

export interface IBaseModalProps{
    open:boolean,
    handleClose:()=>void
}


export type AddTaskProps ={
    isUpdate?:boolean
    task?:Task
} & IBaseModalProps


export type UpdateTaskProps={
     task:Task
} & IBaseModalProps


export type DeleteProps={
      onDelete:any
      onCancel:any
      title:string
      description:string
} & IBaseModalProps