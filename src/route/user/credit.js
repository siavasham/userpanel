import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import Button from "component/button";
import Input from "component/input";
import Spinner from "component/spinner";
import { banks } from "library/const";

export default function () {
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [error, setError] = useState(false);
  const [bank, setBank] = useState("");
  const [data, setData] = useState();

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const {
    setting: { token },
  } = useStorage();

  useEffect(() => {
    // setLoading(true);
    // post("profile", { token }).then((data) => {
    //   setLoading(false);
    //   if (data.success) {
    //     setData(data.success);
    //   }
    // });
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmiting(true);
    post("update-info", { ...data, token }).then((data) => {
      setSubmiting(null);
    });
  };
  return (
    <div className="p-4">
      {loading && <Spinner forDiv />}
      <div className="row">
        <div className="col-5">
          <h6 className="pb-1">{t("newCredit")}</h6>
          <form className="mt-5 m-4" autoComplete="off" onSubmit={onSubmit}>
            <Input
              name={"credit"}
              value={data?.credit}
              onChange={(v) => onChange("credit", v)}
            />
            <Input
              name={"iban"}
              value={data?.iban}
              onChange={(v) => onChange("iban", v)}
            />
            <div className="d-grid gap-2 mt-5">
              <Button className="btn btn-danger btn-red" loading={loading}>
                {t("submitCredit")}
              </Button>
            </div>
          </form>
        </div>

        <div className="col-7 banks">
          {banks.map((item, i) => (
            <div
              className={"bank-item " + (bank == item ? "active" : "")}
              key={i}
              onClick={() => setBank(item)}
            >
              <i className={"ibl128 ibl-" + item}></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
