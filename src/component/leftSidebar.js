import React, { useState, useEffect } from "react";
import { t } from "locales";
import { useLocation, useHistory } from "react-router-dom";
import useStorage from "reducer";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import PersonIcon from "@material-ui/icons/Person";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import CategoryIcon from "@material-ui/icons/Category";
import BarChartIcon from "@material-ui/icons/BarChart";
import HistoryIcon from "@material-ui/icons/History";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const menu = [
  {
    title: t("myProfile"),
    path: "/menu",
    icon: <PersonIcon />,
    sub: [
      {
        title: t("myPrivateInfo"),
        path: "/menu",
      },
      {
        title: t("levelUp"),
        path: "/menu",
      },
      {
        title: t("myCreditNumbers"),
        path: "/menu",
      },
    ],
  },
  {
    title: t("myWallet"),
    path: "/menu",
    icon: <AccountBalanceWalletIcon />,
    sub: [
      {
        title: t("walletReport"),
        path: "/menu",
      },
      {
        title: t("deposit"),
        path: "/menu",
      },
      {
        title: t("withdraw"),
        path: "/menu",
      },
    ],
  },
  {
    title: t("tradeCrypto"),
    path: "/menu",
    icon: <CategoryIcon />,
    sub: [
      {
        title: t("buyFromUs"),
        path: "/menu",
      },
      {
        title: t("sellToUs"),
        path: "/menu",
      },
      {
        title: t("livePrice"),
        path: "/menu",
      },
    ],
  },
  {
    title: t("traderAi"),
    path: "/menu",
    icon: <BarChartIcon />,
    sub: [
      {
        title: t("myTraderAccount"),
        path: "/menu",
      },
      {
        title: t("traderReport"),
        path: "/menu",
      },
    ],
  },
  {
    title: t("transactionHistory"),
    path: "/menu",
    icon: <HistoryIcon />,
  },
  {
    title: t("myInbox"),
    path: "/inbox",
    icon: <ChatBubbleOutlineIcon />,
  },
];

export default function () {
  const history = useHistory();
  const {
    setting: { name },
  } = useStorage();
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    // setLoading(true);
  }, []);
  const goTo = (path) => {
    history.push(path);
  };
  return (
    <div className="left-sidebar">
      <ProSidebar rtl={true} collapsed={collapsed}>
        <div className="toggle left" onClick={() => setCollapsed(!collapsed)}>
          <ArrowForwardIosIcon className="toggle-icon" />
        </div>
        <SidebarHeader>
          <div className="profile">
            <div className="icon">
              <PersonOutlineIcon className="profile-icon" />
            </div>
            <div className="profile-text">{name}</div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            {menu.map((item, i) =>
              item?.sub ? (
                <SubMenu title={item.title} key={i} icon={item.icon}>
                  {item?.sub &&
                    item?.sub.map((sub, j) => (
                      <MenuItem key={j} onClick={() => goTo(sub.path)}>
                        {sub.title}
                      </MenuItem>
                    ))}
                </SubMenu>
              ) : (
                <MenuItem
                  key={i}
                  icon={item.icon}
                  onClick={() => goTo(item.path)}
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
