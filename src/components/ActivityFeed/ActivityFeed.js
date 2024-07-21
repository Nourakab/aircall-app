import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import FilterButtons from "../FilterButtons/FilterButtons";
import CallList from "./CallList";
import Snackbar from "../Snackbar/Snackbar";
import { TiFilter } from "react-icons/ti";
import { groupCallsByDate } from "../../utils";
import "./ActivityFeed.css";

const ActivityFeed = ({ calls, currentTab, setCalls, handleArchive }) => {
  const groupedCalls = groupCallsByDate(calls);
  const [openCall, setOpenCall] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("all");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [undoAction, setUndoAction] = useState(null);
  const [snackbarKey, setSnackbarKey] = useState(0);

  const toggleCallDetails = (callId) => {
    setOpenCall((prevOpenCall) => (prevOpenCall === callId ? null : callId));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (criteria) => {
    setFilterCriteria(criteria);
  };

  const handleArchiveWithSnackbar = (call) => {
    handleArchive(call);
    setSnackbarMessage("Call archived");
    setUndoAction(() => () => {
      // Undo logic here
      handleArchive({ ...call, is_archived: !call.is_archived });
    });
    setSnackbarKey((prevKey) => prevKey + 1);
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
          className={`filter-toggle-button ${filtersVisible ? "selected" : ""}`}
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
      <CallList
        filteredCalls={filteredCalls}
        toggleCallDetails={toggleCallDetails}
        openCall={openCall}
        currentTab={currentTab}
        handleArchive={handleArchiveWithSnackbar}
        setCalls={setCalls}
      />
      <Snackbar
        key={snackbarKey}
        message={snackbarMessage}
        actionLabel="UNDO"
        onAction={undoAction}
      />
    </div>
  );
};

export default ActivityFeed;
