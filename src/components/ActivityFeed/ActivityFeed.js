import React, { useState, useEffect } from "react";
import { Collapse } from "react-collapse";
import ArchiveButton from "../ArchiveButton/ArchiveButton";
import {
  BsFillTelephoneInboundFill,
  BsFillTelephoneOutboundFill,
} from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { LuPhoneMissed } from "react-icons/lu";
import { PiVoicemailFill } from "react-icons/pi";
import SearchBar from "../SearchBar/SearchBar";
import FilterButtons from "../FilterButtons/FilterButtons";
import { TiFilter } from "react-icons/ti";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("all");
  const [filtersVisible, setFiltersVisible] = useState(false);

  const toggleCallDetails = (callId) => {
    setOpenCall((prevOpenCall) => (prevOpenCall === callId ? null : callId));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (criteria) => {
    setFilterCriteria(criteria);
  };

  const filteredCalls = Object.keys(groupedCalls).reduce((acc, date) => {
    const filteredByType = groupedCalls[date].filter((call) => {
      if (filterCriteria === "all") return true;
      if (filterCriteria === "inbound" && call.direction === "inbound")
        return true;
      if (filterCriteria === "outbound" && call.direction === "outbound")
        return true;
      if (filterCriteria === "answered" && call.call_type === "answered")
        return true;
      if (filterCriteria === "missed" && call.call_type === "missed")
        return true;
      return false;
    });
    const filteredBySearch = filteredByType.filter(
      (call) =>
        (call.from && String(call.from).includes(searchQuery)) ||
        (call.to && String(call.to).includes(searchQuery))
    );
    if (filteredBySearch.length > 0) {
      acc[date] = filteredBySearch;
    }
    return acc;
  }, {});

  useEffect(() => {
    console.log("Filters visible:", filtersVisible);
  }, [filtersVisible]);

  return (
    <div className="activity-feed-container">
      <div className="search-filter-container">
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        <FilterButtons
          filterCriteria={filterCriteria}
          handleFilterChange={handleFilterChange}
        />
        <button
          className="filter-toggle-button"
          onClick={() => setFiltersVisible(!filtersVisible)}
        >
          <TiFilter size={24} />
        </button>
      </div>
      <div
        className={`filter-buttons-mobile ${
          filtersVisible ? "visible" : "hidden"
        }`}
      >
        <FilterButtons
          filterCriteria={filterCriteria}
          handleFilterChange={handleFilterChange}
          visible={filtersVisible}
        />
      </div>
      <ul className="styledList">
        {Object.keys(filteredCalls).length === 0 ? (
          <p>No active calls</p>
        ) : (
          Object.keys(filteredCalls).map((date) => (
            <div key={date}>
              <div className="dateHeader">{date}</div>
              {filteredCalls[date].map((call) => (
                <div key={call.id}>
                  <li
                    className="styledListItemButton"
                    onClick={() => toggleCallDetails(call.id)}
                  >
                    <div className="callDetails">
                      {getCallDirectionIcon(call.direction)}
                      {currentTab === "inbox" &&
                        getCallTypeIcon(call.call_type)}
                      <div>
                        <div
                          style={{ fontFamily: "Afacad", fontWeight: "bold" }}
                        >
                          {call.direction === "inbound"
                            ? ` ${call.from}`
                            : ` ${call.to}`}
                        </div>
                        {currentTab === "inbox" && (
                          <div style={{ fontFamily: "Afacad", color: "grey" }}>
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
                      <p className="additionalDetails">
                        Additional Call Details:
                      </p>
                      <p className="additionalDetails">
                        Call was: {call.call_type}
                      </p>
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
              ))}
            </div>
          ))
        )}
      </ul>
    </div>
  );
};

export default ActivityFeed;
