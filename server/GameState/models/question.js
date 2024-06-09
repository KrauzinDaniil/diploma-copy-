export class QuestionHandler{  
    
    question 
    answers
    owner
    score 
    difficulty 
    type
    modeMultiple
    rightAnswer
    inBlitzMode
    loseScoreMode 
    constructor () { 
         this.question = "" 
         this.answers = []
         this.owner = null;
         this.modeMultiple = false
         this.inBlitzMode = false;
         this.loseScoreMode = false;
    }
    

    setQuestion(data, array, type,  difficulty, rightAnswer) {
        this.type= type  
        this.question = data
        this.answers = array  
        this.difficulty = difficulty
        this.rightAnswer = rightAnswer
        switch(difficulty)  {
            case "easy" : 
            this.score = 200 
            break
            case "medium" : 
            this.score = 300
            break 
            case "hard" : 
            this.score = 400
        }
    }
    setOwner(owner) { 
        this.owner = owner; 
    }

    setMode(mean) { 
        this.modeMultiple = mean;
    }
    setScore(score) { 
        this.score = score
    }
    multiplyScore(multipier) { 
        this.score *= multipier;
        this.score = Math.floor(this.score)
    }
    setLoseScoreMode(mode) { 
       this.loseScoreMode = mode;
    } 


}