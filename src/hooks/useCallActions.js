import { useState, useEffect } from "react";

const useCallActions = () => {
  const [calls, setCalls] = useState([]);
  const [previousCalls, setPreviousCalls] = useState([]);

  useEffect(() => {
    fetch("https://aircall-backend.onrender.com/activities")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched calls:", data);
        setCalls(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleArchiveAll = () => {
    console.log("Archiving all calls...");
    setPreviousCalls(calls);
    const updatedCalls = calls.map((call) => ({ ...call, is_archived: true }));
    setCalls(updatedCalls);

    updatedCalls.forEach((call) => {
      fetch(`https://aircall-backend.onrender.com/activities/${call.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_archived: true }),
      }).catch((error) =>
        console.error("Error archiving call:", error.message)
      );
    });
  };

  const handleUndoArchive = () => {
    console.log("Undoing archive...");
    setCalls(previousCalls);
    previousCalls.forEach((call) => {
      fetch(`https://aircall-backend.onrender.com/activities/${call.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_archived: false }),
      }).catch((error) =>
        console.error("Error unarchiving call:", error.message)
      );
    });
  };

  return {
    calls,
    setCalls,
    handleArchiveAll,
    handleUndoArchive,
  };
};

export default useCallActions;
