import React, { useState, useEffect } from "react";
import { t } from "locales";
import { get } from "library/request";
import useStorage from "reducer";
import Spinner from "component/spinner";
import Button from "component/button";
import { toMoney } from "library/helper";
import Deposit from "./deposit";

export default function () {
  const [list, setList] = useState([]);
  const [coin, setCoin] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    setting: { name, token },
  } = useStorage();

  useEffect(() => {
    setLoading(true);
    get("coins", { cache: true }).then((res) => {
      setLoading(false);
      if (res?.success) {
        setList(res.success);
      }
    });
  }, []);
  return (
    <div>
      {loading && <Spinner forDiv />}
      <div className="row mt-4">
        {list.map((item, i) => (
          <div className="col-12 mb-3" key={i}>
            <div className="card my-card p-3">
              <div className="row">
                <div className="col-4 f ac">
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
                <div className="col-3 f ac">
                  <figure className="fdc">
                    <blockquote className="blockquote">
                      <div className="fs-6">
                        {t("balance")}:<span className="text ms-2">{0.03}</span>
                      </div>
                    </blockquote>
                    <bdi className="blockquote-footer text-end">
                      {toMoney(250000)}
                      {" IRR "}
                    </bdi>
                  </figure>
                </div>
                <div className="col f ac je">
                  <Button
                    onClick={() => setCoin(item.name)}
                    className="btn btn-outline-success m-1"
                  >
                    {t("deposit")}
                  </Button>
                  <Button className="btn btn-outline-danger m-1">
                    {t("withdraw")}
                  </Button>
                  <Button className="btn btn-primary  m-1">
                    {t("toTrader")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Deposit coin={coin} />
    </div>
  );
}
