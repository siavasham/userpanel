import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import Spinner from "component/spinner";
import Button from "component/button";
import Modal from "react-bootstrap/Modal";
import { QRCode } from "react-qr-svg";
import Clipboard from "react-clipboard.js";
import Alert from "react-bootstrap/Alert";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { fiat } from "library/const";
import payment from "component/payment";
import { toMoney } from "library/helper";
import Input from "component/input";
import isEmpty from "lodash/isEmpty";

export default function (props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coin, setCoin] = useState(null);

  const {
    setting: { token },
  } = useStorage();

  useEffect(() => {
    if (props.coin != "") {
      setCoin(props.coin);
    }
  }, [props.refresh]);

  useEffect(() => {
    if (coin != null) {
      setLoading(true);
      post("pre-deposit", { token, coin }, { cache: true }).then((res) => {
        setLoading(false);
        if (res?.success) {
          setData(res.success);
        }
      });
    }
  }, [coin]);
  return (
    <Modal
      show={!!coin}
      centered
      onHide={() => setCoin(null)}
      keyboard={true}
      contentClassName="my-modal"
    >
      <>
        {loading ? (
          <Spinner forDiv noBg />
        ) : fiat.includes(coin) ? (
          <FiatContent />
        ) : data.length > 1 ? (
          <Tabs>
            {data.map((item, i) => (
              <Tab key={i} eventKey={item.type} title={item.type.toUpperCase()}>
                <DepositContent item={item} />
              </Tab>
            ))}
          </Tabs>
        ) : data.length == 0 ? (
          <Alert variant="danger">{t("coinDeactive")}</Alert>
        ) : (
          <DepositContent item={data[0]} />
        )}
      </>
    </Modal>
  );
}

const DepositContent = ({ item }) => {
  const [copid, setCopid] = useState(false);
  const onCopy = () => {
    setCopid(true);
    setTimeout(() => {
      setCopid(false);
    }, 5000);
  };
  return (
    <div className="p-4">
      <Alert variant="warning">{t("depositInfo")}</Alert>
      <div className="mb-3 text-center qr-code">
        {item?.address && (
          <QRCode
            bgColor="#fff"
            fgColor="#444"
            level="Q"
            style={{ maxWidth: 200 }}
            value={item?.address}
          />
        )}
      </div>
      <div className="input-group mb-3 auth-form-transparent">
        <div className="input-group-prepend cursor-pointer">
          <Clipboard
            component="span"
            data-clipboard-text={item?.address}
            onSuccess={onCopy}
            className="input-group-text text-primary"
          >
            <FileCopyOutlinedIcon />
          </Clipboard>
        </div>
        <input
          value={item?.address}
          readOnly
          dir="auto"
          type="text"
          className="form-control form-control"
        />
      </div>
      {item?.tag && (
        <>
          <div className="input-group mb-3 auth-form-transparent">
            <div className="input-group-prepend cursor-pointer">
              <Clipboard
                component="span"
                data-clipboard-text={item?.tag}
                onSuccess={onCopy}
                className="input-group-text text-primary"
              >
                <FileCopyOutlinedIcon />
              </Clipboard>
            </div>
            <input
              value={item?.tag}
              readOnly
              dir="auto"
              type="text"
              className="form-control form-control"
            />
            <span class="input-group-text text-primary">{t("tag")}</span>
          </div>
        </>
      )}
      <div className="inline-absolute center text-center">
        <Alert variant="success" show={copid}>
          {t("addressCopid")}
        </Alert>
      </div>
    </div>
  );
};

const FiatContent = () => {
  const {
    setting: { token },
  } = useStorage();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [data, setData] = useState({
    amount: "",
    bank: "",
  });
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
      setSubmiting(true);
      post("deposit", { ...data, token, coin: "IR" }, { cache: true }).then(
        (res) => {
          setSubmiting(false);
          if (res?.success) {
            setSuccess(true);
            console.log(res.success);
          }
        }
      );
    }
  };
  return (
    <form autoComplete="off" onSubmit={onSubmit} className="p-3">
      <div className="row">
        <div className="col-12 mb-4">
          <div className="my-3">
            <Input
              name={"chargeAmount"}
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
              {data?.amount ? toMoney(data?.amount) : "-"}
            </span>
            {t("irr")}
          </div>
        </div>
        <div className="col-12 mb-5">
          <p className="text">{t("selectPayment")}</p>
          <div className="f js">
            {payment.map((item, i) => (
              <div
                className={
                  "bank-item " + (data?.bank == item.name ? "active" : "")
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
        <div className="col-12">
          <Alert variant="success" show={success}>
            {t("successOperationIr")}
          </Alert>
        </div>
      </div>
      <div className="mt-2 fc">
        <Button loading={submiting} className="btn btn-danger btn-red w-50">
          {t("confirmAndContine")}
        </Button>
      </div>
    </form>
  );
};
