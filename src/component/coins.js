import React from "react";
import { toMoney } from "library/helper";
import { t } from "locales";
import { fiat } from "library/const";

export default function ({
  coins,
  accept = null,
  reject = null,
  currency,
  onSelect,
}) {
  let list = coins;
  if (accept != null) {
    list = list.filter((e) => accept.includes(e.name));
  }
  if (reject != null) {
    list = list.filter((e) => !reject.includes(e.name));
  }
  return (
    <div className="row">
      {list?.map((item, i) => (
        <div
          className={"col-12 mb-3" + (onSelect ? " pointer" : "")}
          key={i}
          onClick={() => (onSelect ? onSelect(item) : null)}
        >
          <div className="card my-card p-3">
            <div className="f jb">
              <div className="f ac">
                <div className="me-3">
                  <i
                    className={"icon icon-2x icon-" + item.name.toLowerCase()}
                  />
                </div>
                <figure className="fdc">
                  <blockquote className="blockquote">
                    <p>{item.fullname}</p>
                  </blockquote>
                  <figcaption className="blockquote-footer">
                    {item.dname}
                  </figcaption>
                </figure>
              </div>
              <div className=" f ac je">
                {!fiat.includes(item.name) && (
                  <figure className="fdc">
                    <span className="text-success mb-2">
                      <b>{t("buy")}: </b>
                      {toMoney(currency.buy * item.price)}
                    </span>
                    <span className="text-danger">
                      <b>{t("sell")}: </b>
                      {toMoney(currency.sell * item.price)}
                    </span>
                  </figure>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
