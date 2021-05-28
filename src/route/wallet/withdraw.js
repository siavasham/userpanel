import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import Button from "component/button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Input from "component/input";
import isEmpty from "lodash/isEmpty";
import { fiat } from "library/const";
import Spinner from "component/spinner";
import { toMoney } from "library/helper";
import { Link } from "react-router-dom";

export default function (props) {
  const [coin, setCoin] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (props.coin != "") {
      setCoin(props.coin);
      setBalance(props.balance);
    }
  }, [props.refresh]);
  return (
    <Modal
      show={!!coin}
      centered
      onHide={() => setCoin(null)}
      keyboard={true}
      contentClassName="my-modal"
    >
      <>
        <div className="p-4">
          {fiat.includes(coin?.name) ? (
            <FiatContent coin={coin?.name} balance={balance} />
          ) : (
            <CryptoContent coin={coin?.name} balance={balance} />
          )}
        </div>
      </>
    </Modal>
  );
}

const FiatContent = ({ coin, balance }) => {
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [resError, setResError] = useState(null);
  const [payment, setPayment] = useState([]);

  const {
    setting: { token },
  } = useStorage();
  useEffect(() => {
    setLoading(true);
    post("credit-list", { token }).then((data) => {
      setLoading(false);
      if (data.success) {
        setPayment(data.success);
      }
    });
  }, []);
  const [data, setData] = useState({
    credit: "",
    amount: "",
  });
  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const validate = () => {
    const temp = {};
    if (data.amount.length < 1 || data.amount == 0) {
      temp["amount"] = "validation.min";
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
      setSubmiting(true);
      post("withdraw", {
        token,
        coin,
        amount: data.amount,
        address: data.credit.iban,
        tag: data.credit.number,
      }).then((data) => {
        setSubmiting(false);
        if (data.success) {
          setSuccess(true);
        } else if (data.error) {
          if (typeof data.error == "string") setResError(data.error);
          else {
            const temp = {};
            for (let i in data.error) {
              temp[i] = [i, data.error[i][0]];
            }
            setError(temp);
          }
        }
      });
    }
  };

  return loading ? (
    <Spinner forDiv noBg />
  ) : (
    <form autoComplete="off" onSubmit={onSubmit}>
      <div className="col-12 mb-3">
        <p className="text">{t("credit")}</p>
        <div className="f js">
          {payment.length == 0 ? (
            <Link to="/credit" className="phone-number">
              {t("addCredit")}
            </Link>
          ) : (
            payment.map((item, i) => (
              <div
                className={
                  "bank-item  " +
                  (data?.credit.code == item.code ? "active" : "")
                }
                key={i}
                onClick={() => onChange("credit", item)}
              >
                <i className={"ibl128 ibl-" + item.code}></i>
              </div>
            ))
          )}
        </div>
        {data?.credit != "" && (
          <div className="text-success p-2 f jb">
            <div>{data?.credit.number}</div>
            <div>{data?.credit.iban}</div>
          </div>
        )}
        <Alert variant="danger" show={!!error?.credit}>
          {t("creditNotSelected")}
        </Alert>
      </div>
      <Input
        name={"amount"}
        value={data?.amount}
        onChange={(v) => onChange("amount", v)}
        error={error?.amount}
        info={
          <div
            className="d-flex justify-content-between cursor-pointer"
            onClick={() => onChange("amount", balance)}
          >
            <span>{t("withdrawable")}</span>
            <span>{toMoney(balance)}</span>
          </div>
        }
      />
      <Alert variant="success" show={success}>
        {t("withdrawSuccess")}
      </Alert>
      <Alert variant="danger" show={!!resError}>
        {t(resError)}
      </Alert>
      {!success && (
        <div className="mt-4">
          <Button loading={submiting} className="btn btn-danger btn-red">
            {t("withdrawRequest")}
          </Button>
        </div>
      )}
    </form>
  );
};
const CryptoContent = ({ coin, balance }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [resError, setResError] = useState(null);
  const {
    setting: { token },
  } = useStorage();

  const [data, setData] = useState({
    address: "",
    amount: "",
    tag: "",
  });
  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const validate = () => {
    const temp = {};
    if (data.address.length < 5) {
      temp["address"] = "validation.min";
    }
    if (data.amount.length < 1 || data.amount == 0) {
      temp["amount"] = "validation.min";
    }
    for (let i in ["address", "amount"]) {
      if (data[i] == "") temp[i] = "validation.empty";
    }
    const res = isEmpty(temp) ? null : temp;
    setError(res);
    return res;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate() == null) {
      setLoading(true);
      post("withdraw", { ...data, token, coin }).then((data) => {
        setLoading(false);
        if (data.success) {
          setSuccess(true);
        } else if (data.error) {
          if (typeof data.error == "string") setResError(data.error);
          else {
            const temp = {};
            for (let i in data.error) {
              temp[i] = [i, data.error[i][0]];
            }
            setError(temp);
          }
        }
      });
    }
  };
  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <Input
        name={"address"}
        value={data?.address}
        onChange={(v) => onChange("address", v)}
        error={error?.address}
      />
      <Input
        name={"optionTag"}
        value={data?.tag}
        onChange={(v) => onChange("tag", v)}
      />
      <Input
        name={"amount"}
        value={data?.amount}
        onChange={(v) => onChange("amount", v)}
        error={error?.amount}
        info={
          <div
            className="d-flex justify-content-between cursor-pointer"
            onClick={() => onChange("amount", balance)}
          >
            <span>{t("withdrawable")}</span>
            <span>{toMoney(balance)}</span>
          </div>
        }
      />
      <Alert variant="success" show={success}>
        {t("withdrawSuccess")}
      </Alert>
      <Alert variant="danger" show={!!resError}>
        {t(resError)}
      </Alert>
      {!success && (
        <div className="mt-4">
          <Button loading={loading} className="btn btn-danger btn-red">
            {t("withdrawRequest")}
          </Button>
        </div>
      )}
    </form>
  );
};
