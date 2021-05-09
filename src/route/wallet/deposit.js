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

export default function ({ coin }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const [copid, setCopid] = useState(false);
  const onCopy = () => {
    setCopid(true);
    setTimeout(() => {
      setCopid(false);
    }, 5000);
  };

  const {
    setting: { token },
  } = useStorage();

  useEffect(() => {
    if (coin != "") {
      setShow(true);
      setLoading(true);
      // post("coins", { token }, { cache: true }).then((res) => {
      //   setLoading(false);
      //   if (res?.success) {
      //     setData(res.success);
      //   }
      // });
    }
  }, [coin]);
  return (
    <Modal
      show={show}
      centered
      onHide={() => setShow(false)}
      keyboard={true}
      contentClassName="my-modal"
    >
      <>
        {loading ? (
          <Spinner forDiv noBg />
        ) : (
          <>
            <div className="row mt-4"></div>
            <div className="mb-3 text-center qr-code">
              <QRCode
                bgColor="#2b2c31"
                fgColor="#ddd"
                level="Q"
                style={{ maxWidth: 200 }}
                value={data?.address}
              />
            </div>
            <div className="input-group mb-3 auth-form-transparent">
              <div className="input-group-prepend cursor-pointer">
                <Clipboard
                  component="span"
                  data-clipboard-text={data?.address}
                  onSuccess={onCopy}
                  className="input-group-text text-primary mdi mdi-content-copy"
                ></Clipboard>
              </div>
              <input
                value={data?.address}
                readOnly
                dir="auto"
                type="text"
                className="form-control form-control"
              />
            </div>
            <Alert variant="info" bsPrefix="alert alert-fill">
              {t("depositInfo")}
            </Alert>
            <div className="inline-absolute center text-center">
              <Alert variant="primary" bsPrefix="alert alert-fill" show={copid}>
                {t("addressCopid")}
              </Alert>
            </div>
          </>
        )}
      </>
    </Modal>
  );
}
