export class Player {
  score;
  isReady;
  position;
  avatar;
  ownedStates = [];
  bonusCards = new Map();
  constructor(teamName, borderColor, avatar, isReady, position) {
    this.teamName = teamName;
    this.borderColor = borderColor;
    this.score = 0;
    this.isReady = isReady;
    this.position = position;
    this.avatar = avatar;

  }
  addOwnedState(number) {
    this.ownedStates.push(number);
  }
  deleteOwnedState(number) {
    this.ownedStates = this.ownedStates.filter((element) => element !== number);
  }
  addBonusCard(number) {
    switch (number) {
      case 1:
        this.bonusCards.set("appliedScore", (Math.random() * 500));
        break;
      case 2:
        this.bonusCards.set(
            "deleteWrong",
          (Math.floor(Math.random() * 5) + 1)
        );
        break;
      case 3:
        this.bonusCards.set("addMultiplier", 2);
    }
  }
  applyScore() { 
    if(this.bonusCards.get("appliedScore") !== undefined) { 
    this.score += this.bonusCards.get("appliedScore")
    }
  }
  getWrongCardMultiplier() { 
    if(this.bonusCards.get("deleteWrong") === undefined) { return false}
    return this.bonusCards.get("deleteWrong")
  } 
  getQuestionScore() { 
    if(this.bonusCards.get("addMultiplier") === undefined) { return false}
    return this.bonusCards.get("addMultiplier")
  }
  provideBonusCardInfo(number) {
    switch (number) {
      case 1:
        if (this.bonusCards.get("appliedScore") !== undefined) {
         
          return {
            amount: this.bonusCards.get("appliedScore"),
            type: "appliedScore",
            price: 1000
          };
        } else {
          return false;
        }
      case 2:
        if (this.bonusCards.get("deleteWrong") !== undefined) {
          
          return {
            amount: this.bonusCards.get("deleteWrong"),
            type: "deleteWrong",
            price: 750
          };
        } else {
          return "Player has no bonus card 2";
        }

      case 3:
        if (this.bonusCards.get("addMultiplier") !== undefined) {
            
          return {
            amount: this.bonusCards.get("addMultiplier"),
            type: "addMultiplier",
            price: 1250
          };
        } else {
          return "Player has no bonus card 3";
        }
    }
  }
}
