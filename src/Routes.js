import React, { Suspense, lazy } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import useStorage from "reducer";
import Spinner from "component/spinner";

// const Dashboard = lazy(() => import("route/dashboard/dashboard"));

const route = {
  home: [
    // { path: "/dashboard", component: Dashboard },
  ],
  sign: [
    // { path: "/register", component: Register },
  ],
};
const AppRoutes = (props) => {
  const history = useHistory();
  const location = useLocation();
  const {
    setting: { isLoged },
  } = useStorage();

  const list = route[isLoged ? "home" : "sign"];
  const isRoute = list.find((e) => e.item == location.pathname);

  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {list.map((route, i) => (
          <Route key={i} exact path={route.path} component={route.component} />
        ))}
        {!isRoute && <Redirect to={isLoged ? "/dashboard" : "/login"} />}
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
