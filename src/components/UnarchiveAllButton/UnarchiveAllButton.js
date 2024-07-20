/** @jsxImportSource @emotion/react */
import React from "react";
import { Button } from "@mui/material";
import { buttonStyle } from "./UnarchiveAllButtonStyles";

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
        console.log("Response Text:", text);
        // Assuming the reset endpoint returns the updated call list
        fetch("https://aircall-backend.onrender.com/activities")
          .then((response) => response.json())
          .then((data) => setCalls(data))
          .catch((error) => console.error("Error fetching data:", error));
      })
      .catch((error) => console.error("Error resetting calls:", error.message));
  };

  return (
    <Button css={buttonStyle} onClick={handleUnarchiveAll}>
      Unarchive All
    </Button>
  );
};

export default UnarchiveAllButton;
