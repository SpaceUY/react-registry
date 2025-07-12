import { RouteObject } from "react-router-dom";
import { Routes } from "../../common/types/routes";
import HomeView from "./views/home";

const homeRoutes: RouteObject[] = [
  {
    path: Routes.Home,
    element: (
      <div>
        {/* <AuthLayout> */}
        <HomeView />
      </div>
    ),
  },
];

export default homeRoutes;
