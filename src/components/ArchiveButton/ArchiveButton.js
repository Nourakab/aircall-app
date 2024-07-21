import React from "react";
import { BiSolidArchiveIn, BiSolidArchiveOut } from "react-icons/bi";
import "./ArchiveButton.css";

const ArchiveButton = ({ call, handleArchive }) => {
  if (!call || !handleArchive) return null;

  const handleClick = (e) => {
    e.stopPropagation();
    handleArchive(call);
  };

  return (
    <button
      className={`icon-button ${call.is_archived ? "archived" : ""}`}
      onClick={handleClick}
    >
      {call.is_archived ? <BiSolidArchiveOut /> : <BiSolidArchiveIn />}
    </button>
  );
};

export default ArchiveButton;
