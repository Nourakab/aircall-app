import { css } from "@emotion/react";

export const buttonStyle = css`
  background-color: #d9534f;
  color: white;
  &:hover {
    background-color: #c9302c;
  }
  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;
