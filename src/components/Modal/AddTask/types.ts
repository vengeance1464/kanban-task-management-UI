import { SubTask, Task } from "../../Task/types"


export interface IFormData{
     title:string;
     description:string;
     status:string;
}

export const mapAddTaskData=(data:any):Task=>{
     let task={} as Task
     task.id=data.id
     task.title=data.title
     task.description=data.description
     task.status=data.status
     task.subtasks=  data.subTasks
     task.boardId=data.boardId

     return task
}