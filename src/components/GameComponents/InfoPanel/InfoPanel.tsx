import classes from './InfoPanel.module.css'
import { userTableDisplay } from '../../../types/userTableType';

type dispatch = (action: string, data: string) => void;


const InfoPanel: React.FC<{
  player: userTableDisplay[];
  inGame: boolean;
  triggerFunction: dispatch;
  teamName: string;
  personalData: userTableDisplay;
  setOnHoverMyStates: (meaning: boolean) => void;
}> = ({
  player,
  inGame,
  triggerFunction,
  teamName,
  personalData,
  setOnHoverMyStates,
}) => {
  function showCards() {
    alert(personalData.bonusCards);
  }
  return (
    <div className={classes.infoPanel}>
      <div className={classes.scoreBoard}>
        <div className={classes.scoreList}>Команды:</div>
        <div className={classes.teams}>
          {player.map((item, index) => {
            return (
              <div className={classes.teamElement}>
                {index + 1}. {item.teamName} : {item.score}{" "}
                <div
                  className={classes.teamCircle}
                  style={{ borderColor: item.borderColor }}
                >         
                 <img src={item.avatar} className={classes.imageTeamy} />{" "}
                </div>{" "}
              </div>
            );
          })}
        </div>
      </div>

      {inGame ? (
        <div className={classes.yourPanel}>
          <div className={classes.youLabel}> Вы</div>

          <div className={classes.teamData}>
            <div className={classes.teamAndAvatar}>
              <div className={classes.teamName}> {teamName} </div>
              <div className={classes.circle}>
                <img src={personalData?.avatar} className={classes.imga} />
              </div>
            </div>
            <div className={classes.scores}>Очков : {personalData?.score}</div>
          </div>

          <div className={classes.whatYouOwn}>
            {" "}
            <div
              onMouseOver={() => {
                setOnHoverMyStates(true);
              }}
              onMouseLeave={() => {
                setOnHoverMyStates(false);
              }}
            >
              Ваши захваченные <br /> поля
            </div>{" "}
            <div onClick={showCards}> Ваши карточки </div>{" "}
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            triggerFunction("imReady", "");
          }}
        >
         
          готов
        </button>
      )}
    </div>
  );
};
export default InfoPanel;
  