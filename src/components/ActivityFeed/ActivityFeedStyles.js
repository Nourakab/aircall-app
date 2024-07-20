import { css } from "@emotion/react";

export const styledList = css`
  background-color: #27c1a7;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  margin: 20px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    border-radius: 0;
    box-shadow: none;
    margin: 0;
  }
`;

export const styledListItemButton = css`
  border-bottom: 1px solid #e0e0e0;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: 600px) {
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const dateHeader = css`
  margin: 10px 0;
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;
`;

export const callDetails = css`
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const callTime = css`
  font-size: 12px;
  color: grey;
  @media (max-width: 600px) {
    align-self: flex-end;
  }
`;

export const callTypeIcon = css`
  margin-right: 10px;
`;

export const callDirectionIcon = css`
  color: red; /* Change color as needed */
  margin-right: 10px;
`;
