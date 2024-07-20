/** @jsxImportSource @emotion/react */
import React from "react";
import { IconButton } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { iconButtonStyle } from "./ArchiveButtonStyles";

const ArchiveButton = ({ call, handleArchive }) => {
  if (!call || !handleArchive) return null;

  return (
    <IconButton
      css={iconButtonStyle}
      edge="end"
      onClick={() => handleArchive(call)}
    >
      {call.is_archived ? <UnarchiveIcon /> : <ArchiveIcon />}
    </IconButton>
  );
};

export default ArchiveButton;
