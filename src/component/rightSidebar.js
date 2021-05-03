import React, { useState, useEffect } from "react";
import { t } from "locales";
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
import VerifiedUserOutlinedIcon from "@material-ui/icons/VerifiedUserOutlined";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const menu = [
  {
    title: t("aboutUs"),
    path: "/menu",
    icon: <VerifiedUserOutlinedIcon />,
  },
  {
    title: t("tradeCrypto"),
    path: "/menu",
    icon: <VerifiedUserOutlinedIcon />,
  },
  {
    title: t("traderAi"),
    path: "/menu",
    icon: <VerifiedUserOutlinedIcon />,
  },
  {
    title: t("academy"),
    path: "/menu",
    icon: <VerifiedUserOutlinedIcon />,
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
  },
];

export default function () {
  const {
    setting: { name },
  } = useStorage();
  const [collapsed, setCollapsed] = useState(true);
  useEffect(() => {
    // setLoading(true);
  }, []);

  return (
    <ProSidebar rtl={true} collapsed={collapsed}>
      <div className="toggle" onClick={() => setCollapsed(!collapsed)}>
        <ArrowForwardIosIcon className="toggle-icon" />
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
          {menu.map((item, i) => (
            <SubMenu title={item.title} key={i} icon={item.icon}>
              {item?.sub &&
                item?.sub.map((sub, j) => (
                  <MenuItem key={j}>{sub.title}</MenuItem>
                ))}
            </SubMenu>
          ))}
        </Menu>
      </SidebarContent>
      <SidebarFooter>eeee</SidebarFooter>
    </ProSidebar>
  );
}
