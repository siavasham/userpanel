import React, { useState, useEffect } from "react";
import { t } from "locales";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { post } from "library/request";

export default function () {
  const [coins, setCoins] = useState([]);
  const [active, setActive] = useState("BTC");

  useEffect(() => {
    post("coins", { cache: true }).then((res) => {
      if (res?.success) {
        setCoins(res.success.coins);
      }
    });
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card my-card">
            <div className="f live-chart" style={{ minHeight: "85vh" }}>
              <TradingViewWidget
                symbol={active + "USDT"}
                locale="fa_IR"
                autosize
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
