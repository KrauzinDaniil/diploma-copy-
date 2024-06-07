import { useState } from "react";
import classes from "./animation.module.css";

const sequenceOne: React.FC = () => {
  return (
    <div className={classes.anim1}>
      <div className={classes.cube}></div>
    </div>
  );
};
const sequenceTwo: React.FC = () => {
  return (
    <div className={classes.anim2}>
      <div className={classes.cubeAnim2}></div>

      <div className={classes.cubeAnim2Right}></div>
    </div>
  );
};
const sequenceThree: React.FC = () => {
  return  <div className={classes.anim3}>
  <div className={classes.cubeAnim3First}></div>

  <div className={classes.cubeAnim3Second}></div>

  <div className={classes.cubeAnim3Third}></div>
</div>;
};
const sequenceFour: React.FC = () => {
  return <div className={classes.anim4}>

<div className={classes.anim4Wrapper}>
  <div className={classes.cubeAnim4First}></div>

  <div className={classes.cubeAnim4First}></div>
  </div>
  <div className={classes.anim4Wrapper}>
  <div className={classes.cubeAnim4First}></div>

  <div className={classes.cubeAnim4First}></div></div>
</div>;
};
const sequenceFive: React.FC = () => {
  return <div className={classes.anim4}>

  <div className={classes.anim4Wrapper}>
    <div className={classes.cubeAnim5Absolute}></div>
    <div className={classes.cubeAnim4First}></div>
  
    <div className={classes.cubeAnim4First}></div>
    </div>
    <div className={classes.anim4Wrapper}>
    <div className={classes.cubeAnim4First}></div>
  
    <div className={classes.cubeAnim4First}></div></div>
  </div>;
};
const sequenceSix: React.FC = () => {
  return <div className={classes.anim6}>
   <div className={classes.wrapperAnim6}>
   <div className={classes.cubeAnim6}></div>
   <div className={classes.cubeAnim6}></div>
   <div className={classes.cubeAnim6}></div>
   </div>
   <div className={classes.wrapperAnim6}>
   <div className={classes.cubeAnim6}></div>
   <div className={classes.cubeAnim6}></div>
   <div className={classes.cubeAnim6}></div>
   </div>
  </div>;
};

const Animation: React.FC<{ point: number }> = ({ point }) => {
  let ComponentToShow: React.FC;

  switch (point) {
    case 1:
      ComponentToShow = sequenceOne;
      break;
    case 2:
      ComponentToShow = sequenceTwo;
      break;
    case 3:
      ComponentToShow = sequenceThree;
      break;
    case 4:
      ComponentToShow = sequenceFour;
      break;
    case 5:
      ComponentToShow = sequenceFive;
      break;
    case 6:
      ComponentToShow = sequenceSix;
      break;
    default:
      ComponentToShow = sequenceOne;
      break;
  }

  return <div className={classes.cubeWrapper}>{<ComponentToShow />}</div>;
};

export default Animation;
