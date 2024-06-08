import classes from "./Dices.module.css";
import { useEffect, useState } from "react";
import Animation from "../../../animations/animation";

const Dices: React.FC<{
  numberRolled: number;
  isRolling: boolean;
 
}> = ({ numberRolled, isRolling,  }) => {
  const [animation, setAnimation] = useState<React.ReactElement>(
    <Animation point={1} />
  );
  const [animation2, setAnimation2] = useState<React.ReactElement>(
    <Animation point={1} />
  );

  useEffect(() => {
    if (isRolling === true) {
      let point1;
      let point2;
      const interval = setInterval(() => {
        point1 = Math.floor(Math.random() * 6 + 1);
        point2 = Math.floor(Math.random() * 6 + 1);
        setAnimation(<Animation point={point1} />);
        setAnimation2(<Animation point={point2} />);
      }, 250);
      setTimeout(() => {
        clearInterval(interval);
      }, 2750);
    }
  }, [isRolling]);

  useEffect(() => {
    setTimeout(() => {
      if (numberRolled !== 0) {
        let point1;
        let point2;
        if (numberRolled > 6) {
          point1 = 6;
          point2 = numberRolled - point1;
        } else {
          point1 = numberRolled - 1;
          point2 = 1;
        }
        setAnimation(<Animation point={point1} />);
        setAnimation2(<Animation point={point2} />);
      }
    }, 1000);
  }, [numberRolled]);

  return (
    <div className={classes.dicess}>
   
      <div className={classes.cubic}>{animation}</div>

      <div className={classes.cubic}>{animation2}</div>
    </div>
  );
};
export default Dices;
