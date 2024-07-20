import React from "react";
import { Tabs, Tab } from "@mui/material";
import {
  tabContainerStyle,
  styledTabs,
  styledTab,
} from "./TabsComponentStyles";

const TabsComponent = ({ currentTab, setCurrentTab }) => {
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div css={tabContainerStyle}>
      <Tabs css={styledTabs} value={currentTab} onChange={handleTabChange}>
        <Tab css={styledTab} label="Activity" value="activity" />
        <Tab css={styledTab} label="Inbox" value="inbox" />
        <Tab css={styledTab} label="All Calls" value="all-calls" />
        <Tab css={styledTab} label="Archived" value="archived" />
      </Tabs>
      <div>{/* You can add icons or other controls here */}</div>
    </div>
  );
};

export default TabsComponent;
