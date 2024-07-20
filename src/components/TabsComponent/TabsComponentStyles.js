import { css } from "@emotion/react";

export const tabContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
`;

export const styledTabs = css`
  .MuiTabs-root {
    min-height: 48px;
    background-color: white;
    padding: 0 10px;
  }
  .MuiTabs-indicator {
    background-color: transparent; /* Hide default indicator */
  }
`;

export const styledTab = css`
  min-width: 100px;
  min-height: 48px;
  padding: 0 12px;
  border-radius: 24px 24px 0 0; /* Rounded top corners */
  &.Mui-selected {
    background-color: #27c1a7;
    color: white !important;
    font-weight: bold;
  }
  &:not(.Mui-selected) {
    background-color: transparent;
    color: grey !important;
  }
`;
