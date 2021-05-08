import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import Button from "component/button";
import Input from "component/input";
import Spinner from "component/spinner";
import Alert from "react-bootstrap/Alert";

export default function () {
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const {
    setting: { token },
  } = useStorage();

  useEffect(() => {
    setLoading(true);
    post("profile", { token }).then((data) => {
      setLoading(false);
      if (data.success) {
        setData(data.success);
      }
    });
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmiting(true);
    post("update-info", { ...data, token }).then((data) => {
      setSubmiting(null);
    });
  };
  return (
    <div className="">
      {loading && <Spinner forDiv />}

      <form className="py-3 px-5" autoComplete="off" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-12">
            <Input name={"phone"} value={data?.phone} disabled />
          </div>
          <div className="col-12">
            <Input
              name={"name"}
              value={data?.name}
              onChange={(v) => onChange("name", v)}
            />
          </div>
          <div className="col-12">
            <Input
              name={"email"}
              value={data?.email}
              onChange={(v) => onChange("email", v)}
            />
          </div>
          <div className="col-12">
            <Input
              name={"address"}
              multiLine
              value={data?.address}
              onChange={(v) => onChange("address", v)}
            />
          </div>
        </div>
        <Alert variant="success" show={submiting === null}>
          {t("successInfo")}
        </Alert>
        <div className="mt-3">
          <Button loading={submiting} className="btn btn-danger btn-red">
            {t("edit")}
          </Button>
        </div>
      </form>
    </div>
  );
}
