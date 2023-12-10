import { axios } from "../../api"


const fetchUserTasksPayload:any=async (id:number)=>{

    const allTasks=await axios.get(`/tasks/getAll/${id}`)

    return allTasks.data
}


export {fetchUserTasksPayload}