import { random } from "@ctrl/tinycolor";
import { DataBase } from "../../db/mysql.js";
import { QuestionHandler } from "../models/question.js";
import { CardAction } from "./cardAction.js";
import { response } from "express";
export class ActionHandler { 
   QUEST;
   actionSelector 
   db
   bonusCardActivated
   score
   constructor() { 
      this.QUEST = new QuestionHandler();
      this.actionSelector = new CardAction()
      this.db = DataBase.getINSTANCE()
      this.bonusCardActivated = false;
      this.score = 200;
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
    modifyQuestMultiplier() { 
      if(this.bonusCardActivated) { return {response : false}}
      this.bonusCardActivated = true;
      this.QUEST.multiplyScore(2);
      this.QUEST.setLoseScoreMode(true);
      return { data : this.QUEST, response:true }
    }


    returnOutcomeToScreen(object) { 
        switch(object.action) { 
         case "quest": 
         return this.provideQuest(object);
         case "spinn":
         return this.handleSpinRequest(object.number);
        }
    }
    modifyQuestAnswers(object) { 
      if(this.bonusCardActivated) { return {response : false}}
      this.bonusCardActivated = true;
        while(object !== 0 ) { 
          const numb = Math.floor(Math.random() * 10); 
          if(numb !== this.QUEST.rightAnswer - 1) { 
             this.QUEST.answers[numb] = "incorrect"
             object--;
          }
        }
        return {response : true, data : this.QUEST}
               
    }


    provideQuest(object){ 
      
      let res;
      if(!this.QUEST.modeMultiple) {
         if(object.number === this.QUEST.rightAnswer.toString()) { 
           res = {res: "Правильно", score:this.QUEST.score, mode: "single"}
         } else { res = {res: "Неправильно",  score: this.QUEST.loseScoreMode ? this.QUEST.score * -1 : 0 , mode:"single"} }
        

     }

     return res;
    }



    handleChance() { 
      return { action: "chance"};
    }

    handleQuest(object, action) {
      this.bonusCardActivated = false; 
     
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
        this.QUEST.setScore(action.data.difficulty === "easy" ? 200 : action.data.difficulty === "medium" ? 300 : 400) 
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