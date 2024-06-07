import { userTableDisplay } from "./userTableType";

export interface gameState { 
    players: userTableDisplay[]   
    isStarted :boolean;
    player: userTableDisplay;
    playerTurn: userTableDisplay; 
    
}