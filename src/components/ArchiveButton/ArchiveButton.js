/** @jsxImportSource @emotion/react */
import React from "react";
import { IconButton } from "@mui/material";
import { BiSolidArchiveIn, BiSolidArchiveOut } from "react-icons/bi";
import { iconButtonStyle } from "./ArchiveButtonStyles";

const ArchiveButton = ({ call, handleArchive }) => {
  if (!call || !handleArchive) return null;

  return (
    <IconButton
      css={iconButtonStyle}
      edge="end"
      onClick={() => handleArchive(call)}
    >
      {call.is_archived ? <BiSolidArchiveOut /> : <BiSolidArchiveIn />}
    </IconButton>
  );
};

export default ArchiveButton;
