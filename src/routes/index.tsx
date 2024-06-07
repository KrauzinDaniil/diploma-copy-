import type { RouteObject } from "react-router-dom";
import {  useRoutes } from "react-router-dom";
import LayoutRoute from "./Layout/LayoutRoute";
import LoginRoute from "./LoginRoute/LoginRoute";
import GameRoute from "./gameRoute/GameRoute";
import classes from "./index.module.css"
const Routing: React.FC = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <LayoutRoute />,
      children: [
        { index: true, element: <LoginRoute /> },
        {
          path: "/game",
          element: <GameRoute />,
        },
      ],
    },
  ];

  const element = useRoutes(routes);

  return <div className={classes.wrapper}>{element}</div>;
};

export default Routing;