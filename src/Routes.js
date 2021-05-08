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

const Login = lazy(() => import("route/login/login"));
const Verify = lazy(() => import("route/login/verify"));
const Info = lazy(() => import("route/user/info"));
const Credit = lazy(() => import("route/user/credit"));
const Inbox = lazy(() => import("route/inbox/inbox"));

const route = {
  home: [
    { path: "/inbox", component: Inbox },
    { path: "/info", component: Info },
    { path: "/credit", component: Credit },
  ],
  sign: [
    { path: "/login", component: Login },
    { path: "/verify", component: Verify },
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
