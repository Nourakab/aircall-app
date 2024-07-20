/** @jsxImportSource @emotion/react */
import React from "react";
import { Button } from "@mui/material";
import { buttonStyle } from "./ArchiveAllButtonStyles";

const ArchiveAllButton = ({ calls, setCalls }) => {
  const handleArchiveAll = () => {
    const updatedCalls = calls.map((call) => ({ ...call, is_archived: true }));
    setCalls(updatedCalls);

    updatedCalls.forEach((call) => {
      fetch(`https://aircall-backend.onrender.com/activities/${call.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_archived: true }),
      })
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
          // No need to update the state again here
        })
        .catch((error) =>
          console.error("Error archiving call:", error.message)
        );
    });
  };

  return (
    <Button css={buttonStyle} onClick={handleArchiveAll}>
      Archive All
    </Button>
  );
};

export default ArchiveAllButton;
