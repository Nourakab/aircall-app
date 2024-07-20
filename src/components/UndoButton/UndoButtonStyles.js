import { css } from "@emotion/react";

export const buttonStyle = css`
  background-color: #effffc;
  color: #27c1a7;
  &:hover {
    background-color: #27c1a7;
    color: white;
  }
  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;
