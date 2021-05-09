import React from "react";

export default function (props) {
  return (
    <div>
      <div
        className={
          "spinner-wrapper " +
          ("forDiv" in props ? "for-div " : " ") +
          ("noBg" in props ? "no-bg" : "")
        }
      >
        <div className="donut"></div>
      </div>
    </div>
  );
}
