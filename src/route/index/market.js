import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {
  Sparklines,
  SparklinesBars,
  SparklinesLine,
  SparklinesCurve,
  SparklinesNormalBand,
  SparklinesReferenceLine,
  SparklinesSpots,
} from "react-sparklines";

function boxMullerRandom() {
  let phase = false,
    x1,
    x2,
    w,
    z;

  return (function () {
    if ((phase = !phase)) {
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1.0);

      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      return x1 * w;
    } else {
      return x2 * w;
    }
  })();
}

function randomData(n = 30) {
  return Array.apply(0, Array(n)).map(boxMullerRandom);
}

export default function () {
  const [wizard, setWizard] = useState("topGainers");

  useEffect(() => {
    // post("referrals", { token }, { cache: true }).then((res) => {
    //   if (res?.success) {
    //     setReferrals(res.success);
    //   }
    // });
  }, []);
  return (
    <div className="market ">
      <Tabs
        className="index-tabs"
        activeKey={wizard}
        onSelect={(e) => setWizard(e)}
      >
        <Tab eventKey={"topGainers"} title={t("topGainers")}>
          <div className="card card-bg">
            <div className="table-responsive">
              <table className="table table-hover table-borderless">
                <thead>
                  <tr>
                    <th></th>
                    <th>{t("coin")}</th>
                    <th>{t("price")}</th>
                    <th>{t("priceIrr")}</th>
                    <th>{t("dayChange")}</th>
                    <th style={{ width: 80 }}>{t("chart")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <i className={"icon icon-btc"} />
                    </td>
                    <td>BTC</td>
                    <td>36,700</td>
                    <td className="text-success">800,000,000</td>
                    <td>+3%</td>
                    <td style={{ width: 80 }}>
                      <Sparklines data={randomData(30)}>
                        <SparklinesLine
                          style={{ strokeWidth: 3, stroke: "#ed5250" }}
                        />
                        <SparklinesSpots
                          size={4}
                          style={{
                            stroke: "#ed5250",
                            strokeWidth: 3,
                            fill: "white",
                          }}
                        />
                      </Sparklines>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i className={"icon icon-eth"} />
                    </td>
                    <td>ETH</td>
                    <td>2,700</td>
                    <td className="text-danger">80,000,000</td>
                    <td>-3%</td>
                    <td style={{ width: 80 }}>
                      <Sparklines data={randomData(30)}>
                        <SparklinesLine
                          style={{ strokeWidth: 3, stroke: "#ed5250" }}
                        />
                        <SparklinesSpots
                          size={4}
                          style={{
                            stroke: "#ed5250",
                            strokeWidth: 3,
                            fill: "white",
                          }}
                        />
                      </Sparklines>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i className={"icon icon-doge"} />
                    </td>
                    <td>Doge</td>
                    <td>0.35</td>
                    <td className="text-danger">8,000</td>
                    <td>-5%</td>
                    <td style={{ width: 80 }}>
                      <Sparklines data={randomData(30)}>
                        <SparklinesLine
                          style={{ strokeWidth: 3, stroke: "#ed5250" }}
                        />
                        <SparklinesSpots
                          size={4}
                          style={{
                            stroke: "#ed5250",
                            strokeWidth: 3,
                            fill: "white",
                          }}
                        />
                      </Sparklines>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Tab>

        <Tab eventKey={"topLosers"} title={t("topLosers")}>
          <div className="card card-bg"></div>
        </Tab>
        <Tab eventKey={"topValues"} title={t("topValues")}>
          <div className="card card-bg"></div>
        </Tab>
      </Tabs>
    </div>
  );
}
