import { Task } from "../Task/types";

export interface IBaseModalProps{
    open:boolean,
    handleClose:()=>void
    styles?:any
}


export type AddTaskProps ={
    isUpdate?:boolean
    task?:Task
} & IBaseModalProps


export type UpdateTaskProps={
     task:Task
     handleMenuItem:(index:number)=>void
} & IBaseModalProps


export type DeleteProps={
      onDelete:any
      onCancel:any
      title:string
      description:string
} & IBaseModalProps