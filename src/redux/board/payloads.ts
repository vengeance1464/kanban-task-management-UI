import { axios } from "../../api"


const fetchUserBoardsPayload:any=async ()=>{

    const allBoards=await axios.get("/board/getAll")

    return allBoards.data
}


export {fetchUserBoardsPayload}