import { DataBase } from "../../db/mysql.js";
import { QuestionHandler } from "../models/question.js";
import { CardAction } from "./cardAction.js";
export class ActionHandler { 
   QUEST;
   actionSelector 
   db
   constructor() { 
      this.QUEST = new QuestionHandler();
      this.actionSelector = new CardAction()
      this.db = DataBase.getINSTANCE()
    
      }

   async returnActionToScreen(position) {
      let object;
      const action = this.actionSelector.get(position);
    
      switch (action.action) {
        case "quest":
          // ЗАГЛУШКА ДЛЯ ТЕСТА 
          object = await this.db.select(
            action.data.type,
            action.data.difficulty
          );
          return this.handleQuest(object, action, false);
          
        case "chance":
          return this.handleChance(); 
          
        case "blitz":
           return {action : "blitz"}
  
        case "spinAgain": 
           return {action: "spinAgain"}  
  
        case "prison":
           return {action: "prison"}
  
        case "shop" : 

           return  this.handleShop();
  
          
            
      }
    } 
    handleShop(){ 
      return { action: "shop"}
    }

    handleSpinRequest(numberRolled) {
      switch(numberRolled) {
          case 0: 
          return "quest"
          case 1: 
          return "addScores"
          case 2: 
          return "bonusCard"
          case 3: 
          return "doubleSpin"
          
        
      } 

    }

    returnOutcomeToScreen(object) { 
        switch(object.action) { 
         case "quest": 
         return this.provideQuest(object);
         case "spinn":
         return this.handleSpinRequest(object.number);
        }
    }


    provideQuest(object){ 
      console.log("enter")
      let res;
      if(!this.QUEST.modeMultiple) {
         if(object.number === this.QUEST.rightAnswer.toString()) { 
           res = {res: "Правильно", score:this.QUEST.score, mode: "single"}
         } else { res = {res: "Неправильно", mode:"single"} }
        

     }
     console.log(res)
     return res;
    }



    handleChance() { 
      return { action: "chance"};
    }

    handleQuest(object, action) {
      const questionToSend = Math.floor(Math.random() * object.length);
      this.rightAnswerAwaited = object[questionToSend]["rightAnswer"];
      const answers = [
        object[questionToSend]["answer1"],
        object[questionToSend]["answer2"],
        object[questionToSend]["answer3"],
        object[questionToSend]["answer4"],
        object[questionToSend]["answer5"],
        object[questionToSend]["answer6"],
        object[questionToSend]["answer7"],
        object[questionToSend]["answer8"],
        object[questionToSend]["answer9"],
      ];
  
        
        this.QUEST.setQuestion(
          object[questionToSend]["question"],
          answers,
          action.data.type,
          action.data.difficulty,
          object[questionToSend]["rightAnswer"]
        );
       /*else {
        
        this.QUEST.setQuestion(
          object[questionToSend]["question"],
          answers,
          action.data.type,
          action.data.difficulty,
          object[questionToSend]["rightAnswer"]
        );
        this.QUEST.setOwner(
          this.players.get(this.playerOwnedStates.get(this.actionPosition))
        );
        this.QUEST.setMode(true)
      }*/
      return { action: "quest", data: this.QUEST };
    }
    
}