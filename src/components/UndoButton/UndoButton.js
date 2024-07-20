import React from "react";
import "./UndoButton.css";

const UndoButton = ({ handleUndo }) => (
  <button className="undo-button" onClick={handleUndo}>
    Undo
  </button>
);

export default UndoButton;
