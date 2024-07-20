import React from "react";
import "./TabsComponent.css";

const TabsComponent = ({ currentTab, setCurrentTab }) => {
  const handleTabChange = (newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div className="tab-container">
      <div className="tabs">
        <div
          className={`tab ${currentTab === "activity" ? "selected" : ""}`}
          onClick={() => handleTabChange("activity")}
        >
          Activity
        </div>
        <div
          className={`tab ${currentTab === "inbox" ? "selected" : ""}`}
          onClick={() => handleTabChange("inbox")}
        >
          Inbox
        </div>
        <div
          className={`tab ${currentTab === "all-calls" ? "selected" : ""}`}
          onClick={() => handleTabChange("all-calls")}
        >
          All Calls
        </div>
        <div
          className={`tab ${currentTab === "archived" ? "selected" : ""}`}
          onClick={() => handleTabChange("archived")}
        >
          Archived
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;
