import { css } from "@emotion/react";

export const styledAppBar = css`
  background-color: #effffc;
  box-shadow: none;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
`;

export const styledTypography = css`
  color: black;
  font-weight: bold;
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;
