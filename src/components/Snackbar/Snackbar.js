import React, { useState, useEffect } from "react";
import "./Snackbar.css";

const Snackbar = ({ message, actionLabel, onAction, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  return (
    <div className={`snackbar ${visible ? "show" : ""}`}>
      <span>{message}</span>
      {onAction && (
        <button className="snackbar-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default Snackbar;
