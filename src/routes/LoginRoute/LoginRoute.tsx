import LoginPage from "../../components/GameComponents/LoginPage/LoginPage"; 
import userStore from "../../types/store/UserStore";
import { observer } from "mobx-react-lite"
import { Link,} from 'react-router-dom';
import classes from "./LoginRoute.module.css"
import { useState } from "react";
const LoginRoute: React.FC = () => {
  const { logined, socket, teamName,borderColor } = userStore;
  const [avatar, setAvatar] = useState<string | undefined>(undefined);  
  const fun = (teamName:string, borderColor:string, avatar:string | undefined ) => { 
        socket.connect(teamName, borderColor, avatar);
        setAvatar(avatar)

    
  }    

    return (

      !logined ? <LoginPage fun = {fun} /> : ( <div className={classes.whenLogined}>          
          {teamName}
          <div className={classes.avatar} style={{borderColor : borderColor}}><img src={avatar} className={classes.avatarImage}/></div>
        
         <Link 
        to="/game">
           
        <a>Войти в игру</a>
      </Link>
      </div>)
    );
  };
  
const ObservedLoginRoute = observer(LoginRoute);

export default ObservedLoginRoute;