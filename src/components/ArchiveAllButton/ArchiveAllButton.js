import React from "react";
import "./ArchiveAllButton.css";

const ArchiveAllButton = ({ handleArchiveAll }) => {
  return (
    <button className="button" onClick={handleArchiveAll}>
      Archive All
    </button>
  );
};

export default ArchiveAllButton;
