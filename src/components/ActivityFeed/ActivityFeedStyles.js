import { css } from "@emotion/react";

export const styledList = css`
  background-color: #363633;
  width: 100%;
  max-width: 800px;
  margin: 20px 0;
  padding: 0 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

export const styledListItemButton = css`
  border-bottom: 1px solid #e0e0e0;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  margin: 12px 0;
  background-color: #effffc; /* Set the default background color */
  &:hover {
    background-color: #27c1a7; /* Set the hover background color */
  }
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
  font-size: 14px;
  font-weight: bold;
  color: #27c1a7;
  background-color: #363633;
  border-radius: 10px;
`;

export const callDetails = css`
  display: flex;
  align-items: center;
  color: black;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const callTime = css`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: grey;
  background-color: #fff;
  border-radius: 5px;
  padding: 2px 5px;
  margin-right: 22px;
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
