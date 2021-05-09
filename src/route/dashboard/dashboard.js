import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function () {
  const [referrals, setReferrals] = useState([]);
  const {
    setting: { name, token },
  } = useStorage();

  useEffect(() => {
    // post("referrals", { token }, { cache: true }).then((res) => {
    //   if (res?.success) {
    //     setReferrals(res.success);
    //   }
    // });
  }, []);
  return <div></div>;
}
