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
const Dashboard = lazy(() => import("route/dashboard/dashboard"));
const Info = lazy(() => import("route/user/info"));
const Level = lazy(() => import("route/user/level"));
const Credit = lazy(() => import("route/user/credit"));
const Wallet = lazy(() => import("route/wallet/wallet"));
const Live = lazy(() => import("route/trade/live"));
const Buy = lazy(() => import("route/trade/dex"));
const Inbox = lazy(() => import("route/inbox/inbox"));

const route = {
  home: [
    { path: "/dashboard", component: Dashboard },
    { path: "/inbox", component: Inbox },
    { path: "/info", component: Info },
    { path: "/level", component: Level },
    { path: "/credit", component: Credit },
    { path: "/wallet", component: Wallet },
    { path: "/live", component: Live },
    { path: "/dex", component: Buy },
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
