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
  provideBonusCardInfo(number) {
    switch (number) {
      case 1:
        if (this.bonusCards.get("appliedScore") !== undefined) {
            console.log({
                amount: this.bonusCards.get("appliedScore"),
                type: "appliedScore",
              })
          return {
            amount: this.bonusCards.get("appliedScore"),
            type: "appliedScore",
          };
        } else {
          return "Player has no bonus card 1";
        }
      case 2:
        if (this.bonusCards.get("deleteWrong") !== undefined) {
            console.log({
                amount: this.bonusCards.get("deleteWrong"),
                type: "appliedScore",
              })
          return {
            amount: this.bonusCards.get("deleteWrong"),
            type: "deleteWrong",
          };
        } else {
          return "Player has no bonus card 2";
        }

      case 3:
        if (this.bonusCards.get("addMultiplier") !== undefined) {
            console.log({
                amount: this.bonusCards.get(number),
                type: "appliedScore",
              })
          return {
            amount: this.bonusCards.get("addMultiplier"),
            type: "addMultiplier",
          };
        } else {
          return "Player has no bonus card 3";
        }
    }
  }
}
