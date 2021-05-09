import React from "react";
import { t } from "locales";
import _ from "lodash";

export default function ({
  type = "text",
  name,
  multiLine = false,
  data = null,
  value,
  onChange,
  error,
  ...rest
}) {
  return (
    <div className={"form-group mb-3 "}>
      <label htmlFor={name}>{t(name)}</label>
      {data ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={"form-control  " + (error ? "is-invalid" : "")}
          {...rest}
        >
          {data.map((d, i) => (
            <option value={_.isObject(d) ? d.key : d} key={i}>
              {" "}
              {_.isObject(d) ? d.val : t(d)}
            </option>
          ))}
        </select>
      ) : !multiLine ? (
        <input
          id={name}
          name={name}
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          dir="auto"
          className={"form-control " + (error ? "is-invalid" : "")}
          {...rest}
        />
      ) : (
        <textarea
          id={name}
          name={name}
          dir="auto"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={"form-control " + (error ? "is-invalid" : "")}
          rows={5}
          {...rest}
        />
      )}
      <div className="invalid-feedback text-end my-2">
        {typeof error == "object" ? error.map((e) => t(e) + " ") : t(error)}
      </div>
      {"info" in rest && (
        <label className="info mt-2 text-info w-100">{rest.info}</label>
      )}
    </div>
  );
}
