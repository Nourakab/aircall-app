/** @jsxImportSource @emotion/react */
import React from "react";
import { IconButton } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { iconButtonStyle } from "./ArchiveButtonStyles";

const ArchiveButton = ({ call, setCalls }) => {
  if (!call || !setCalls) return null;

  const handleArchive = () => {
    fetch(`https://aircall-backend.onrender.com/activities/${call.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_archived: !call.is_archived }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.text(); // Read response as text since the server returned a plain text response not in a JSON format.
      })
      .then((text) => {
        console.log("Response Text:", text);
        // Directly update the state based on the success of the action wether it's archiving/unarchiving rather than relying on the content of the response.
        setCalls((prevCalls) =>
          prevCalls.map((c) =>
            c.id === call.id ? { ...c, is_archived: !c.is_archived } : c
          )
        );
      })
      .catch((error) => console.error("Error updating call:", error.message));
  };

  return (
    <IconButton css={iconButtonStyle} edge="end" onClick={handleArchive}>
      {call.is_archived ? <UnarchiveIcon /> : <ArchiveIcon />}
    </IconButton>
  );
};

export default ArchiveButton;
