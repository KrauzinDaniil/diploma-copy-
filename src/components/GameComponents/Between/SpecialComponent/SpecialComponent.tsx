import classes from './SpecialComponent.module.css'
import { userTableDisplay } from '../../../../types/userTableType';
const SpecialComponent: React.FC<{ id: number; player: userTableDisplay[]; createPortal: () => void, difficulty: string }> = ({
    id,
    player,
    createPortal,
    difficulty
  }) => {
   
  
    return <div className={classes.square}>
       TODO
      </div>
  };
  export default SpecialComponent;