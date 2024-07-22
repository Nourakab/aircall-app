import React, { useState, useEffect } from "react";
import { MdDialpad } from "react-icons/md";
import Header from "../../components/Header";
import ActivityFeed from "../../components/ActivityFeed";
import ArchiveAllButton from "../../components/ArchiveAllButton";
import UnarchiveAllButton from "../../components/UnarchiveAllButton";
import TabsComponent from "../../components/TabsComponent";
import UndoButton from "../../components/UndoButton";
import useCallActions from "../../hooks/useCallActions";
import PhoneWidget from "../../components/PhoneWidget/PhoneWidget";
import "./HomePage.css";

const HomePage = () => {
  const {
    calls,
    setCalls,
    handleArchiveAll,
    handleUndoArchiveAll,
    handleArchive,
  } = useCallActions();
  const [currentTab, setCurrentTab] = useState("activity");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [undoAction, setUndoAction] = useState(null);
  const [phoneWidgetVisible, setPhoneWidgetVisible] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => setIsSmallDevice(window.innerWidth < 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {}, [calls]);

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
          (call) => call.call_type === "missed" || call.call_type === "answered"
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

    return filtered;
  };

  const handleArchiveAllWithCheck = () => {
    const callsToArchive = filteredCalls();
    handleArchiveAll(callsToArchive);
    setUndoAction("archiveAll");
    setSnackbarOpen(false);
    setTimeout(() => setSnackbarOpen(true), 100);
  };

  const handleUndoArchiveAllWithCheck = () => {
    handleUndoArchiveAll();
    setSnackbarOpen(false);
  };

  const handleArchiveWithCheck = (call) => {
    handleArchive(call);
    setUndoAction("archive");
    setSnackbarOpen(false);
    setTimeout(() => setSnackbarOpen(true), 100);
  };

  const togglePhoneWidgetVisibility = () => {
    setPhoneWidgetVisible(!phoneWidgetVisible);
  };

  return (
    <div className="homeContainer">
      <Header />
      <TabsComponent currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="contentContainer">
        <div className="actionsContainer">
          {currentTab === "activity" && (
            <>
              <ArchiveAllButton handleArchiveAll={handleArchiveAllWithCheck} />
              {undoAction === "archiveAll" && (
                <UndoButton handleUndo={handleUndoArchiveAllWithCheck} />
              )}
            </>
          )}
          {currentTab === "archived" && (
            <UnarchiveAllButton setCalls={setCalls} />
          )}

          {isSmallDevice ? (
            <MdDialpad
              size={24}
              color="#27c1a7"
              onClick={togglePhoneWidgetVisibility}
            />
          ) : (
            <button
              className="phone-widget-toggle-button"
              onClick={togglePhoneWidgetVisibility}
            >
              Toggle Phone Widget
            </button>
          )}
          <PhoneWidget
            isVisible={phoneWidgetVisible}
            toggleVisibility={togglePhoneWidgetVisibility}
          />
        </div>
        <ActivityFeed
          calls={filteredCalls()}
          currentTab={currentTab}
          setCalls={setCalls}
          handleArchive={handleArchiveWithCheck}
          setSnackbarOpen={setSnackbarOpen}
        />
      </div>
    </div>
  );
};

export default HomePage;
