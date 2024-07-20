import { css } from "@emotion/react";

export const appContainerStyle = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #363633;
  @media (max-width: 600px) {
    width: 100%; /* Full width on small screens */
  }
`;

export const contentContainerStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

export const actionsContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  max-width: 800px;
  background-color: #363633; /* Match the background color */
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    max-width: 100%;
  }
`;
