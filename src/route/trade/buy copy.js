import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import Spinner from "component/spinner";
import Button from "component/button";
import Alert from "react-bootstrap/Alert";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toMoney } from "library/helper";
import Input from "component/input";
import isEmpty from "lodash/isEmpty";
import Coins from "component/coins";
import exactMath from "exact-math";
import payment from "component/payment";

export default function (props) {
  const {
    setting: { token },
  } = useStorage();
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [error, setError] = useState(false);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState({});
  const [wizard, setWizard] = useState("select");
  const [coin, setCoin] = useState(null);
  const [data, setData] = useState({
    amount: "0",
    bank: "",
  });
  useEffect(() => {
    setLoading(true);
    post("wallet", { token }).then((res) => {
      if (res?.success) {
        setCoins(res.success.coins);
        setCurrency(res.success.currency);
      }
      setLoading(false);
    });
  }, []);

  const coinSelect = (coin) => {
    setWizard("pay");
    setCoin(coin);
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate() == null) {
      setWizard("final");
    }
  };
  return (
    <div className="p-2">
      {loading && <Spinner forDiv />}
      <Tabs
        className="wizard-tabs"
        activeKey={wizard}
        onSelect={(e) => setWizard(e)}
      >
        <Tab eventKey={"select"} title={t("selectCoin")}>
          <div className="p-4 mt-2">
            <Coins coins={coins} currency={currency} onSelect={coinSelect} />
          </div>
        </Tab>
        <Tab
          eventKey={"pay"}
          title={t("payMethod")}
          disabled={["select"].includes(wizard)}
        >
          {wizard == "pay" && (
            <form autoComplete="off" onSubmit={onSubmit} className=" p-4 mt-2">
              <div className="row">
                <div className="col-sm-12 col-md-6 mb-4">
                  <Coins coins={coin ? [coin] : null} currency={currency} />
                  <div className="my-3">
                    <Input
                      name={"buyAmount"}
                      value={data?.amount}
                      onChange={(v) => onChange("amount", v)}
                      error={error?.amount}
                      // info={
                      //   <div
                      //     className="d-flex justify-content-between cursor-pointer"
                      //     onClick={() => onChange("amount", coin?.balance)}
                      //   >
                      //     <span>{t("withdrawable")}</span>
                      //     <span>{coin?.balance}</span>
                      //   </div>
                      // }
                    />
                  </div>
                  <div className="mt-2 f ac">
                    {t("payAmount")}
                    <span className="mx-3 fs-4 text-success">
                      {toMoney(
                        exactMath.mul(
                          parseFloat(data?.amount) || 0,
                          coin?.price,
                          currency?.sell
                        )
                      )}
                    </span>
                    {t("irr")}
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 mb-5">
                  <p className="mx-3">{t("selectPayment")}</p>
                  <div className="f js">
                    {payment.map((item, i) => (
                      <div
                        className={
                          "bank-item " +
                          (data?.bank == item.name ? "active" : "")
                        }
                        key={i}
                        onClick={() => onChange("bank", item.name)}
                      >
                        <img src={item.logo} />
                      </div>
                    ))}
                  </div>
                  <Alert variant="danger" show={!!error?.bank}>
                    {t("paymentNotSelected")}
                  </Alert>
                </div>
              </div>
              <div className="mt-4 fc">
                <Button className="btn btn-danger btn-red w-50">
                  {t("confirmAndContine")}
                </Button>
              </div>
            </form>
          )}
        </Tab>
        <Tab
          eventKey={"final"}
          title={t("finalBuy")}
          disabled={["select", "pay"].includes(wizard)}
        >
          <div className="p-4 mt-2"></div>
        </Tab>
      </Tabs>
    </div>
  );
}
