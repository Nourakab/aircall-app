import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../SearchBar/SearchBar";
import FilterButtons from "../FilterButtons/FilterButtons";
import CallList from "./CallList";
import Snackbar from "../Snackbar/Snackbar";
import PhoneWidget from "../PhoneWidget/PhoneWidget";
import { TiFilter } from "react-icons/ti";
import { groupCallsByDate } from "../../utils";
import filterCallsByUserRole from "../../utils/filterCallsByUserRole";
import { UserContext } from "../../context/UserContext";
import "./ActivityFeed.css";

const ActivityFeed = ({ calls, currentTab, setCalls, handleArchive }) => {
  const { user } = useContext(UserContext); // Get the current user
  const [openCall, setOpenCall] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("all");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [undoAction, setUndoAction] = useState(null);
  const [phoneWidgetVisible, setPhoneWidgetVisible] = useState(false);

  useEffect(() => {}, [calls]);

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
    setSnackbarOpen(false); // Close the Snackbar before opening it again
    setTimeout(() => setSnackbarOpen(true), 100);
  };

  useEffect(() => {
    if (!snackbarOpen) {
      setSnackbarOpen(true);
    }
  }, [snackbarOpen]);

  // Filter calls based on user role
  const userFilteredCalls =
    currentTab === "inbox" ? filterCallsByUserRole(calls, user) : calls;

  console.log("User Filtered Calls:", userFilteredCalls);

  // Group filtered calls by date
  const groupedCalls = groupCallsByDate(userFilteredCalls);

  // Filter grouped calls by search and criteria
  const filteredCallsByCriteria = Object.keys(groupedCalls).reduce(
    (acc, date) => {
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
    },
    {}
  );

  useEffect(() => {}, [filtersVisible]);

  return (
    <div className="activity-feed-container">
      <button
        className="phone-widget-toggle-button"
        onClick={() => setPhoneWidgetVisible(!phoneWidgetVisible)}
      >
        Toggle Phone Widget
      </button>
      <PhoneWidget isVisible={phoneWidgetVisible} />
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
        filteredCalls={filteredCallsByCriteria}
        toggleCallDetails={toggleCallDetails}
        openCall={openCall}
        currentTab={currentTab}
        handleArchive={handleArchiveWithSnackbar}
        setCalls={setCalls}
      />
      <Snackbar
        message={snackbarMessage}
        actionLabel="UNDO"
        onAction={undoAction}
      />
    </div>
  );
};

export default ActivityFeed;
