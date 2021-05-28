import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import Button from "component/button";
import Input from "component/input";
import Spinner from "component/spinner";
import Alert from "react-bootstrap/Alert";
import Compressor from "compressorjs";
import verfyLogo from "assets/images/verify.png";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

export default function () {
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState();

  const [idCard, setIdCard] = useState(null);
  const [fullImage, setFullImage] = useState(null);

  const onChangeId = (e) => {
    upload(e, 1);
  };
  const onChangeFull = (e) => {
    upload(e, 2);
  };
  const upload = (e, type) => {
    new Compressor(e.target.files[0], {
      quality: 0.7,
      // convertSize: 100000,
      success: (res) => {
        if (type == 1) setIdCard(res);
        else setFullImage(res);
      },
    });
  };
  const {
    setting: { token },
  } = useStorage();

  useEffect(() => {
    setLoading(true);
    post("level", { token }).then((data) => {
      setLoading(false);
      if (data.success) {
        setData(data.success);
      }
    });
  }, []);
  const onSubmit = (e) => {
    if (idCard == null || fullImage == null) {
      setError(true);
      return;
    }
    setError(false);
    setSubmiting(true);
    setHasError(false);
    setSuccess(false);
    post("kyc", { token, cart: idCard, img: fullImage }, { file: true }).then(
      (data) => {
        setSubmiting(null);
        if (data.success) {
          setSuccess(true);
        } else if (data.error) {
          setHasError(true);
        }
      }
    );
  };
  return (
    <div className="p-4">
      {loading && <Spinner forDiv />}
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="alert alert-primary m0 f" role="alert">
            <InfoOutlinedIcon className="text fs-2 me-2" />
            {t("kycLevelUp")}
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="alert alert-primary m0 h-100 f ac jb" role="alert">
            {t("kycLevelState")}
            <Button className="btn btn-dark h-100 fc">{t("level-1")}</Button>
          </div>
        </div>
      </div>
      {data == null ? (
        <>
          <hr className="mt-5 mb-3"></hr>
          <div className="f ac">
            <img className="img-icon" src={verfyLogo} />
            <p className="m0">{t("kycText")}</p>
          </div>
          <div className="row m-4">
            <div className="col-sm-12 col-md-6">
              <div className="card">
                <label className="verify-img-bg fc">
                  {idCard ? (
                    <>
                      <img
                        className="verify-img-temp"
                        src={URL.createObjectURL(idCard)}
                      />
                    </>
                  ) : (
                    <WallpaperIcon className="verify-img-icon" />
                  )}
                  <input type="file" onChange={onChangeId} />
                </label>
                <div className="card-body verify-text">
                  <p className="card-text">{t("upImg1")}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="card">
                <label className="verify-img-bg fc">
                  {fullImage ? (
                    <>
                      <img
                        className="verify-img-temp"
                        src={URL.createObjectURL(fullImage)}
                      />
                    </>
                  ) : (
                    <WallpaperIcon className="verify-img-icon" />
                  )}
                  <input type="file" onChange={onChangeFull} />
                </label>
                <div className="card-body verify-text">
                  <p className="card-text">{t("upImg2")}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-4">
            <Alert variant="warning mt-4" show={error}>
              {t("imageNotPicked")}
            </Alert>
            <Alert variant="danger" show={hasError}>
              {t("errorVerify")}
            </Alert>
            <Alert variant="success" show={success}>
              {t("successVerify")}
            </Alert>
          </div>
          <div className="mt-4 fc">
            <Button
              loading={submiting}
              className="btn btn-danger btn-red w-50"
              onClick={onSubmit}
            >
              {t("submitVerify")}
            </Button>
          </div>
        </>
      ) : (
        <div className="m-1 mt-5">
          <Alert
            variant={
              data.status == "pending"
                ? "warning"
                : data.status == "rejected"
                ? "danger"
                : "success"
            }
            show={true}
          >
            {t(data.status + "Verify")}
          </Alert>
        </div>
      )}
    </div>
  );
}
