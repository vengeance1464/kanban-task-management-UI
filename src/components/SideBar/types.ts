
export type SideBarItemProps={
    title:string
    isItemSeleced:boolean
    onClick:()=>void
}


export type SideBarProps={
    onClick:()=>void
    mobileSideBarVisible:boolean
    handleClose:()=>void
    addBoardOpen:boolean;
    setAddBoardOpen:(open:boolean)=>void
}