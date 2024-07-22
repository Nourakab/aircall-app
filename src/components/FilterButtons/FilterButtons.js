import React from "react";
import "./FilterButtons.css";

const FilterButtons = ({ filterCriteria, handleFilterChange, visible }) => {
  return (
    <div className={`filter-buttons ${visible ? "visible" : ""}`}>
      {["all", "inbound", "outbound", "answered", "missed"].map((criteria) => (
        <button
          key={criteria}
          className={`filter-button ${
            filterCriteria === criteria ? "selected" : ""
          }`}
          onClick={() => handleFilterChange(criteria)}
        >
          {criteria.charAt(0).toUpperCase() + criteria.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
