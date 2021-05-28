import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import Spinner from "component/spinner";
import Button from "component/button";
import Alert from "react-bootstrap/Alert";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toMoney, isFloat } from "library/helper";
import Input from "component/input";
import isEmpty from "lodash/isEmpty";
import Coins from "component/coins";
import exactMath from "exact-math";

export default function (props) {
  const {
    setting: { token },
  } = useStorage();
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [coins, setCoins] = useState([]);
  const [wallet, setWallet] = useState({});
  const [currency, setCurrency] = useState({});
  const [error, setError] = useState(false);
  const [wizard, setWizard] = useState("source");
  const [sourceCoin, setSourceCoin] = useState({});
  const [destCoin, setDestCoin] = useState({});
  const [final, setFinal] = useState("");
  const [data, setData] = useState({
    amount: "",
  });
  useEffect(() => {
    setLoading(true);
    post("wallet", { token }).then((res) => {
      if (res?.success) {
        let temp = {};
        for (let i of res.success.wallet) {
          if (i.balance > 0) temp[i.coin] = i;
        }
        setWallet(temp);
        setCoins(res.success.coins);
        setCurrency(res.success.currency);
      }
      setLoading(false);
    });
  }, []);

  const sourceCoinSelected = (coin) => {
    setWizard("dest");
    setData({ amount: "" });
    setSourceCoin(coin);
  };
  const destCoinSelected = (coin) => {
    setWizard("final");
    setData({ amount: "" });
    setDestCoin(coin);
  };
  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const validate = () => {
    const temp = {};
    if (isNaN(data?.amount) || data?.amount == 0) {
      temp["amount"] = "validation.invalid-amount";
    }
    for (let i in data) {
      if (data[i] == "") temp[i] = "validation.empty";
    }
    const res = isEmpty(temp) ? null : temp;
    setError(res);
    return res;
  };
  useEffect(() => {
    if (data.amount > 0) {
      let rial = 1 / currency.price;
      let sprice = sourceCoin.name == "IR" ? rial : sourceCoin.price;
      let dprice = destCoin.name == "IR" ? rial : destCoin.price;
      let usdt = data.amount * sprice;
      let xfinal = exactMath.div(usdt, dprice);
      xfinal = isFloat(xfinal) ? exactMath.floor(xfinal, -4) : xfinal;
      setFinal(xfinal);
    } else {
      setFinal("");
    }
  }, [data.amount]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate() == null) {
      setWizard("final");
    }
  };
  let balace = wallet?.[sourceCoin?.name]?.balance;
  return (
    <div className="p-2">
      {loading && <Spinner forDiv />}
      <Tabs
        className="wizard-tabs"
        activeKey={wizard}
        onSelect={(e) => setWizard(e)}
      >
        <Tab eventKey={"source"} title={t("sourceCoin")}>
          <div className="p-4 mt-2">
            <Coins
              coins={coins}
              accept={Object.keys(wallet)}
              currency={currency}
              onSelect={sourceCoinSelected}
            />
          </div>
        </Tab>

        <Tab
          eventKey={"dest"}
          title={t("destCoin")}
          disabled={"source" == wizard}
        >
          <div className="p-4 mt-2">
            <Coins
              coins={coins}
              reject={[sourceCoin?.name]}
              currency={currency}
              onSelect={destCoinSelected}
            />
          </div>
        </Tab>
        <Tab
          eventKey={"final"}
          title={t("finalBuy")}
          disabled={["source", "dest"].includes(wizard)}
        >
          {wizard == "final" && (
            <form autoComplete="off" onSubmit={onSubmit} className=" p-4 mt-2">
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <p className="mx-1 text">{t("sourceCoin")}</p>
                  <Coins coins={[sourceCoin]} currency={currency} />
                </div>
                <div className="col-sm-12 col-md-6">
                  <p className="mx-1 text">{t("destCoin")}</p>
                  <Coins coins={[destCoin]} currency={currency} />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-12 col-md-6 mb-4">
                  <Input
                    name={"buyAmount"}
                    value={data?.amount}
                    onChange={(v) => onChange("amount", v)}
                    error={error?.amount}
                    info={
                      <div
                        className="d-flex justify-content-between cursor-pointer"
                        onClick={() => onChange("amount", balace)}
                      >
                        <span>{t("balance")}</span>
                        <span>{toMoney(balace)}</span>
                      </div>
                    }
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-4 f ac">
                  <h6>{t("dexAmount")}</h6>
                  <span className="mx-3 fs-4 text-success">
                    {toMoney(final)}
                  </span>
                  <h6>{t(destCoin.name)}</h6>
                </div>
              </div>
              <div className="mt-4 fc">
                <Button className="btn btn-danger btn-red w-50">
                  {t("confirmTrade")}
                </Button>
              </div>
            </form>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
