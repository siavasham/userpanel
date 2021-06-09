import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import Carousel from "react-elastic-carousel";
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

const breakPoints = [
  { width: 1, itemsToShow: 2 },
  { width: 550, itemsToShow: 4 },
  { width: 850, itemsToShow: 5 },
  { width: 1150, itemsToShow: 6 },
  { width: 1450, itemsToShow: 7 },
  { width: 1750, itemsToShow: 8 },
];
export default function ({
  items = [null, null, null, null, null, null, null],
}) {
  useEffect(() => {
    // post("referrals", { token }, { cache: true }).then((res) => {
    //   if (res?.success) {
    //     setReferrals(res.success);
    //   }
    // });
  }, []);
  return (
    <Carousel
      enableAutoPlay
      breakPoints={breakPoints}
      pagination={false}
      showArrows={false}
    >
      {items.map((e, i) => (
        <div key={i} className="rec-item-coins">
          <div className="f ac p-3 h-100">
            <div className="f fdc ">
              <h4 className="text-secondary text-end">BTC</h4>
              <div className="text-end">360</div>
              <div className="text-success text-end">+3%</div>
            </div>
            <div className="f">
              <Sparklines data={randomData(30)} height={100}>
                <SparklinesLine style={{ strokeWidth: 3, stroke: "#ed5250" }} />
                <SparklinesSpots
                  size={4}
                  style={{ stroke: "#ed5250", strokeWidth: 3, fill: "white" }}
                />
              </Sparklines>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
