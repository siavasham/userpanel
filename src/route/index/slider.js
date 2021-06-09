import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import Carousel from "react-elastic-carousel";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 850, itemsToShow: 3 },
  { width: 1150, itemsToShow: 4 },
  { width: 1450, itemsToShow: 5 },
  { width: 1750, itemsToShow: 6 },
];
export default function ({
  items = [
    "https://file.coinex.com/2021-06-04/59BB73DACA9025E3BFD973A55D95B143.png",
    "https://file.coinex.com/2021-06-04/EA29F929EA596034B1AA8C0A31F34FB7.png",
    "https://file.coinex.com/2021-06-07/D0DEE5AB06E1B1D989536EFEC778CF52.png",
  ],
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
      isRTL={true}
      breakPoints={breakPoints}
      pagination={true}
      showArrows={false}
    >
      {items.map((e, i) => (
        <div key={i} className="rec-item-slide card card-bg mx-1 ">
          <img src={e} />
        </div>
      ))}
    </Carousel>
  );
}
