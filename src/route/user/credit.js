import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import Button from "component/button";
import Input from "component/input";
import Spinner from "component/spinner";
import { banks } from "library/const";
import Alert from "react-bootstrap/Alert";
import _ from "lodash";

export default function () {
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({ code: "", number: "", iban: "" });
  const [list, setList] = useState([]);

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const {
    setting: { token },
  } = useStorage();

  useEffect(() => {
    setLoading(true);
    post("credit-list", { token }).then((data) => {
      setLoading(false);
      if (data.success) {
        setList(data.success);
      }
    });
  }, []);
  const validate = () => {
    const temp = {};
    console.log(data);
    for (let i in data) {
      if (data[i] == "") temp[i] = "validation.empty";
    }
    const res = _.isEmpty(temp) ? null : temp;
    setError(res);
    return res;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate() == null) {
      setSubmiting(true);
      post("credit-add", { ...data, token }).then((data) => {
        setSubmiting(null);
        refresh();
      });
    }
  };
  const refresh = () => {
    post("credit-list", { token }).then((data) => {
      if (data.success) {
        setList(data.success);
      }
    });
  };
  return (
    <div className="p-4">
      {loading && <Spinner forDiv />}
      <h6 className="pb-4">{t("newCredit")}</h6>
      <div className="row">
        <div className="col-sm-12 col-md-7 mb-4 banks">
          {banks.map((item, i) => (
            <div
              className={"bank-item " + (data?.code == item ? "active" : "")}
              key={i}
              onClick={() => onChange("code", item)}
            >
              <i className={"ibl128 ibl-" + item}></i>
            </div>
          ))}
        </div>
        <div className="col-sm-12 col-md-4  mb-5">
          <form className="mt-3 m-1" autoComplete="off" onSubmit={onSubmit}>
            <Input
              name={"credit"}
              value={data?.number}
              onChange={(v) => onChange("number", v)}
              error={error?.number}
            />
            <Input
              name={"iban"}
              value={data?.iban}
              onChange={(v) => onChange("iban", v)}
              error={error?.iban}
            />
            <Alert variant="danger" show={!!error?.code}>
              {t("bankNotSelected")}
            </Alert>
            <div className="d-grid gap-2 mt-5">
              <Button className="btn btn-danger btn-red" loading={submiting}>
                {t("submitCredit")}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <hr></hr>
      <div className="row row-cols-1 row-cols-md-3 row-cols-ld-4 g-4 mt-4">
        {list.map((item, i) => (
          <div className="col" key={i}>
            <div className="card my-card fc p-3">
              <i className={"ibl128 ibl-" + item.code}></i>
              <div className="text-start text w-100">{t("credit")}</div>
              <h6 className="">{item.number}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
