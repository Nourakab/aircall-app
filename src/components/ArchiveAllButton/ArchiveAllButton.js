/** @jsxImportSource @emotion/react */
import React from "react";
import { Button } from "@mui/material";
import { buttonStyle } from "./ArchiveAllButtonStyles";

const ArchiveAllButton = ({ handleArchiveAll }) => {
  return (
    <Button css={buttonStyle} onClick={handleArchiveAll}>
      Archive All
    </Button>
  );
};

export default ArchiveAllButton;
