/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import ActivityFeed from "./components/ActivityFeed/ActivityFeed";
import ArchiveAllButton from "./components/ArchiveAllButton/ArchiveAllButton";
import UnarchiveAllButton from "./components/UnarchiveAllButton/UnarchiveAllButton";
import TabsComponent from "./components/TabsComponent/TabsComponent";
import { Button } from "@mui/material";
import useCallActions from "./hooks/useCallActions";
import {
  appContainerStyle,
  contentContainerStyle,
  actionsContainerStyle,
} from "./styles/AppStyles";

const App = () => {
  const { calls, setCalls, handleArchiveAll, handleUndoArchive } =
    useCallActions();
  const [currentTab, setCurrentTab] = useState("activity");
  const [hasArchived, setHasArchived] = useState(false);

  useEffect(() => {
    console.log("Fetched calls:", calls);
  }, [calls]);

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
    setHasArchived(true);
  };

  const handleUndoArchiveWithCheck = () => {
    handleUndoArchive();
    setHasArchived(false);
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
              {hasArchived && (
                <Button onClick={handleUndoArchiveWithCheck}>Undo</Button>
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
        />
      </div>
    </div>
  );
};

export default App;
