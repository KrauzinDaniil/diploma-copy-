import { bonusCard } from "./bonusCard"

export interface userTableDisplay {
    score:string 
    teamName:string
    borderColor:string 
    isReady: boolean
    position: number
    avatar: string
    ownedStates: number[]
    showStates: boolean
    bonusCards: bonusCard[]
    bonusScore: number;
    
} 