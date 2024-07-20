import { useState, useEffect } from "react";

const useCallActions = () => {
  const [calls, setCalls] = useState([]);
  const [lastArchivedCall, setLastArchivedCall] = useState(null);
  const [lastArchivedCalls, setLastArchivedCalls] = useState([]);

  useEffect(() => {
    fetch("https://aircall-backend.onrender.com/activities")
      .then((response) => response.json())
      .then((data) => setCalls(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleArchiveAll = () => {
    const updatedCalls = calls.map((call) => ({ ...call, is_archived: true }));
    setLastArchivedCalls(calls.filter((call) => !call.is_archived)); // Store the previous state of the calls
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

  const handleUndoArchiveAll = () => {
    setCalls((prevCalls) => {
      const updatedCalls = prevCalls.map((call) =>
        lastArchivedCalls.find((archivedCall) => archivedCall.id === call.id)
          ? { ...call, is_archived: false }
          : call
      );

      lastArchivedCalls.forEach((call) => {
        fetch(`https://aircall-backend.onrender.com/activities/${call.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_archived: false }),
        }).catch((error) =>
          console.error("Error undoing archive call:", error.message)
        );
      });

      return updatedCalls;
    });
    setLastArchivedCalls([]);
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
        setLastArchivedCall(call);
      })
      .catch((error) => console.error("Error updating call:", error.message));
  };

  const handleUndoArchive = () => {
    if (lastArchivedCall) {
      handleArchive(lastArchivedCall);
      setLastArchivedCall(null);
    }
  };

  return {
    calls,
    setCalls,
    handleArchiveAll,
    handleUndoArchiveAll,
    handleArchive,
    handleUndoArchive,
  };
};

export default useCallActions;
