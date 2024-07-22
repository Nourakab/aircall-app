import React from "react";
import "./UnarchiveAllButton.css";

const UnarchiveAllButton = ({ setCalls }) => {
  const handleUnarchiveAll = () => {
    fetch("https://aircall-backend.onrender.com/reset", { method: "PATCH" })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.text(); // Read response as text
      })
      .then((text) => {
        // Assuming the reset endpoint returns the updated call list
        fetch("https://aircall-backend.onrender.com/activities")
          .then((response) => response.json())
          .then((data) => setCalls(data))
          .catch((error) => console.error("Error fetching data:", error));
      })
      .catch((error) => console.error("Error resetting calls:", error.message));
  };

  return (
    <button className="unarchive-button" onClick={handleUnarchiveAll}>
      Unarchive All
    </button>
  );
};

export default UnarchiveAllButton;
