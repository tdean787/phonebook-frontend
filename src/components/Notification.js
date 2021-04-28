import React from "react";

const Notification = ({ message, notificationStyle }) => {
  let style;
  if (notificationStyle === "confirmed") {
    style = "confirmed";
  }

  if (message === null) {
    return null;
  }

  return <div className={style}>{message}</div>;
};

export default Notification;
