import React from "react";
import { Collapse } from "react-collapse";
import ArchiveButton from "../ArchiveButton/ArchiveButton";
import { FiPhoneCall } from "react-icons/fi";
import { LuPhoneMissed } from "react-icons/lu";
import { TbPhoneCheck } from "react-icons/tb";
import {
  BsFillTelephoneInboundFill,
  BsFillTelephoneOutboundFill,
} from "react-icons/bs";

const getCallTypeIcon = (callType, currentTab) => {
  if (currentTab === "all-calls") {
    switch (callType) {
      case "missed":
        return <LuPhoneMissed className="iconStyle" style={{ color: "red" }} />;
      case "answered":
        return (
          <TbPhoneCheck className="iconStyle" style={{ color: "#05e322" }} />
        );
      default:
        return null;
    }
  } else {
    switch (callType) {
      case "missed":
        return <LuPhoneMissed className="iconStyle" style={{ color: "red" }} />;
      case "answered":
        return <FiPhoneCall className="iconStyle" style={{ color: "green" }} />;
      default:
        return null;
    }
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

const formatDuration = (seconds) => {
  if (seconds < 60) {
    return `${seconds.toString().padStart(2, "0")} sec`;
  }
  const minutes = Math.floor(seconds / 60);
  return `${minutes} min`;
};

const CallItem = ({
  call,
  currentTab,
  toggleCallDetails,
  openCall,
  setCalls,
  handleArchive,
}) => {
  const callTypeColor =
    call.call_type === "missed"
      ? "red"
      : call.call_type === "answered"
      ? "green"
      : "grey";

  return (
    <div key={call.id}>
      <li
        className="styledListItemButton"
        onClick={() => toggleCallDetails(call.id)}
      >
        <div className="callDetails">
          {getCallDirectionIcon(call.direction)}
          {currentTab === "all-calls" &&
            getCallTypeIcon(call.call_type, currentTab)}
          <div>
            <div style={{ fontFamily: "Afacad", fontWeight: "bold" }}>
              {call.direction === "inbound" ? ` ${call.from}` : ` ${call.to}`}
            </div>
            {currentTab === "inbox" && (
              <div
                style={{
                  color: callTypeColor,
                  fontFamily: "Afacad",
                }}
              >
                {` Call was: ${call.call_type}`}
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
          isArchived={call.is_archived}
        />
      </li>
      <Collapse isOpened={openCall === call.id}>
        <div style={{ padding: "0 16px 16px 16px" }}>
          <p className="additionalDetails">Additional Call Details:</p>
          <p className="additionalDetails">Call was: {call.call_type}</p>
          <p className="additionalDetails">
            Aircall number used for the call# {call.via}
          </p>
          {call.from && (
            <p className="additionalDetails">
              The call was from# {String(call.from)}
            </p>
          )}
          {call.to && (
            <p className="additionalDetails">
              The call was destined to# {String(call.to)}
            </p>
          )}
        </div>
      </Collapse>
    </div>
  );
};

export default CallItem;
