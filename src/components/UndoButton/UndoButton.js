/** @jsxImportSource @emotion/react */
import React from "react";
import { Button } from "@mui/material";
import { buttonStyle } from "./UndoButtonStyles";

const UndoButton = ({ handleUndo }) => (
  <Button css={buttonStyle} onClick={handleUndo}>
    Undo
  </Button>
);

export default UndoButton;
