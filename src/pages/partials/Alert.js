import React from "react";
import "../../css/partials/alert.css";

export default function Alert({ type, message, onConfirm, onClose }) {
  return (
    <div className="alert-box">
      {type === "confirm" ? (
        <>
          <p>{message}</p>
          <div className="alert-btn">
            <button className="button success" onClick={onConfirm}>
              Confirm
            </button>
            <button className="button danger" onClick={onClose}>
              No
            </button>
          </div>
        </>
      ) : (
        <>
          <p>{message}</p>
          <div className="alert-btn">
            <button className="button normal" onClick={onClose}>
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}
