import { SubTask, Task } from "../../Task/types"

// const filterSubtasks=(data:any)=>{
//     let subTasks:SubTask[]=[]
//     const filteredSubtasks=Object.keys(data).filter(key=>key.includes('subTask-'))

//      if(filteredSubtasks.length>0)
//      {
//        subTasks= filteredSubtasks.map(subTask=>{return {
//             title:subTask,
//             isCompleted:false
//         }})
//      }

//      return subTasks
// }

export const mapAddTaskData=(data:any):Task=>{
console.log("data",data)
     let task={} as Task
     task.id=data.id
     task.title=data.title
     task.description=data.description
     task.status=data.status
     task.subtasks=  data.subTasks


     return task
}