import { Task } from "../../components/Task/types"

type UpdateSubtaskActionType={
    
    subTaskIndex:number
} & Task

export {UpdateSubtaskActionType}