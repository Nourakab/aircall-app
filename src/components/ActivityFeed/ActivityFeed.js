/** @jsxImportSource @emotion/react */
import React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import ArchiveButton from "../ArchiveButton/ArchiveButton";
import {
  styledList,
  styledListItemButton,
  dateHeader,
  callDetails,
  callTime,
} from "./ActivityFeedStyles";
import { FiPhoneIncoming, FiPhoneCall } from "react-icons/fi";
import { LuPhoneOutgoing, LuPhoneMissed } from "react-icons/lu";
import { PiVoicemailFill } from "react-icons/pi";

const getCallTypeIcon = (callType) => {
  switch (callType) {
    case "missed":
      return <LuPhoneMissed />;
    case "answered":
      return <FiPhoneCall />;
    case "voicemail":
      return <PiVoicemailFill />;
    default:
      return null;
  }
};

const getCallDirectionIcon = (direction) => {
  switch (direction) {
    case "outbound":
      return <LuPhoneOutgoing />;
    case "inbound":
      return <FiPhoneIncoming />;
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

const ActivityFeed = ({ calls, currentTab, setCalls }) => {
  const groupedCalls = groupCallsByDate(calls);

  return (
    <List css={styledList}>
      {Object.keys(groupedCalls).map((date) => (
        <div key={date}>
          <div css={dateHeader}>{date}</div>
          {groupedCalls[date].map((call) => (
            <ListItemButton css={styledListItemButton} key={call.id}>
              <div css={callDetails}>
                {getCallDirectionIcon(call.direction)}
                {currentTab === "inbox" && getCallTypeIcon(call.call_type)}
                <ListItemText
                  primary={`From: ${call.from}`}
                  secondary={
                    currentTab === "inbox"
                      ? `To: ${call.to} | Via: ${call.via} | Type: ${call.call_type}`
                      : `To: ${call.to}`
                  }
                />
              </div>
              <div css={callTime}>
                {new Date(call.created_at).toLocaleTimeString()}
              </div>
              <ListItemSecondaryAction>
                <ArchiveButton call={call} setCalls={setCalls} />
              </ListItemSecondaryAction>
            </ListItemButton>
          ))}
        </div>
      ))}
    </List>
  );
};

export default ActivityFeed;
