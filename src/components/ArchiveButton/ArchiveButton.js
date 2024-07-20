import React from "react";
import { BiSolidArchiveIn, BiSolidArchiveOut } from "react-icons/bi";
import "./ArchiveButton.css";

const ArchiveButton = ({ call, handleArchive }) => {
  if (!call || !handleArchive) return null;

  return (
    <button className="icon-button" onClick={() => handleArchive(call)}>
      {call.is_archived ? <BiSolidArchiveOut /> : <BiSolidArchiveIn />}
    </button>
  );
};

export default ArchiveButton;
