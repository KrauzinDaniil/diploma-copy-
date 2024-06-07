import mysql from "mysql"

export class DataBase {
  static INSTANCE 
  connection;
  constructor() { if(!DataBase.INSTANCE) { 
    
    /*this.connection = mysql.createConnection({
      host: "localhost", // test
      port: "3306", 
      user: "admin",
      database: "monopoly",
      password: "00900990",
    })
    this.connect();*/
    
  } else { return DataBase.INSTANCE}
  }

 static getINSTANCE() { 
    if (!DataBase.INSTANCE) {
      DataBase.INSTANCE = new DataBase();
    }
    return DataBase.INSTANCE;
  }


  connect() {
    this.connection.connect((err) => {
      if (err) {
        console.log(err);
        return err;
      } else {
        console.log("Database --- Fine");
      }
    });
  }

//select * from questions as ques join answers as ans on ques.id = ans.id where ques.type ='algebra' AND  ques.difficulty = 'easy'
/*
  async select(type, difficulty) {
    return new Promise((resolve, reject) => {
        this.connection.query(`select * from questions as ques join answers as ans on ques.id = ans.id where ques.type = "${type}" AND ques.difficulty = "${difficulty}"`, 

        (err, result, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
  }*/
 async select(type,difficulty ) { 
  return new Promise((resolve, reject) => {
    //this.connection.query(`select * from questions as ques join answers as ans on ques.id = ans.id where ques.type = "${type}" AND ques.difficulty = "${difficulty}"`, 
    resolve([{rightAnswer:1, answer1: 12, answer2: 13, answer3: 15, answer4: 20, answer5:1, answer6: 20, answer7 : 24, answer8: 90, answer9: "no right", question : "6 + 6?"}]);
    
    
  })
}
}
 