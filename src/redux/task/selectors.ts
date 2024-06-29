import { Task } from "../../components/Task/types";
import { RootState } from "../store";

const fetchTasksByColumns=(tasks:Task[])=>{
   const groupedTasks=tasks.reduce((accum:any,curr:Task)=>{
      if(!(curr.status in accum))
      {
        accum[curr.status]=[curr]
      }
      else
      {
        accum[curr.status]=[...accum[curr.status],curr]
      }

      return accum
   },{})

   return groupedTasks
}


const tasksSelector=(state:RootState)=>fetchTasksByColumns(state.tasks)

const allTasksSelector=(state:RootState)=>state.tasks

export {tasksSelector,allTasksSelector}