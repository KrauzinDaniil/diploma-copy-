export class CardAction  { 
    questCards = new Map()
    constructor() { 
      this.questCards.set(1,  {typeOf: "shop"})
      this.questCards.set(2,  {type: "algebra", difficulty:"easy", typeOf:"quest"}) 
      this.questCards.set(3,  {typeOf:"chance"}) 
      this.questCards.set(4,  {type: "algebra", difficulty:"easy", typeOf:"quest"})
      this.questCards.set(5,  {type: "algebra", difficulty:"easy", typeOf:"quest"})
      this.questCards.set(6,  {typeOf:"chance"}) 
      this.questCards.set(7,  {type: "algebra", difficulty:"medium", typeOf:"quest"})
      this.questCards.set(8,  {typeOf:"chance"})    
      this.questCards.set(9,  {type: "algebra", difficulty:"medium", typeOf:"quest"}) 
      this.questCards.set(10,  {type: "algebra", difficulty:"hard", typeOf:"quest"})
      this.questCards.set(11,   {type: "algebra", difficulty:"hard", typeOf:"quest"})
      this.questCards.set(12,  {type: "programming", difficulty:"easy", typeOf:"quest"})
      this.questCards.set(13,  {typeOf:"chance"})   
      this.questCards.set(14,  {type: "programming", difficulty:"easy", typeOf:"quest"})  
      this.questCards.set(15,  {type: "programming", difficulty:"medium", typeOf:"quest"})
      this.questCards.set(16,  {typeOf:"chance"}) 
      this.questCards.set(17,  {type: "programming", difficulty:"medium", typeOf:"quest"})
      this.questCards.set(18,  {typeOf:"chance"}) 
      this.questCards.set(19,  {type: "programming", difficulty:"hard", typeOf:"quest"})    
      this.questCards.set(20,  {type: "programming", difficulty:"hard", typeOf:"quest"})   
      this.questCards.set(21,  {typeOf:"spinAgain"}) 
      this.questCards.set(22,  {type: "geometry", difficulty:"easy", typeOf:"quest"})
      this.questCards.set(23,  {typeOf:"chance"}) 
      this.questCards.set(24,  {type: "geometry", difficulty:"easy", typeOf:"quest"}) 
      this.questCards.set(25,  {type: "geometry", difficulty:"medium", typeOf:"quest"})
      this.questCards.set(26,  {typeOf:"chance"}) 
      this.questCards.set(27,  {type: "geometry", difficulty:"medium", typeOf:"quest"})  
      this.questCards.set(28,  {type: "geometry", difficulty:"hard", typeOf:"quest"})
      this.questCards.set(29,  {typeOf:"chance"})      
      this.questCards.set(30,  {type: "geometry", difficulty:"hard", typeOf:"quest"}) 
      this.questCards.set(31,   {type: "algebra", difficulty:"hard", typeOf:"quest"})
      this.questCards.set(32,  {type: "logic", difficulty:"easy", typeOf:"quest"})   
      this.questCards.set(33,  {type: "logic", difficulty:"easy", typeOf:"quest"})  
      this.questCards.set(34,  {typeOf:"chance"}) 
      this.questCards.set(35,  {type: "logic", difficulty:"easy", typeOf:"quest"}) 
      this.questCards.set(36,  {typeOf:"chance"}) 
      this.questCards.set(37,  {typeOf:"chance"}) 
      this.questCards.set(38,  {type: "logic", difficulty:"hard", typeOf:"quest"})  
      this.questCards.set(39,  {typeOf:"chance"}) 
      this.questCards.set(40,  {type: "logic", difficulty:"hard", typeOf:"quest"})  
      this.questCards.set("random", {type:["programming", "logic", "geometry", "algebra"], difficulty:["easy", "medium", "hard"], typeOf:"random"});
      this.questCards.set("blitz",  { type:["programming", "logic", "geometry", "algebra"], difficulty:["easy", "medium"], typeOf:"blitzQuest"});
      
     }



     get(position) { 
   
      switch (this.questCards.get(position).typeOf) {
         case "quest" :
         return  { action:"quest",  data:{type: "algebra", difficulty:"easy"} };
         case "chance" : 
         return { action: "chance"} 
         case "random": 
         return {action: "quest", data: {type: "algebra", difficulty:"easy"}} 
         case "blitz":
         return {action: "blitz"} 
         case "blitzQuest":
         return {action: "quest", data: {type: "algebra", difficulty:"easy"}} 
         case "spinAgain":
         return {action: "spinAgain"}
         case "prison": 
         return {action: "prison"}
         case "shop": 
         return {action: "shop"}

       
     }

     }
}