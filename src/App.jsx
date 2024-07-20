/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import ActivityFeed from "./components/ActivityFeed/ActivityFeed";
import ArchiveAllButton from "./components/ArchiveAllButton/ArchiveAllButton";
import UnarchiveAllButton from "./components/UnarchiveAllButton/UnarchiveAllButton";
import TabsComponent from "./components/TabsComponent/TabsComponent";
import Snackbar from "@mui/material/Snackbar";
import useCallActions from "./hooks/useCallActions";
import UndoButton from "./components/UndoButton/UndoButton";
import {
  appContainerStyle,
  contentContainerStyle,
  actionsContainerStyle,
} from "./styles/AppStyles";

const App = () => {
  const {
    calls,
    setCalls,
    handleArchiveAll,
    handleUndoArchiveAll,
    handleUndoArchive,
    handleArchive,
  } = useCallActions();
  const [currentTab, setCurrentTab] = useState("activity");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [undoAction, setUndoAction] = useState(null);

  useEffect(() => {
    console.log("Fetched calls:", calls);
  }, [calls]);

  useEffect(() => {
    setUndoAction(null);
    setSnackbarOpen(false);
  }, [currentTab]);

  const filteredCalls = () => {
    if (!calls) {
      return [];
    }
    let filtered;
    switch (currentTab) {
      case "activity":
        filtered = calls.filter((call) => !call.is_archived);
        break;
      case "inbox":
        filtered = calls.filter(
          (call) =>
            call.call_type === "missed" || call.call_type === "voicemail"
        );
        break;
      case "all-calls":
        filtered = calls;
        break;
      case "archived":
        filtered = calls.filter((call) => call.is_archived);
        break;
      default:
        filtered = calls;
    }
    console.log(`Filtered calls for ${currentTab}:`, filtered);
    return filtered;
  };

  const handleArchiveAllWithCheck = () => {
    handleArchiveAll();
    setUndoAction("archiveAll");
    setSnackbarOpen(true);
  };

  const handleUndoArchiveAllWithCheck = () => {
    handleUndoArchiveAll();
    setSnackbarOpen(false);
  };

  const handleArchiveWithCheck = (call) => {
    handleArchive(call);
    setUndoAction("archive");
    setSnackbarOpen(true);
  };

  return (
    <div css={appContainerStyle}>
      <Header />
      <TabsComponent currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div css={contentContainerStyle}>
        <div css={actionsContainerStyle}>
          {currentTab === "activity" && (
            <>
              <ArchiveAllButton handleArchiveAll={handleArchiveAllWithCheck} />
              {undoAction === "archiveAll" && (
                <UndoButton handleUndo={handleUndoArchiveAllWithCheck} />
              )}
            </>
          )}
          {currentTab === "archived" && (
            <UnarchiveAllButton setCalls={setCalls} />
          )}
        </div>
        <ActivityFeed
          calls={filteredCalls()}
          currentTab={currentTab}
          setCalls={setCalls}
          handleArchive={handleArchiveWithCheck}
        />
      </div>
      <Snackbar
        open={snackbarOpen}
        message={
          undoAction === "archiveAll"
            ? "All calls archived. Click undo to revert."
            : "Call archived. Click undo to revert."
        }
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        action={
          <UndoButton
            handleUndo={
              undoAction === "archiveAll"
                ? handleUndoArchiveAllWithCheck
                : handleUndoArchive
            }
          />
        }
      />
    </div>
  );
};

export default App;
