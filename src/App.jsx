/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Header from "./components/Header/Header";
import ActivityFeed from "./components/ActivityFeed/ActivityFeed";
import ArchiveAllButton from "./components/ArchiveAllButton/ArchiveAllButton";
import UnarchiveAllButton from "./components/UnarchiveAllButton/UnarchiveAllButton";
import TabsComponent from "./components/TabsComponent/TabsComponent";

const appContainerStyle = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 425px; /* Ensure it looks like a mobile app */
  margin: 0 auto; /* Center it horizontally */
  background-color: #f5f5f5;
  @media (max-width: 600px) {
    width: 100%; /* Full width on small screens */
  }
`;

const contentContainerStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const actionsContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    max-width: 100%;
  }
`;

const App = () => {
  const [calls, setCalls] = useState([]);
  const [currentTab, setCurrentTab] = useState("activity");

  useEffect(() => {
    fetch("https://aircall-backend.onrender.com/activities")
      .then((response) => response.json())
      .then((data) => setCalls(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredCalls = () => {
    switch (currentTab) {
      case "activity":
        return calls.filter((call) => !call.is_archived);
      case "inbox":
        return calls.filter(
          (call) =>
            call.call_type === "missed" || call.call_type === "voicemail"
        );
      case "all-calls":
        return calls;
      case "archived":
        return calls.filter((call) => call.is_archived);
      default:
        return calls;
    }
  };

  return (
    <div css={appContainerStyle}>
      <Header />
      <TabsComponent currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div css={contentContainerStyle}>
        <div css={actionsContainerStyle}>
          {currentTab === "activity" && (
            <ArchiveAllButton calls={calls} setCalls={setCalls} />
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
