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

  const handleArchiveAll = (currentCalls) => {
    console.log("Archiving all calls...");
    setPreviousCalls(calls);
    const updatedCalls = calls.map((call) =>
      currentCalls.includes(call) ? { ...call, is_archived: true } : call
    );
    setCalls(updatedCalls);

    currentCalls.forEach((call) => {
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

  const handleUndoArchiveAll = () => {
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

  const handleArchive = (call) => {
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
        return response.text();
      })
      .then((text) => {
        console.log("Response Text:", text);
        setCalls((prevCalls) =>
          prevCalls.map((c) =>
            c.id === call.id ? { ...c, is_archived: !c.is_archived } : c
          )
        );
        setPreviousCalls((prev) => [...prev, call]);
      })
      .catch((error) => console.error("Error updating call:", error.message));
  };

  return {
    calls,
    setCalls,
    handleArchiveAll,
    handleUndoArchiveAll,
    handleArchive,
  };
};

export default useCallActions;
