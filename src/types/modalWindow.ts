import { userTableDisplay } from "./userTableType";

export interface modalWindow {
    question:string; 
    answers:string[];
    owner:userTableDisplay
    difficulty:string 
    type:string
    outcome:string | null
    inBlitzMode: boolean

}