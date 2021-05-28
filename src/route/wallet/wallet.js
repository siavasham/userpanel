import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import Spinner from "component/spinner";
import Button from "component/button";
import { toMoney } from "library/helper";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import exactMath from "exact-math";
import { fiat } from "library/const";

export default function () {
  const [coins, setCoins] = useState([]);
  const [wallet, setWallet] = useState({});
  const [deposit, setDeposit] = useState("");
  const [widthdraw, setWithdraw] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshDeposit, setRefreshDeposit] = useState(false);
  const [refreshWithdraw, setRefreshWithdraw] = useState(false);
  const [currency, setCurrency] = useState({});

  const {
    setting: { name, token },
  } = useStorage();

  const xsetDeposit = (coin) => {
    setDeposit(coin);
    setRefreshDeposit(!refreshDeposit);
  };
  const xsetWidthdraw = (coin) => {
    setWithdraw(coin);
    setRefreshWithdraw(!refreshWithdraw);
  };
  useEffect(() => {
    setLoading(true);
    post("wallet", { token }).then((res) => {
      if (res?.success) {
        let temp = {};
        for (let i of res.success.wallet) {
          temp[i.coin] = i;
        }
        setWallet(temp);
        setCoins(res.success.coins);
        setCurrency(res.success.currency);
      }
      setLoading(false);
    });
  }, []);
  return (
    <div>
      {loading && <Spinner forDiv />}
      <div className="row mt-4">
        {coins.map((item, i) => (
          <Coin
            key={i}
            item={item}
            balance={wallet?.[item.name]?.balance ?? 0}
            currency={currency?.price ?? 0}
            onDeposit={() => xsetDeposit(item.name)}
            onWithdraw={() => xsetWidthdraw(item)}
          />
        ))}
      </div>
      <Deposit coin={deposit} refresh={refreshDeposit} />
      <Withdraw
        coin={widthdraw}
        refresh={refreshWithdraw}
        balance={wallet?.[widthdraw.name]?.balance ?? 0}
      />
    </div>
  );
}

const Coin = ({ item, balance, currency, onDeposit, onWithdraw }) => {
  return (
    <div className="col-12 mb-3">
      <div className="card my-card p-3">
        <div className="row">
          <div className="col-4 f ac">
            <div className="me-3">
              <i className={"icon icon-2x icon-" + item.name.toLowerCase()} />
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
          <div className="col-3 f ac">
            {balance > 0 && (
              <figure className="fdc">
                <blockquote className="blockquote">
                  <div className="fs-6">
                    {t("balance")}:
                    <span className="text ms-2">{toMoney(balance ?? 0)}</span>
                  </div>
                </blockquote>
                {!fiat.includes(item.name) && (
                  <bdi className="blockquote-footer text-end">
                    {" " + t("irr") + " "}
                    {toMoney(exactMath.mul(balance, item.price, currency))}
                  </bdi>
                )}
              </figure>
            )}
          </div>
          <div className="col f ac je">
            <Button onClick={onDeposit} className="btn btn-outline-success m-1">
              {t("deposit")}
            </Button>
            {balance > 0 && (
              <>
                <Button
                  className="btn btn-outline-danger m-1"
                  onClick={onWithdraw}
                >
                  {t("withdraw")}
                </Button>
                <Button className="btn btn-primary  m-1">
                  {t("toTrader")}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
