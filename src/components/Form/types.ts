import { SubTask } from "../Task/types";

  export type FormInputProps={
    name:string;
     control:any;
     label?:string
  }

  export type FormCheckboxProps={
    label:string
    onClick?:()=>void
    isChecked:boolean
  }