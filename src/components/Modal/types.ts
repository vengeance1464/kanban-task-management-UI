export interface IBaseModalProps{
    open:boolean,
    handleClose:()=>void
}


export type AddTaskProps ={
    status: string;
} & IBaseModalProps