/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import classes from "./LoginPage.module.css";
import "./LoginPage.module.css";
import { TinyColor } from "@ctrl/tinycolor";
import { Form, Input, ColorPicker, Button, ConfigProvider, Select } from "antd";
import { ColorFactory } from "antd/es/color-picker/color";
import { SelectValue } from 'antd/lib/select';
const { Option } = Select;

interface props{   
       factory:ColorFactory;
       teamName:string

}
const LoginPage: React.FC<{fun: (teamName :string, borderColor : string, avatar:string | undefined) => void}> = ({fun}) => {
  const colors1 = ["#8b4513", "#e9b441"];
  const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
  

  const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());
    const onFinish = (values: props) => {
    fun(values.teamName, teamColor, selectedAvatar?.toString() );
    disableButton(true);
  };
  const abort = () => { 
    disableButton(false);
  }


  const handleAvatarChange = (value: string | SelectValue) => {
    setSelectedAvatar(value);
  };

  const [teamNickname, setTeamNickname] = useState("'Имя команды'");
  const [teamColor, setTeamColor] = useState("");
  const [disabl, disableButton] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | SelectValue | undefined>('');
  const changeValues = (changedValues) => {
    if (changedValues.teamName) {
      setTeamNickname(changedValues.teamName);
    }
    if (changedValues.borderColor) {
      const elem = document.getElementById("avatar");
      if (elem !== null) {
        elem.style.borderColor = changedValues.borderColor.toHexString();
        setTeamColor(changedValues.borderColor.toHexString())
      }
    }
  };

  return (
    <div className={classes.logination}>
      <div className={classes.innerForm}>
        <div className={classes.greeting}> Добро пожаловать </div>
        <div className={classes.form}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ maxWidth: 600, color: "white" }}
            onValuesChange={changeValues}
          >
            <Form.Item
              label={
                <span style={{ color: "white" }}>Введите имя команды</span>
              }
              name="teamName"
              style={{ color: "white" }}
              rules={[{ required: true, message: "Введите имя команды!" }]}
            >
              <Input style={{ color: "black" }} disabled = {disabl} />
            </Form.Item>

            <Form.Item
              label={
                <span style={{ color: "white" }}>
                  Выберите цвет рамки вашей команды
                </span>
              }
              name="borderColor"
              style={{ color: "white" }}
              rules={[{ required: true, message: "Пожалуйста введите цвет!" }]}
            >
              <ColorPicker defaultValue={"yellow"} disabled = {disabl} />
            </Form.Item>
            
            <Form.Item
        name="avatar"
        label= { 
          <span style={{ color: "white" }}>
          Выберите аватар
        </span>
        }
        
        rules={[{ required: true, message: 'Please select an avatar!' }]}
      >
        <Select
          placeholder="Select an avatar"
          value={selectedAvatar}
          onChange={handleAvatarChange}
          
        >
          <Option value="/public/avatar1.jpg"><div onMouseOver={()=>{handleAvatarChange("/public/avatar1.jpg")}}>Avatar1</div></Option>
          <Option value="/public/avatar2.jpg"><div onMouseOver={()=>{handleAvatarChange("/public/avatar2.jpg")}}>Avatar2</div></Option>
          <Option value="/public/avatar3.jpg"><div onMouseOver={()=>{handleAvatarChange("/public/avatar3.jpg")}}>Avatar3</div></Option>
          <Option value="/public/avatar4.jpg"><div onMouseOver={()=>{handleAvatarChange("/public/avatar4.jpg")}}>Avatar4</div></Option>
          <Option value="/public/avatar5.jpg"><div onMouseOver={()=>{handleAvatarChange("/public/avatar5.jpg")}}>Avatar5</div></Option>
          <Option value="/public/avatar6.jpg"><div onMouseOver={()=>{handleAvatarChange("/public/avatar6.jpg")}}>Avatar6</div></Option>
          <Option value="/public/avatar7.jpg"><div onMouseOver={()=>{handleAvatarChange("/public/avatar7.jpg")}}>Avatar7</div></Option>
          <Option value="/public/avatar8.jpg"><div onMouseOver={()=>{handleAvatarChange("/public/avatar8.jpg")}}>Avatar8</div></Option>
          <Option value="/public/avatar9.jpg"><div onMouseOver={()=>{handleAvatarChange("/public/avatar9.jpg")}}>Avatar9</div></Option>
          <Option value="/public/avatar10.jpg"><div onMouseOver={()=>{handleAvatarChange("/public/avatar10.jpg")}}>Avatar10</div></Option>
          <Option value="/public/avatar11.jpg"><div onMouseOver={()=>{handleAvatarChange("/public/avatar11.jpg")}}>Avatar11</div></Option>

        </Select>

      </Form.Item>
        <Form.Item label=" ">
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(135deg, ${colors1.join(
                    ", "
                  )})`,
                  colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                    colors1
                  ).join(", ")})`,
                  colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                    colors2
                  ).join(", ")})`,
                  
                  lineWidth: 0,
                },
              },
            }}
          >
            <Button type="primary" size="large" htmlType="submit" disabled = {disabl} >
              Дальше
            </Button>
            <Button type="primary" size="large" onClick={abort} disabled = {!disabl} style={{marginLeft: "5%"}} >
              Отмена
            </Button>
          </ConfigProvider>
          </Form.Item>
          </Form>
        </div>
      </div>
      <div className={classes.userOutcome}>
        <div className={classes.objToSee}>
          <div className={classes.teamName}> {teamNickname}</div>
            <div className={classes.avatar} id="avatar"><img src={selectedAvatar?.toString()} alt ="" className={classes.innerImage}/></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
