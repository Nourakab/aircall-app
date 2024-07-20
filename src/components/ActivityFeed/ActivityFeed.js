import React, { useState } from "react";
import { Collapse } from "react-collapse";
import ArchiveButton from "../ArchiveButton/ArchiveButton";
import {
  BsFillTelephoneInboundFill,
  BsFillTelephoneOutboundFill,
} from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { LuPhoneMissed } from "react-icons/lu";
import { PiVoicemailFill } from "react-icons/pi";
import "./ActivityFeed.css";

const getCallTypeIcon = (callType) => {
  switch (callType) {
    case "missed":
      return <LuPhoneMissed className="iconStyle" style={{ color: "red" }} />;
    case "answered":
      return <FiPhoneCall className="iconStyle" style={{ color: "red" }} />;
    case "voicemail":
      return <PiVoicemailFill className="iconStyle" style={{ color: "red" }} />;
    default:
      return null;
  }
};

const getCallDirectionIcon = (direction) => {
  switch (direction) {
    case "outbound":
      return (
        <BsFillTelephoneOutboundFill
          className="iconStyle"
          style={{ color: "#0680d1" }}
        />
      );
    case "inbound":
      return (
        <BsFillTelephoneInboundFill
          className="iconStyle"
          style={{ color: "#15d1cc" }}
        />
      );
    default:
      return null;
  }
};

const groupCallsByDate = (calls) => {
  return calls.reduce((acc, call) => {
    const date = new Date(call.created_at).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(call);
    return acc;
  }, {});
};

const formatDuration = (seconds) => {
  if (seconds < 60) {
    return `${seconds.toString().padStart(2, "0")} sec`;
  }
  const minutes = Math.floor(seconds / 60);
  return `${minutes} min`;
};

const ActivityFeed = ({ calls, currentTab, setCalls, handleArchive }) => {
  const groupedCalls = groupCallsByDate(calls);
  const [openCall, setOpenCall] = useState(null);

  const toggleCallDetails = (callId) => {
    setOpenCall((prevOpenCall) => (prevOpenCall === callId ? null : callId));
  };

  return (
    <ul className="styledList">
      {Object.keys(groupedCalls).length === 0 ? (
        <p>No active calls</p>
      ) : (
        Object.keys(groupedCalls).map((date) => (
          <div key={date}>
            <div className="dateHeader">{date}</div>
            {groupedCalls[date].map((call) => (
              <div key={call.id}>
                <li
                  className="styledListItemButton"
                  onClick={() => toggleCallDetails(call.id)}
                >
                  <div className="callDetails">
                    {getCallDirectionIcon(call.direction)}
                    {currentTab === "inbox" && getCallTypeIcon(call.call_type)}
                    <div>
                      <div
                        style={{
                          fontFamily: "Afacad",
                          fontWeight: "bold",
                        }}
                      >
                        {call.direction === "inbound"
                          ? ` ${call.from}`
                          : ` ${call.to}`}
                      </div>
                      {currentTab === "inbox" && (
                        <div
                          style={{
                            fontFamily: "Afacad",
                            color: "grey",
                          }}
                        >
                          {`Via: ${call.via} | Type: ${call.call_type}`}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="callTimeContainer">
                    <div className="callTime">
                      {new Date(call.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="callDuration">
                      <FiPhoneCall className="iconStyle" />
                      {formatDuration(call.duration)}
                    </div>
                  </div>
                  <ArchiveButton
                    call={call}
                    setCalls={setCalls}
                    handleArchive={handleArchive}
                  />
                </li>
                <Collapse isOpened={openCall === call.id}>
                  <div style={{ padding: "0 16px 16px 16px" }}>
                    <p>Additional Call Details:</p>
                    <p>Call Type: {call.call_type}</p>
                    <p>Via: {call.via}</p>
                    {/* Add more details as needed */}
                  </div>
                </Collapse>
              </div>
            ))}
          </div>
        ))
      )}
    </ul>
  );
};

export default ActivityFeed;
