import React, { useState, useEffect } from "react";
import { t } from "locales";
import useStorage from "reducer";
import { useLocation, useHistory } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import VerifiedUserOutlinedIcon from "@material-ui/icons/VerifiedUserOutlined";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const menu = [
  {
    title: t("aboutConcordex"),
    path: "/menu",
    icon: <VerifiedUserOutlinedIcon />,
    sub: [
      {
        title: t("aboutUs"),
        path: "/menu",
      },
      {
        title: t("service"),
        path: "/menu",
      },
      {
        title: t("contactUs"),
        path: "/menu",
      },
      {
        title: t("ruls"),
        path: "/menu",
      },
      {
        title: t("privacy"),
        path: "/menu",
      },
    ],
  },
  {
    title: t("tradeCrypto"),
    path: "/menu",
    icon: <VerifiedUserOutlinedIcon />,
    sub: [
      {
        title: t("livePrices"),
        path: "/menu",
      },
      {
        title: t("priceCandle"),
        path: "/menu",
      },
      {
        title: t("cryptoCalc"),
        path: "/menu",
      },
    ],
  },
  {
    title: t("traderAi"),
    path: "/menu",
    icon: <VerifiedUserOutlinedIcon />,
    sub: [
      {
        title: t("aboutTrader"),
        path: "/menu",
      },
      {
        title: t("wallet"),
        path: "/menu",
      },
      {
        title: t("profitReport"),
        path: "/menu",
      },
    ],
  },
  {
    title: t("academy"),
    path: "/menu",
    icon: <VerifiedUserOutlinedIcon />,
    sub: [
      {
        title: t("howToWork"),
        path: "/menu",
      },
      {
        title: t("mobileInfo"),
        path: "/menu",
      },
      {
        title: t("triningCourse"),
        path: "/menu",
      },
    ],
  },
  {
    title: t("services"),
    path: "/menu",
    icon: <VerifiedUserOutlinedIcon />,
  },
  {
    title: t("support"),
    path: "/menu",
    icon: <VerifiedUserOutlinedIcon />,
    sub: [
      {
        title: t("faq"),
        path: "/menu",
      },
      {
        title: t("liveSupport"),
        path: "/menu",
      },
      {
        title: t("ticket"),
        path: "/menu",
      },
    ],
  },
];

export default function () {
  const history = useHistory();
  const location = useLocation();

  const { setting } = useStorage();
  const [collapsed, setCollapsed] = useState(true);
  useEffect(() => {
    // setLoading(true);
  }, []);
  const goTo = (path) => {
    history.push(path);
  };
  return (
    <div className="right-sidebar">
      <ProSidebar rtl={true} collapsed={collapsed}>
        <div className="toggle" onClick={() => setCollapsed(!collapsed)}>
          <ArrowBackIosIcon className="toggle-icon" />
        </div>
        <SidebarHeader>
          <div className="brand">
            <div className="brand-logo"></div>
            <div className="brand-text">
              {t("brand")}
              <div className="brand-sub-text">{t("safe")}</div>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            {menu.map((item, i) =>
              item?.sub ? (
                <SubMenu
                  title={item.title}
                  key={i}
                  icon={item.icon}
                  open={item?.sub?.find((e) => e.path == location.pathname)}
                >
                  {item?.sub &&
                    item?.sub.map((sub, j) => (
                      <MenuItem
                        key={j}
                        onClick={() => goTo(sub.path)}
                        active={location.pathname == sub.path}
                      >
                        {sub.title}
                      </MenuItem>
                    ))}
                </SubMenu>
              ) : (
                <MenuItem
                  key={i}
                  icon={item.icon}
                  onClick={() => goTo(item.path)}
                  active={location.pathname == item.path}
                >
                  {item.title}
                </MenuItem>
              )
            )}
          </Menu>
        </SidebarContent>
        <SidebarFooter>eeee</SidebarFooter>
      </ProSidebar>
    </div>
  );
}
