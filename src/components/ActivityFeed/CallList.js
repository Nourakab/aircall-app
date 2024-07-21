import React from "react";
import CallItem from "./CallItem";

const CallList = ({
  filteredCalls,
  toggleCallDetails,
  openCall,
  currentTab,
  handleArchive,
  setCalls,
}) => {
  return (
    <ul className="styledList">
      {Object.keys(filteredCalls).length === 0 ? (
        <p className="no-calls-message">
          {currentTab === "archived" ? "No archived calls" : "No active calls"}
        </p>
      ) : (
        Object.keys(filteredCalls).map((date) => (
          <div key={date}>
            <div className="dateHeader">{date}</div>
            {filteredCalls[date].map((call) => (
              <CallItem
                key={call.id}
                call={call}
                openCall={openCall}
                toggleCallDetails={toggleCallDetails}
                currentTab={currentTab}
                handleArchive={handleArchive}
                setCalls={setCalls}
              />
            ))}
          </div>
        ))
      )}
    </ul>
  );
};

export default CallList;
